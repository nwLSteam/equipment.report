import React from "react";
import { forwardToAuthentication } from "src/logic/Auth";

function AuthButton() {
	return <div>
		<button onClick={forwardToAuthentication}>Authenticate</button>
	</div>;
}

export default AuthButton;
