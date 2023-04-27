import { getClassDef } from "@d2api/manifest-web";
import React, { useContext } from "react";
import { CardContext, CharacterHashContext, ProfileContext } from "src/components/PlayerCard";
import module from "src/components/PlayerCard.module.scss";
import { BUNGIE } from "src/logic/Storage";

function PlayerCardIntro() {
	const card = useContext( CardContext );
	const characterHash = useContext( CharacterHashContext );
	const profile = useContext( ProfileContext );

	const character = profile?.characters.data![characterHash];

	return <div className={module.introWrapper}>
		<img alt={"Emblem"} className={module.emblem}
		     src={BUNGIE + character?.emblemBackgroundPath} />
		<div className={module.intro}>
			<div>
				<div className={module.name}>{card?.displayName}</div>
				<div className={module.class}>{getClassDef(
					character?.classHash )?.displayProperties.name}</div>
			</div>
			<div>
				<div className={module.light}>{character?.light}</div>
			</div>
		</div>
	</div>;
}

export default PlayerCardIntro;
