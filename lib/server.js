'use strict';

import { fetchURL } from './common.js'

const _serverURL = "https://fathomless-brushlands-18222.herokuapp.com"

// resolve({ code: "function..." })
// reject({ error : { code : integer, message : string } })

function stdGetHeader() {
  return {
    method: 'GET',
    headers: new Headers({'Content-Type': 'text/plain'})
  }
}

function getVideoInfo(videoId) {
  return fetchURL(_serverURL + '/yt/' + videoId, stdGetHeader())
}

function gisSearch(keyword) {
  let params = { keyword }
  return fetchURL(_serverURL + '/gis?' + new URLSearchParams(params), stdGetHeader())
}

function disSearch(keyword) {
  let params = { keyword }
  return fetchURL(_serverURL + '/dis?' + new URLSearchParams(params), stdGetHeader())
}

function wikiSearch(keyword) {
  let params = { keyword }
  return fetchURL(_serverURL + '/wiki?' + new URLSearchParams(params), stdGetHeader())
}

function isoFromText(text) {
  let params = { text : text }
  return fetchURL(_serverURL + '/isoFromText?' + new URLSearchParams(params), stdGetHeader())
}

function getHash() {
  return fetchURL(_serverURL + '/code/hash', stdGetHeader())
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

export { 
  getHash, 
  postCode,
  getCode,
  isoFromText,
  getVideoInfo,
  wikiSearch,
  gisSearch,
  disSearch
}
