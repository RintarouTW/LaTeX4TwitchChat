'use strict';

const _serverURL = "https://plaintext-code.glitch.me"

function doFetch(url, init) {
	return new Promise((resolve, reject) => {
		fetch(url, init).then(response => {
			return response.json()
		}).then(json => { // response from server
			if (json.error) {
				//console.log(json)
				reject(json.error)
				return
			}
			resolve(json)
		}).catch( error => {
			//console.error(error)
			reject(error)
		})
	})
}

function getHash() {
	return doFetch(_serverURL + '/hash', {
		method: 'GET',
		headers: new Headers({'Content-Type': 'text/plain'})
	})
}

/*
 * codeObject : { code: "function..." }
 */
function postCode(hash, codeObject) {
	return doFetch(_serverURL + '/code/' + hash, {
		method: 'POST',
		body: JSON.stringify(codeObject),
		headers: new Headers({'Content-Type': 'application/json'})
	})
}

function getCode(hash) {
	return doFetch(_serverURL + '/code/' + hash, {
		method: 'GET',
		headers: new Headers({'Content-Type': 'text/plain'})
	})
}

export { getHash, postCode, getCode }
