import { ServerResponse } from "bungie-api-ts/common";
import { HttpClientConfig } from "bungie-api-ts/http";
import { API_KEY, Tokens } from "src/logic/Auth";

type HttpCall = ( config: HttpClientConfig ) => Promise<ServerResponse<any>>

let _$tokens: Tokens;

export function $http(): HttpCall {
	return async ( config: HttpClientConfig ) => {
		let url;

		if ( !config.params ) {
			url = config.url;
		} else {
			url = config.url + "?" + new URLSearchParams( config.params ).toString();
		}

		return JSON.parse( await ( await fetch(
			url,

			{
				method: config.method,
				headers: {
					"X-API-Key": API_KEY,
					"Authorization": `Bearer ${_$tokens.access_token}`,
				}, body: config.body,
			} ) ).text() );
	};
}

export function $tokens( set?: Tokens ) {
	if ( !set ) {
		return _$tokens;
	}

	_$tokens = set;
	return set;
}

export const BUNGIE = "https://www.bungie.net";
