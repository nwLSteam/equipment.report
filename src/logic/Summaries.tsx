import { getInventoryItemDef } from "@d2api/manifest-web";
import { DamageType, DestinyItemComponent } from "bungie-api-ts/destiny2";
import { Bucket } from "src/logic/Hashes";

export function getWeaponEnergies( items: DestinyItemComponent[] ): DamageType[] {
	return items.filter( i => [ Bucket.Kinetic, Bucket.Energy, Bucket.Power ].includes( i.bucketHash ) )
	            .map( i => getInventoryItemDef( i.itemHash ) )
	            .filter( i => i )
	            .map( i => i!.damageTypes )
	            .flat()
	            .filter( function ( item, pos, self ) {
		            return self.indexOf( item ) === pos; // uniqueness
	            } );
}

export function intersect<T>( array1: T[], array2: T[] ): T[] {
	let result = [];
	// Don't destroy the original arrays
	let a = array1.slice( 0 );
	let b = array2.slice( 0 );
	let aLast = a.length - 1;
	let bLast = b.length - 1;
	while ( aLast >= 0 && bLast >= 0 ) {
		if ( a[aLast] > b[bLast] ) {
			a.pop();
			aLast--;
		} else if ( a[aLast] < b[bLast] ) {
			b.pop();
			bLast--;
		} else /* they're equal */ {
			result.push( a.pop()! );
			b.pop();
			aLast--;
			bLast--;
		}
	}
	return result;
}
