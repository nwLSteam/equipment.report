import React from "react";
import { BUNGIE } from "src/logic/Storage";

export interface hasDisplayProperties {
	displayProperties: {
		name?: string
		hasIcon?: boolean,
		icon?: string
		iconSequences?: Array<{
			frames: string[];
		}>
	};
}

function Icon( props: {
	def: hasDisplayProperties,
	alt?: string
} ) {
	if ( !props.def.displayProperties.hasIcon || !props.def.displayProperties.icon ) {
		return null;
	}

	const hasSequences = props.def.displayProperties.iconSequences;
	const smallVersion = hasSequences ? hasSequences[1].frames : null;

	const image = smallVersion ? BUNGIE + smallVersion : BUNGIE + props.def.displayProperties.icon;

	const alt = props.alt ?? props.def.displayProperties.name ?? "Icon";

	return <img src={image} alt={alt} />;
}

export default Icon;
