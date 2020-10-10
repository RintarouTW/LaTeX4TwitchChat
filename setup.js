'use strict';

function handleChange(evt) {
  let target = evt.target
	let data = {}
	data[target.name] = target.options[target.selectedIndex].value
	// save to the storage
	chrome.storage.local.set(data, () => {
		//console.log("saved")
	})
}

function langList() {
	speechSynthesis.cancel()
	let langs = ["disabled"]
	speechSynthesis.getVoices()
		.map( x => x.lang)
		.map( x => !langs.includes(x) && langs.push(x))
	return langs
}

function init() {
	let langs = langList()
	console.log(langs)
	let speech = document.getElementById('speechLang')
	speech.innerHTML = "" // remove all children first
	langs.map( lang => {
		let opt = document.createElement('option')
		opt.value = lang
		opt.innerHTML = lang
		speech.appendChild(opt)
	})

	speech.onchange = handleChange

	getSavedOptions()
}

function getSavedOptions() {

	let option_keys = [
		"speechLang"
	];

	chrome.storage.local.get(option_keys, data => {
		for (let key in data) {
			let element = document.getElementById(key);
			if (element.type == 'select-one') {
				document.querySelector('#' + key + ' [value="' + data[key] + '"]').selected = true
				console.log("data[" + key +"] = " + data[key])
			}
		}
	})
}

speechSynthesis.onvoiceschanged = init

