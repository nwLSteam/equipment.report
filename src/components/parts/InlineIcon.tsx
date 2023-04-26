import React from "react";
import Icon, { hasDisplayProperties } from "src/components/parts/Icon";
import module from "./InlineIcon.module.scss";

function InlineIcon( props: {
	def: hasDisplayProperties,
	alt?: string
} ) {
	return <div className={module.body}>
		<Icon def={props.def} alt={props.alt} />
	</div>;
}

export default InlineIcon;
