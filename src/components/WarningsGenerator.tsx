import {
	DamageType,
	DestinyInventoryItemDefinition,
	DestinyItemComponent,
	DestinyProfileResponse,
} from "bungie-api-ts/destiny2";
import { DestinyProfileUserInfoCard } from "bungie-api-ts/destiny2/interfaces";
import React, { createContext, useContext } from "react";
import InlineIcon from "src/components/parts/InlineIcon";
import Warning from "src/components/Warning";
import { modRules } from "src/logic/ModRules";
import { getAllEquippedMods } from "src/logic/Mods";
import { getWeaponEnergies, intersect } from "src/logic/Summaries";

let ModContext = createContext<DestinyInventoryItemDefinition[]>( [] );
let EquippedWeaponEnergiesContext = createContext<DamageType[]>( [] );

export function GeneratedWarnings( props: {
	card: DestinyProfileUserInfoCard
	profile: DestinyProfileResponse
	equipment: DestinyItemComponent[]
	characterHash: string
} ): React.ReactElement | null {
	const mods = getAllEquippedMods( props.card.membershipType,
	                                 props.card.membershipId,
	                                 props.profile,
	                                 props.characterHash );
	const weaponEnergies = getWeaponEnergies( props.equipment );

	return (
		<ModContext.Provider value={mods}>
			<EquippedWeaponEnergiesContext.Provider value={weaponEnergies}>
				<EnergyNotAligningWithWeaponsWarnings />
			</EquippedWeaponEnergiesContext.Provider>
		</ModContext.Provider>
	);
}

function EnergyNotAligningWithWeaponsWarnings(): React.ReactElement | null {
	const mods = useContext( ModContext );
	const weaponEnergies = useContext( EquippedWeaponEnergiesContext );

	return <>{
		mods.map( m => {
			const buffs = modRules[m.hash]?.buffsWeaponEnergy;

			if ( !buffs ) {
				return null;
			}

			if ( intersect( weaponEnergies, buffs ).length > 0 ) {
				return null;
			}

			return <Warning key={`EnergyNotAligningWithWeaponsWarnings_${m.hash}`}>
				You have equipped <InlineIcon def={m} /> {m.displayProperties.name},
				but no weapon can take advantage of this mod.
			</Warning>;
		} )
	}</>;
}
