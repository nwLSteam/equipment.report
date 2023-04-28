import React from "react";
import LoadingSpinner from "src/components/parts/LoadingSpinner";
import module from "./Loading.module.scss";

function Loading( props: React.PropsWithChildren ) {
	return <div className={module.body}>
		<LoadingSpinner />
		{props.children}
	</div>;
}

export default Loading;
