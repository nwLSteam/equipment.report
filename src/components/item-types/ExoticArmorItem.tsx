import { getInventoryItemDef } from "@d2api/manifest-web";
import { DestinyInventoryItemDefinition, SocketPlugSources } from "bungie-api-ts/destiny2";
import React from "react";
import module from "src/components/ItemItem.module.scss";
import { ExoticArmorIntrinsicSocket } from "src/logic/Hashes";
import { BUNGIE } from "src/logic/Storage";

function ExoticArmorItem( props: {
	def: DestinyInventoryItemDefinition
} ) {
	const def = props.def;

	if ( !def ) {
		return null;
	}

	const intrinsic = getInventoryItemDef(
		def?.sockets?.socketEntries.find(
			s => s.socketTypeHash === ExoticArmorIntrinsicSocket
				&& ( s.plugSources & SocketPlugSources.ReusablePlugItems ),
		)!.singleInitialItemHash,
	);

	return <div className={module.body}>
		{def?.displayProperties.hasIcon ?
			<div className={module.icon}><img src={BUNGIE + def.displayProperties.icon}
			                                  alt={`Exotic Armor - ${def.displayProperties.name}`} /></div> : null
		}
		<div className={module.text}>
			<div className={module.name}>{def?.displayProperties.name}</div>
			<div className={module.description}>{intrinsic?.displayProperties.description}</div>
		</div>

	</div>;
}

export default ExoticArmorItem;
