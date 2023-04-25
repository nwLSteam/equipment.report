import React, { useEffect, useState } from "react";
import "src/App.scss";
import AuthButton from "src/components/AuthButton";
import AuthenticatedWrapper from "src/components/AuthenticatedWrapper";
import Loading from "src/components/Loading";
import handleAuthFlow, { AuthState } from "src/logic/Auth";

function App() {
	const [ authState, setAuthState ] = useState<AuthState>( AuthState.UNDEFINED );

	useEffect( () => {
		handleAuthFlow().then( state => {
			setAuthState( state );
		} );
	}, [] );

	return (
		<div className="App">
			<header className="App-header">
				{authState === AuthState.UNDEFINED && <Loading />}
				{authState === AuthState.NOT_AUTHENTICATED && <AuthButton />}
				{authState === AuthState.AUTHENTICATED && <AuthenticatedWrapper />}
			</header>
		</div>
	);
}

export default App;
