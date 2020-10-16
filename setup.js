'use strict';

function handleChange(evt) {
  let target = evt.target
	let data = {}
	switch(target.type) {
		case 'select-one':
			data[target.name] = target.options[target.selectedIndex].value
			break
		case 'text':
			data[target.name] = target.value
			break
	}
	// save to the storage
	chrome.storage.local.set(data, () => {
		//console.log("saved")
	})
}

function langList() {
	speechSynthesis.cancel()
	let langs = []
	speechSynthesis.getVoices()
		.map( x => x.lang)
		.map( x => !langs.includes(x) && langs.push(x))

	langs.sort().unshift("Auto", "Disabled")
	return langs
}

function init() {
	let langs = langList()

	let speech = document.getElementById('speechLang')
	speech.innerHTML = "" // remove all children first
	langs.map( lang => {
		let opt = document.createElement('option')
		opt.value = lang
		opt.innerHTML = lang
		speech.appendChild(opt)
	})

	speech.onchange = handleChange
	document.getElementById('showImageUserList').onchange = handleChange

	getSavedOptions()
}

function getSavedOptions() {

	let option_keys = [
		"speechLang",
		"showImageUserList"
	];

	chrome.storage.local.get(option_keys, data => {
		for (let key in data) {
			let element = document.getElementById(key);
			switch(element.type) {
				case 'select-one':
					document.querySelector('#' + key + ' [value="' + data[key] + '"]').selected = true
					break
				case 'text':
					document.querySelector('#' + key).value = data[key]
					break
			}
			// console.log("data[" + key +"] = " + data[key])
		}
	})
}

speechSynthesis.onvoiceschanged = init

