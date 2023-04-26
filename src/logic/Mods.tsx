import { getAllInventoryItemDefs, getInventoryItemDef } from "@d2api/manifest-web";
import { BungieMembershipType, DestinyItemComponent, DestinyProfileResponse } from "bungie-api-ts/destiny2";
import { Bucket } from "src/logic/Hashes";

export function getAllEquippedMods( type: BungieMembershipType,
                                    id: string,
                                    profile: DestinyProfileResponse,
                                    characterId: string ) {

	const equipment = profile.characterEquipment.data![characterId].items;
	// const socketInfo = profile.characterPlugSets.data![characterId].plugs;

	const getItemInBucket =
		      ( b: Bucket ): DestinyItemComponent | undefined => equipment.find( s => s.bucketHash === b );

	const getModsFromArmor = () => {
		const itemInstances: string[] = [ Bucket.Helmet, Bucket.Gauntlets, Bucket.Chest, Bucket.Legs ].map(
			bucket => getItemInBucket( bucket )?.itemInstanceId!,
		);

		return itemInstances.map( instanceId => profile.itemComponents.sockets.data![instanceId].sockets )
		                    .flat()
		                    .filter( p => p.isEnabled )
		                    .map( p => p.plugHash );
	};

	// console.log( getModsFromArmor().map( mod => getInventoryItemDef( mod )?.displayProperties.name ) );

	return getModsFromArmor()
		.filter( mod => getInventoryItemDef( mod )?.itemCategoryHashes?.includes( 4104513227 ) )
		.map( mod => getInventoryItemDef( mod )! );
}

export const getAllMods = () => getAllInventoryItemDefs()
	.filter(
		v => v.itemCategoryHashes?.includes( 4104513227 ) ) // armor mods
	.filter( v => v.plug && v.plug.energyCost ) // exclude ornaments
	.filter( v => !( v.perks.find( p => p.perkHash === 45014399 ) ) ); // no deprecated
