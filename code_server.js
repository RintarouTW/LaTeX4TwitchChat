'use strict';

import { fetchURL } from './common.js'

// const _serverURL = "https://plaintext-code.glitch.me"
const _serverURL = "https://fathomless-brushlands-18222.herokuapp.com"

/*
 * resolve({ code: "function..." })
 * reject({ error : {
 *            code : integer,
 *            message : string
 *         }})
 */

function stdGetHeader() {
  return {
    method: 'GET',
    headers: new Headers({'Content-Type': 'text/plain'})
  }
}

function isoFromText(text) {
  let params = { text : text }
  return fetchURL(_serverURL + '/?' + new URLSearchParams(params), stdGetHeader())
}

function getHash() {
  return fetchURL(_serverURL + '/hash', stdGetHeader())
}

function getCode(hash) {
  return fetchURL(_serverURL + '/code/' + hash, stdGetHeader())
}

function postCode(hash, codeObject) {
  return fetchURL(_serverURL + '/code/' + hash, {
    method: 'POST',
    body: JSON.stringify(codeObject),
    headers: new Headers({'Content-Type': 'application/json'})
  })
}

export { getHash, postCode, getCode, isoFromText }
