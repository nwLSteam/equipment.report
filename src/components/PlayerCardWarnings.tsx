import { getActivityDef } from "@d2api/manifest-web";
import { DestinyInventoryItemDefinition } from "bungie-api-ts/destiny2";
import React, { createContext, useContext } from "react";
import InlineIcon from "src/components/parts/InlineIcon";
import { CardContext, CharacterHashContext, ProfileContext } from "src/components/PlayerCard";
import Warning, { Severity } from "src/components/Warning";
import Warnings from "src/components/Warnings";
import { modRules, Raids } from "src/logic/ModRules";
import { getAllEquippedMods } from "src/logic/Mods";
import { getWeaponEnergies, intersect } from "src/logic/Summaries";
import module from "./PlayerCardWarnings.module.scss";

let ModContext = createContext<DestinyInventoryItemDefinition[]>( [] );

export function PlayerCardWarnings(): React.ReactElement | null {
	const card = useContext( CardContext );
	const characterHash = useContext( CharacterHashContext );
	const profile = useContext( ProfileContext );

	const mods = getAllEquippedMods( card!.membershipType,
	                                 card!.membershipId,
	                                 profile!,
	                                 characterHash );

	return (
		<Warnings>
			<ModContext.Provider value={mods}>
				<EnergyNotAligningWithWeaponsWarnings />
				<ModsNotFittingForActivityWarnings />
			</ModContext.Provider>
		</Warnings>
	);
}

function EnergyNotAligningWithWeaponsWarnings(): React.ReactElement | null {
	const mods = useContext( ModContext );
	const characterHash = useContext( CharacterHashContext );
	const profile = useContext( ProfileContext );

	const equipment = profile?.characterEquipment.data![characterHash].items!;
	const weaponEnergies = getWeaponEnergies( equipment );

	return <>
		{
			mods.map( m => {
				const buffs = modRules[m.hash]?.buffsWeaponEnergy;

				if ( !buffs ) {
					return null;
				}

				if ( intersect( weaponEnergies, buffs ).length > 0 ) {
					return null;
				}

				return <Warning severity={Severity.HeavyWarning}
				                key={`EnergyNotAligningWithWeaponsWarnings_${m.hash}`}>
					Useless mod: <InlineIcon def={m} /> {m.displayProperties.name}
					<div className={module.description}>No weapon can take advantage of this mod.</div>
				</Warning>;
			} )
		}
	</>;
}

function ModsNotFittingForActivityWarnings(): React.ReactElement | null {
	const mods = useContext( ModContext );
	const characterHash = useContext( CharacterHashContext );
	const profile = useContext( ProfileContext );

	const currentActivity = profile?.characterActivities.data![characterHash].currentActivityHash;

	let warnings: React.ReactElement[] = [];

	if ( !currentActivity ) {
		return null;
	}

	for ( const raid of Object.values( Raids ) ) {
		if ( !raid.activityHashes.includes( currentActivity ) ) {
			continue;
		}

		// player is in a raid with raid mods
		// we do another sweep, ignoring our raid, and listing all mods that don't fit
		for ( const otherRaid of Object.values( Raids ) ) {
			if ( otherRaid.activityHashes.includes( currentActivity ) ) {
				continue;
			}

			const activity = getActivityDef( currentActivity );

			const raidName = activity?.originalDisplayProperties.name ?? activity?.originalDisplayProperties.name;

			warnings = warnings.concat(
				mods.slice()
				    .filter( m => m.plug?.energyCost && m.plug?.plugCategoryIdentifier === otherRaid.modString )
				    .map( m =>
					          <Warning severity={Severity.Warning} key={m.hash}>
						          Useless mod: <InlineIcon def={m} /> {m.displayProperties.name}
						          <div className={module.description}>
							          This mod isn't active in {raidName}.
						          </div>
					          </Warning>,
				    ) );
		}
		break;
	}

	return <>{warnings}</>;
}
