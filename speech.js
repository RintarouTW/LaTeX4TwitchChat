'use strict';

import { userOptions } from "./options.js"

var allVoices = []

function initAllVoices() {
	speechSynthesis.cancel()
	allVoices = speechSynthesis.getVoices()
}

function voicesBy(lang) {
	let result = []
	for(const [index, voice] of allVoices.entries()) {
		if (voice.lang == lang) 
			result.push( {voice: voice, index: index} )
	}
	return result
}

function voicesByIso(iso) {
	let result = []
	for(const [index, voice] of allVoices.entries()) {
		if (voice.lang.substr(0,2) == iso) 
			result.push( {voice: voice, index: index} )
	}
	return result
}

function speak(textNode, text) {
	if (userOptions.speechLang == "Disabled") return
  let cmd = text.replace(/^\s*/,'').split(' ')[0].toLowerCase()
  /* do not speak commands */
  if (cmd[0] == '!') return
	let voiceIndex = voicesBy(userOptions.speechLang)[0].index
	let utterthis = new SpeechSynthesisUtterance(text)
	utterthis.voice = allVoices[voiceIndex]
	speechSynthesis.speak(utterthis)
}

function say(textNode, text) {
	if (userOptions.speechLang == "Disabled") return
  let iso = text.replace(/^\s*/,'').split(' ')[0]
  if(iso.length != 2) return
  let str = text.replace(iso, '').replace(/(^\s*|\s*$)/, '')
  if(str.length == 0) return
  let voices = voicesByIso(iso.toLowerCase())
  if(voices.length == 0) return
	let voiceIndex = voices[0].index
	let utterthis = new SpeechSynthesisUtterance(str)
	utterthis.voice = allVoices[voiceIndex]
	speechSynthesis.speak(utterthis)
}

function shutup(textNode, text) {
  speechSynthesis.cancel()
}

speechSynthesis.onvoiceschanged = initAllVoices

export { speak, say, shutup }
