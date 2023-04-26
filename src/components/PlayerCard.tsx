import { getClassDef, getInventoryItemDef } from "@d2api/manifest-web";
import { Destiny2 } from "bungie-api-ts";
import {
	BungieMembershipType,
	DestinyComponentType,
	DestinyItemComponent,
	DestinyProfileResponse,
	TierType,
} from "bungie-api-ts/destiny2";
import { DestinyProfileUserInfoCard } from "bungie-api-ts/destiny2/interfaces";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ItemItem from "src/components/ItemItem";
import InlineIcon from "src/components/parts/InlineIcon";
import Warning from "src/components/Warning";
import Warnings from "src/components/Warnings";
import { Bucket, ItemCategory } from "src/logic/Hashes";
import { modRules } from "src/logic/ModRules";
import { getAllEquippedMods } from "src/logic/Mods";
import { $http, BUNGIE } from "src/logic/Storage";
import { getWeaponEnergies, intersect } from "src/logic/Summaries";
import module from "./PlayerCard.module.scss";


function getMainUserCard( setMembership: Dispatch<SetStateAction<DestinyProfileUserInfoCard | undefined>>,
                          membershipId: string ) {
	Destiny2.getLinkedProfiles( $http(), {
		membershipId: membershipId,
		membershipType: BungieMembershipType.BungieNext,
		getAllMemberships: true,
	} ).then( r => {
		const response = r.Response;

		const main = response.profiles.sort( ( a, b ) => {
			return ( new Date( a.dateLastPlayed ) ).getTime() - ( new Date( b.dateLastPlayed ) ).getTime();
		} )[0];

		// TODO what if profile list is empty?
		// TODO what if API is down?

		setMembership( main );
	} );
}

function getProfile( setProfile: Dispatch<SetStateAction<DestinyProfileResponse | undefined>>,
                     card: DestinyProfileUserInfoCard | undefined ) {
	if ( !card ) {
		return;
	}

	Destiny2.getProfile( $http(), {
		destinyMembershipId: card.membershipId,
		membershipType: card.membershipType,
		components: [
			DestinyComponentType.Profiles,
			DestinyComponentType.Characters,
			DestinyComponentType.CharacterEquipment,
			DestinyComponentType.ItemSockets,
		],
	} ).then( r => setProfile( r.Response ) );
}

function getCurrentCharacter( setCharacter: Dispatch<SetStateAction<string | undefined>>,
                              profile: DestinyProfileResponse | undefined ) {
	if ( !profile?.characters.data ) {
		return;
	}

	const character = Object.entries( profile.characters.data ).sort( ( a, b ) => {
		return ( new Date( b[1].dateLastPlayed ) ).getTime() - ( new Date( a[1].dateLastPlayed ) ).getTime();
	} )[0][0];

	setCharacter( character );
}

function PlayerCard( props: {
	membershipId: string,
} ) {
	const [ card, setCard ] = useState<DestinyProfileUserInfoCard | undefined>( undefined );
	const [ profile, setProfile ] = useState<DestinyProfileResponse | undefined>( undefined );
	const [ characterHash, setCharacterHash ] = useState<string | undefined>( undefined );

	useEffect( () => getMainUserCard( setCard, props.membershipId ), [ props.membershipId ] );
	useEffect( () => getProfile( setProfile, card ), [ card ] );
	useEffect( () => getCurrentCharacter( setCharacterHash, profile ), [ profile ] );

	if ( !characterHash || !profile || !card ) {
		return <div>Loading character...</div>;
	}

	const character = profile?.characters?.data![characterHash]!;
	const equipment = profile?.characterEquipment.data![characterHash].items!;

	const getItemInBucket =
		      ( b: Bucket ): DestinyItemComponent | undefined => equipment.find( s => s.bucketHash === b );

	const getExoticArmor =
		      (): DestinyItemComponent | undefined => equipment.find(
			      s => {
				      const def = getInventoryItemDef( s.itemHash );

				      return def?.inventory?.tierType === TierType.Exotic
					      && def.itemCategoryHashes?.includes( ItemCategory.Armor );
			      },
		      );

	const renderItem = ( item: DestinyItemComponent | undefined ) => {
		return item ? <ItemItem item={item} /> : null;
	};

	const mods = getAllEquippedMods( card.membershipType, card.membershipId, profile, characterHash );
	const weaponEnergies = getWeaponEnergies( equipment );

	return (
		<div className={module.body}>
			<div className={module.introWrapper}>
				<img alt={"Emblem"} className={module.emblem} src={BUNGIE + character.emblemBackgroundPath} />
				<div className={module.intro}>
					<div>
						<div className={module.name}>{card.displayName}</div>
						<div className={module.class}>{getClassDef( character.classHash )?.displayProperties.name}</div>
					</div>
					<div>
						<div className={module.light}>{character.light}</div>
					</div>
				</div>
			</div>
			<div className={module.content}>
				<Warnings>
					{mods.map( m => {
						const buffs = modRules[m.hash]?.buffsWeaponEnergy;

						if ( !buffs ) {
							return null;
						}

						if ( intersect( weaponEnergies, buffs ).length > 0 ) {
							return null;
						}

						return <Warning>
							You have equipped <InlineIcon def={m} /> {m.displayProperties.name},
							but no weapon can take advantage of this mod.
						</Warning>;
					} )}
				</Warnings>
				<hr className={module.divider} />
				<div className={module.items}>
					{renderItem( getItemInBucket( Bucket.Kinetic ) )}
					{renderItem( getItemInBucket( Bucket.Energy ) )}
					{renderItem( getItemInBucket( Bucket.Power ) )}
				</div>
				<hr className={module.divider} />
				<div className={module.items}>
					{renderItem( getExoticArmor() )}
				</div>

				{/*<Warnings>
					{mods.map( m => <Warning>
						<div key={m.displayProperties.name} className={item_module.perk}>
							<div className={item_module.perkIcon}><Icon def={m} /></div>
							{m.displayProperties.name}
						</div>
					</Warning> )}
				</Warnings>
				<hr className={module.divider} />*/}
			</div>
		</div>
	);
}

export default PlayerCard;
