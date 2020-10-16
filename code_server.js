'use strict';

import { fetchURL } from './common.js'

// const _serverURL = "https://plaintext-code.glitch.me"
const _serverURL = "https://fathomless-brushlands-18222.herokuapp.com"

function getHash() {
	return fetchURL(_serverURL + '/hash', {
		method: 'GET',
		headers: new Headers({'Content-Type': 'text/plain'})
	})
}

/*
 * codeObject : { code: "function..." }
 */
function postCode(hash, codeObject) {
	return fetchURL(_serverURL + '/code/' + hash, {
		method: 'POST',
		body: JSON.stringify(codeObject),
		headers: new Headers({'Content-Type': 'application/json'})
	})
}

function getCode(hash) {
	return fetchURL(_serverURL + '/code/' + hash, {
		method: 'GET',
		headers: new Headers({'Content-Type': 'text/plain'})
	})
}

export { getHash, postCode, getCode }
