import { Destiny2 } from "bungie-api-ts";
import { BungieMembershipType, DestinyComponentType, DestinyProfileResponse } from "bungie-api-ts/destiny2";
import { DestinyProfileUserInfoCard } from "bungie-api-ts/destiny2/interfaces";
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import PlayerCardContent from "src/components/PlayerCardContent";
import PlayerCardIntro from "src/components/PlayerCardIntro";
import PlayerCardInventory from "src/components/PlayerCardInventory";
import PlayerCardSubclass from "src/components/PlayerCardSubclass";
import { PlayerCardWarnings } from "src/components/PlayerCardWarnings";
import { $http } from "src/logic/Storage";
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
			DestinyComponentType.Transitory,
			DestinyComponentType.CharacterActivities,
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

export const CardContext = createContext<DestinyProfileUserInfoCard | undefined>( undefined );
export const ProfileContext = createContext<DestinyProfileResponse | undefined>( undefined );
export const CharacterHashContext = createContext<string>( "undefined" );

function PlayerCard( props: {
	membershipId: string,
} ): React.ReactElement | null {
	const [ card, setCard ] = useState<DestinyProfileUserInfoCard | undefined>( undefined );
	const [ profile, setProfile ] = useState<DestinyProfileResponse | undefined>( undefined );
	const [ characterHash, setCharacterHash ] = useState<string | undefined>( undefined );

	useEffect( () => getMainUserCard( setCard, props.membershipId ), [ props.membershipId ] );
	useEffect( () => getProfile( setProfile, card ), [ card ] );
	useEffect( () => getCurrentCharacter( setCharacterHash, profile ), [ profile ] );

	if ( !characterHash || !profile || !card ) {
		return <div>Loading character...</div>;
	}

	return (
		<div className={module.body}>
			<CardContext.Provider value={card}>
				<ProfileContext.Provider value={profile}>
					<CharacterHashContext.Provider value={characterHash}>
						<PlayerCardIntro />
						<PlayerCardContent>
							<PlayerCardWarnings />
							<PlayerCardSubclass />
							<hr className={module.divider} />
							<PlayerCardInventory />
						</PlayerCardContent>
					</CharacterHashContext.Provider>
				</ProfileContext.Provider>
			</CardContext.Provider>
		</div>
	);
}

export default PlayerCard;
