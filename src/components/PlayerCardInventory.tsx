import { getInventoryItemDef } from "@d2api/manifest-web";
import { DestinyItemComponent, TierType } from "bungie-api-ts/destiny2";
import React, { useContext } from "react";
import ItemItem from "src/components/ItemItem";
import { CharacterHashContext, ProfileContext } from "src/components/PlayerCard";
import module from "src/components/PlayerCard.module.scss";
import { Bucket, ItemCategory } from "src/logic/Hashes";

function PlayerCardInventory() {
	const characterHash = useContext( CharacterHashContext );
	const profile = useContext( ProfileContext );
	const equipment = profile?.characterEquipment.data![characterHash].items!;

	const getExoticArmor =
		      (): DestinyItemComponent | undefined => equipment.find(
			      s => {
				      const def = getInventoryItemDef( s.itemHash );

				      return def?.inventory?.tierType === TierType.Exotic
					      && def.itemCategoryHashes?.includes( ItemCategory.Armor );
			      },
		      );

	const getItemInBucket =
		      ( b: Bucket ): DestinyItemComponent | undefined => equipment.find( s => s.bucketHash === b );

	const renderItem = ( item: DestinyItemComponent | undefined ) => {
		return item ? <ItemItem item={item} /> : null;
	};

	return <div>
		<div className={module.items}>

			{renderItem( getItemInBucket( Bucket.Kinetic ) )}
			{renderItem( getItemInBucket( Bucket.Energy ) )}
			{renderItem( getItemInBucket( Bucket.Power ) )}
		</div>
		<hr className={module.divider} />
		<div className={module.items}>
			{renderItem( getExoticArmor() )}
		</div>
	</div>;
}

export default PlayerCardInventory;
