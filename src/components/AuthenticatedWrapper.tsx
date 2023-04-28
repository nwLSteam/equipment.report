import { loadDefs, setApiKey } from "@d2api/manifest-web";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Content from "src/components/Content";
import Loading from "src/components/Loading";
import { API_KEY } from "src/logic/Auth";

function loadManifest( setManifestLoaded: Dispatch<SetStateAction<boolean>> ) {
	setApiKey( API_KEY );

	// checks the API for the current version.
	// loads our cached copy if it's up-to-date, or downloads a new one from bungie
	loadDefs().then( () => {
		setManifestLoaded( true );
	} );
	// if you made it to this comment, the manifest is ready for use!
}

function AuthenticatedWrapper() {
	const [ manifestLoaded, setManifestLoaded ] = useState<boolean>( false );
	useEffect( () => loadManifest( setManifestLoaded ), [] );

	if ( !manifestLoaded ) {
		return <Loading>Loading manifest...</Loading>;
	}

	return (
		<Content />
	);
}

export default AuthenticatedWrapper;
