import React from "react";
import { BUNGIE } from "src/logic/Storage";

interface hasDisplayProperties {
	displayProperties: {
		name?: string
		hasIcon?: boolean,
		icon?: string
	};
}

function Icon( props: {
	def: hasDisplayProperties,
	alt?: string
} ) {
	if ( !props.def.displayProperties.hasIcon || !props.def.displayProperties.icon ) {
		return null;
	}

	const alt = props.alt ?? props.def.displayProperties.name ?? "Icon";

	return <img src={BUNGIE + props.def.displayProperties.icon} alt={alt} />;
}

export default Icon;
