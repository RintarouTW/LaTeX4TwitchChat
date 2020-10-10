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

function speak(textNode, text) {
	if (userOptions.speechLang == "disabled") return
	let utterthis = new SpeechSynthesisUtterance(text)
	let voiceIndex = voicesBy(userOptions.speechLang)[0].index
	utterthis.voice = allVoices[voiceIndex]
	speechSynthesis.speak(utterthis)
}

speechSynthesis.onvoiceschanged = initAllVoices

export { speak }
