import { getInventoryItemDef } from "@d2api/manifest-web";
import { DestinyItemComponent, TierType } from "bungie-api-ts/destiny2";
import React from "react";
import ExoticArmorItem from "src/components/item-types/ExoticArmorItem";
import WeaponItem from "src/components/item-types/WeaponItem";
import module from "src/components/ItemItem.module.scss";
import { ItemCategory } from "src/logic/Hashes";

function ItemItem( props: {
	item: DestinyItemComponent | undefined
} ) {
	if ( !props.item ) {
		return null;
	}

	const item = props.item;
	const def = getInventoryItemDef( item.itemHash );

	const isExoticArmor =
		      def?.inventory?.tierType === TierType.Exotic
		      && def.itemCategoryHashes?.includes( ItemCategory.Armor );

	const isWeapon = def?.itemCategoryHashes?.includes( ItemCategory.Weapon );

	return (
		<div className={module.body}>
			{isExoticArmor && <ExoticArmorItem def={def} />}
			{isWeapon && <WeaponItem def={def} />}
		</div>
	);
}

export default ItemItem;
