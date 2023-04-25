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
import { Bucket } from "src/logic/Hashes";
import { $http, BUNGIE } from "src/logic/Storage";
import module from "./PlayerCard.module.scss";


function getMainUserCard( setMembership: Dispatch<SetStateAction<DestinyProfileUserInfoCard | undefined>>,
                          membershipId: string ) {
	Destiny2.getLinkedProfiles( $http(), {
		membershipId: membershipId,
		membershipType: BungieMembershipType.BungieNext,
		getAllMemberships: true,
	} ).then( r => {
		const response = r.Response;
		console.log(r.Response);

		const main = response.profiles.sort( ( a, b ) => {
			return ( new Date( a.dateLastPlayed ) ).getTime() - ( new Date( b.dateLastPlayed ) ).getTime();
		} )[0];

		console.log( main );

		setMembership( main );
	} );
}

function getProfile( setProfile: Dispatch<SetStateAction<DestinyProfileResponse | undefined>>,
                     card: DestinyProfileUserInfoCard | undefined ) {
	console.log( "Getting profile..." );
	console.log( card );
	if ( !card ) {
		console.log( "Card null" );
		return;
	}

	Destiny2.getProfile( $http(), {
		destinyMembershipId: card.membershipId,
		membershipType: card.membershipType,
		components: [
			DestinyComponentType.Profiles,
			DestinyComponentType.Characters,
			DestinyComponentType.CharacterEquipment,
		],
	} ).then( r => setProfile( r.Response ) );
}

function getCurrentCharacter( setCharacter: Dispatch<SetStateAction<string | undefined>>,
                              profile: DestinyProfileResponse | undefined ) {
	console.log( "Getting character..." );
	console.log( profile );
	if ( !profile?.characters.data ) {
		console.log( "Character null" );
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

	if ( !characterHash ) {
		return <div>Loading character...</div>;
	}

	console.log( profile );

	const character = profile?.characters?.data![characterHash]!;
	const equipment = profile?.characterEquipment.data![characterHash].items!;

	const getItemInBucket =
		      ( b: Bucket ): DestinyItemComponent | undefined => equipment.find( s => s.bucketHash === b );

	const getExoticArmor =
		      (): DestinyItemComponent | undefined => equipment.find( s => [
				      Bucket.Helmet,
				      Bucket.Gauntlets,
				      Bucket.Chest,
				      Bucket.Legs,
			      ].includes( s.bucketHash )
			      && getInventoryItemDef( s.itemHash )?.inventory?.tierType === TierType.Exotic );

	const exotic = getExoticArmor();

	return (
		<div className={module.body}>
			<div><img alt={"Emblem"} src={BUNGIE + character.emblemBackgroundPath} /></div>
			<div>{card?.displayName} - {getClassDef( character.classHash )?.displayProperties.name}</div>
			<div>{character.light} Light</div>
			<div>
				{exotic ? <ItemItem item={exotic} /> : null}
			</div>
		</div>
	);
}

export default PlayerCard;
