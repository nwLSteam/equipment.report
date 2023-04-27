import React from "react";
import module from "./Warning.module.scss";

export enum Severity {
	Hint         = "hint",
	Warning      = "warning",
	HeavyWarning = "heavyWarning",
	Critical     = "critical"
}

function Warning( props: React.PropsWithChildren<{
	severity: Severity
}> ) {
	return <li className={module[props.severity]}>
		{props.children}
	</li>;
}

export default Warning;
