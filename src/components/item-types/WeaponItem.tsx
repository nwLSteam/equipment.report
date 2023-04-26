import { getDamageTypeDef, getInventoryItemDef } from "@d2api/manifest-web";
import { DestinyInventoryItemDefinition } from "bungie-api-ts/destiny2";
import React from "react";
import module from "src/components/ItemItem.module.scss";
import Icon from "src/components/parts/Icon";
import { SocketCategory } from "src/logic/Hashes";
import { BUNGIE } from "src/logic/Storage";


function getPerksFromWeaponDef( def: DestinyInventoryItemDefinition ) {
	return def.sockets
	          ?.socketEntries
	          .filter(
		          ( _, index ) =>
			          def?.sockets
			             ?.socketCategories
			             .find( c => c?.socketCategoryHash === SocketCategory.WeaponPerks )
			             ?.socketIndexes
			             .includes( index ) )
	          .slice( 0, -1 ); // remove kill tracker
}

function WeaponItem( props: {
	def: DestinyInventoryItemDefinition | undefined
} ) {
	const def = props.def;

	if ( !def ) {
		return null;
	}

	const name = def?.displayProperties.name;

	const energy = getDamageTypeDef( def.damageTypeHashes[0] );

	const energyIcon = energy?.displayProperties.hasIcon ? <img className={module.perkIcon}
	                                                            alt={energy.displayProperties.name}
	                                                            src={BUNGIE + energy.displayProperties.icon} />
		: null;

	const perkList = getPerksFromWeaponDef( def )?.map(
		socket => {
			const def = getInventoryItemDef( socket?.singleInitialItemHash );

			if ( !def ) {
				return null;
			}

			const perkName = def?.displayProperties.name;
			const perkIcon = <Icon def={def} />;

			return <div key={perkName} className={module.perk}>
				<div className={module.perkIcon}>{perkIcon}</div>
				{perkName}
			</div>;
		},
	);

	return <div className={module.body}>
		{def?.displayProperties.hasIcon ?
			<div className={module.icon}><Icon def={def} /></div> : null
		}
		<div className={module.text}>
			<div className={module.name}>{energyIcon}{name}</div>
			<div className={module.perks}>{perkList}</div>
		</div>

	</div>;
}

export default WeaponItem;
