import { Buffer } from "buffer";
import { $tokens } from "src/logic/Storage";

export const API_KEY = "4b9a34b00923477da2d2b8d8a042b96f";
export const CLIENT_ID: string = "40593";
export const CLIENT_SECRET: string = "x.jr52ZqlkBWhr8R00ZZiIFPdLxJvKJU910UNjM3P00";
const AUTH_HEADER_VALUE = `Basic ${Buffer.from( `${CLIENT_ID}:${CLIENT_SECRET}` ).toString( "base64" )}`;
const AUTH_FORWARD_URL = `https://www.bungie.net/en/OAuth/Authorize?client_id=${CLIENT_ID}&response_type=code`;
const TOKEN_ENDPOINT = "https://www.bungie.net/platform/app/oauth/token/";

const REFRESH_EPSILON = 30 * 60 * 1000; // 30 minutes

export interface TokenResponse {
	access_token: string,
	token_type: "Bearer",
	expires_in: number,
	refresh_token: string,
	refresh_expires_in: number
	membership_id: string
}

export interface Tokens {
	access_token: string;
	access_expires: Date;
	refresh_token: string;
	refresh_expires: Date;
	membership_id: string;
}

export function getTokenObjectFromTokenResponse( obj: TokenResponse ) {
	return {
		access_token: obj.access_token,
		refresh_token: obj.refresh_token,
		membership_id: obj.membership_id,
		access_expires: new Date( Date.now() + ( 1000 * obj.expires_in ) ),
		refresh_expires: new Date( Date.now() + ( 1000 * obj.refresh_expires_in ) ),
	};
}

export function saveTokensToLocalStorage( obj: Tokens ) {
	localStorage.setItem( "tokens", JSON.stringify( obj ) );
	$tokens( obj );
}

export function loadTokensFromLocalStorage(): Tokens | null {
	let token_string = localStorage.getItem( "tokens" );
	if ( !token_string ) {
		return null;
	}

	let tokens: Tokens = JSON.parse( token_string );
	tokens.refresh_expires = new Date( tokens.refresh_expires );
	tokens.access_expires = new Date( tokens.access_expires );

	$tokens( tokens );

	return tokens;
}

function deleteTokensFromLocalStorage() {
	localStorage.removeItem( "tokens" );
}

export function getResponseCode(): string | null {
	const siteUrl = window.location.search;
	const urlParams = new URLSearchParams( siteUrl );
	return urlParams.get( "code" );
}

export function forwardToAuthentication() {
	window.location.replace( AUTH_FORWARD_URL );
}

export function isAccessTokenExpired( obj: Tokens ) {
	return Date.now() + REFRESH_EPSILON > obj.access_expires.getTime();
}

export function isRefreshTokenExpired( obj: Tokens ) {
	return Date.now() + REFRESH_EPSILON > obj.refresh_expires.getTime();
}

export const enum AuthState {
	AUTHENTICATED,
	NOT_AUTHENTICATED,
	UNDEFINED
}

export async function authenticateViaCode( code: string ) {
	const response = await fetch( TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: AUTH_HEADER_VALUE,
		},
		body: `grant_type=authorization_code&code=${code}`,
	} );

	const status = response.status;
	const text = await response.text();

	return {
		success: status === 200,
		response: JSON.parse( text ),
	};
}

export async function refreshTokens( tokens: Tokens ) {
	const response = await fetch( TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: AUTH_HEADER_VALUE,
		},
		body: `grant_type=refresh_token&refresh_token=${tokens.refresh_token}`,
	} );

	const status = response.status;
	const text = await response.text();

	return {
		success: status === 200,
		response: JSON.parse( text ),
	};
}


export default async function handleAuthFlow(): Promise<AuthState> {
	const code = getResponseCode();

	if ( code ) {
		console.log( "we got a code back, we need to auth" );

		console.log( "do auth request here" );
		const auth = await authenticateViaCode( code );

		if ( !auth.success ) {
			deleteTokensFromLocalStorage();
			// eslint-disable-next-line no-restricted-globals
			window.location.replace( location.pathname );
		}

		const tokens = getTokenObjectFromTokenResponse( auth.response );
		saveTokensToLocalStorage( tokens );

		// eslint-disable-next-line no-restricted-globals
		window.location.replace( location.pathname );
	}

	console.log( "We have no code, let's check for tokens" );
	const tokens = loadTokensFromLocalStorage();

	if ( !tokens ) {
		console.log( "No authentication, we need to show the button" );
		return AuthState.NOT_AUTHENTICATED;
	}

	if ( isRefreshTokenExpired( tokens ) ) {
		console.log( "Tokens are completely invalid" );
		console.log( "Throw them away and show a button" );
		deleteTokensFromLocalStorage();
		return AuthState.NOT_AUTHENTICATED;
	}

	if ( !isAccessTokenExpired( tokens ) ) {
		console.log( "We believe the system, tokens valid" );
		return AuthState.AUTHENTICATED;
	}

	console.log( "We need to refresh our tokens" );
	const auth = await refreshTokens( tokens );

	if ( !auth.success ) {
		console.log( "We failed" );
		deleteTokensFromLocalStorage();
		return AuthState.NOT_AUTHENTICATED;
	}

	console.log( "We succeeded" );
	const new_tokens = getTokenObjectFromTokenResponse( auth.response );
	saveTokensToLocalStorage( new_tokens );

	return AuthState.AUTHENTICATED;
}
