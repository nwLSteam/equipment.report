import React from "react";
import module from "src/components/PlayerCard.module.scss";

function PlayerCardContent( props: React.PropsWithChildren ) {
	return <div className={module.content}>{props.children}</div>;
}

export default PlayerCardContent;
