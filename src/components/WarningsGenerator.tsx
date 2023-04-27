import { DamageType, DestinyInventoryItemDefinition } from "bungie-api-ts/destiny2";
import React, { createContext, useContext } from "react";
import InlineIcon from "src/components/parts/InlineIcon";
import { CardContext, CharacterHashContext, ProfileContext } from "src/components/PlayerCard";
import Warning from "src/components/Warning";
import Warnings from "src/components/Warnings";
import { modRules } from "src/logic/ModRules";
import { getAllEquippedMods } from "src/logic/Mods";
import { getWeaponEnergies, intersect } from "src/logic/Summaries";

let ModContext = createContext<DestinyInventoryItemDefinition[]>( [] );
let EquippedWeaponEnergiesContext = createContext<DamageType[]>( [] );

export function PlayerCardWarnings(): React.ReactElement | null {
	const card = useContext( CardContext );
	const characterHash = useContext( CharacterHashContext );
	const profile = useContext( ProfileContext );

	const equipment = profile?.characterEquipment.data![characterHash].items!;

	const mods = getAllEquippedMods( card!.membershipType,
	                                 card!.membershipId,
	                                 profile!,
	                                 characterHash );
	const weaponEnergies = getWeaponEnergies( equipment );

	return (
		<Warnings>
			<ModContext.Provider value={mods}>
				<EquippedWeaponEnergiesContext.Provider value={weaponEnergies}>
					<EnergyNotAligningWithWeaponsWarnings />
				</EquippedWeaponEnergiesContext.Provider>
			</ModContext.Provider>
		</Warnings>
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
