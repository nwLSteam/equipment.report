import { getInventoryItemDef } from "@d2api/manifest-web";
import { DestinyItemSocketState } from "bungie-api-ts/destiny2";
import React, { useContext } from "react";
import Icon from "src/components/parts/Icon";
import InlineIcon from "src/components/parts/InlineIcon";
import { CharacterHashContext, ProfileContext } from "src/components/PlayerCard";
import { Bucket } from "src/logic/Hashes";
import module from "./PlayerCardSubclass.module.scss";

function PlayerCardSubclass() {
	const profile = useContext( ProfileContext );
	const characterHash = useContext( CharacterHashContext );

	const equipment = profile?.characterEquipment.data![characterHash].items;
	const subclassEquipment = equipment?.find( e => e.bucketHash === Bucket.Subclass );

	if ( !subclassEquipment ) {
		console.warn( "No subclass found???" );
		return null;
	}

	const subclassItem = getInventoryItemDef( subclassEquipment.itemHash )!;
	const subclassName = subclassItem.displayProperties.name;

	const subclassPlugs = profile?.itemComponents.sockets
		.data![subclassEquipment.itemInstanceId!].sockets
	                                             .filter( s => s.isEnabled && s.isVisible )!;


	const perkToListEntry = (s :  DestinyItemSocketState) =>
		<li><InlineIcon def={getInventoryItemDef( s.plugHash )!} /> {
		getInventoryItemDef( s.plugHash )?.displayProperties.name
	}</li>


	return <div className={module.body}>
		<div className={module.icon}>
			<Icon def={subclassItem} />
			<div className={module.name}>{subclassName}</div>
		</div>
		<div className={module.text}>
			<ul className={module.perks}>{subclassPlugs.slice(0,4).map(perkToListEntry)}</ul>
		</div>
		<div className={module.text}>
			<ul className={module.perks}>{subclassPlugs.slice(4,8).map(perkToListEntry)}</ul>
		</div>
	</div>;
}

export default PlayerCardSubclass;
