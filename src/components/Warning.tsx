import React from "react";
import module from "./Warning.module.scss";

function Warning( props: React.PropsWithChildren ) {
	return <li className={module.body}>
		{props.children}
	</li>;
}

export default Warning;
