'use strict';

import { userOptions } from "./options.js"
import { isoFromText } from './server.js'

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

function queueSpeech(voiceIndex, text) {
  let utterthis = new SpeechSynthesisUtterance(text)
  utterthis.voice = allVoices[voiceIndex]
  speechSynthesis.speak(utterthis)
}

function autoSpeak(text) {
    isoFromText(text).then( json => {
      let iso = json.from.substr(0, 2)
      let voices = voicesByIso(iso.toLowerCase())
      if(voices.length == 0) return
      let voiceIndex = voices[0].index
      queueSpeech(voiceIndex, text)
    }).catch(error => console.log(error))
}

function speak(textNode, text) {
  let speechLang = userOptions.speechLang
  if (speechLang == "Disabled") return
  let cmd = text.replace(/^\s*/,'').split(' ')[0]
  if (cmd == '!pre') return
  if (cmd[0] == '!') text = text.replace(cmd, '') /* do not speak commands */
  if (speechLang == "Auto") {
    autoSpeak(text)
    return
  }
  let voiceIndex = voicesBy(speechLang)[0].index
  queueSpeech(voiceIndex, text)
}

function say(textNode, text) {
  if (userOptions.speechLang == "Disabled") return
  if(text.length == 0) return
  autoSpeak(text)
}

function shutup(textNode, text) {
  speechSynthesis.cancel()
}

speechSynthesis.onvoiceschanged = initAllVoices

export { speak, say, shutup }
