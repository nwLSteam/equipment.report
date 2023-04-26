import React from "react";
import module from "./Warnings.module.scss";

function Warnings( props: React.PropsWithChildren ) {
	return <ul className={module.body}>{props.children}</ul>;
}

export default Warnings;
