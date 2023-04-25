import React from "react";
import PlayerCard from "src/components/PlayerCard";
import { $tokens } from "src/logic/Storage";

// we are authenticated and have the manifest here!


function Content() {
	return <PlayerCard membershipId={$tokens().membership_id} />;
}

export default Content;
