'use strict';

let platform = (typeof(browser) != 'undefined') ? browser : chrome

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
	platform.storage.local.set(data, () => {
		//console.log("saved")
	})
}

function langList() {
	speechSynthesis.cancel()
	let langs = []
	speechSynthesis.getVoices()
		.map( x => x.lang)
		.map( x => !langs.includes(x) && langs.push(x))

	langs.sort().unshift("Disabled", "Auto")
	return langs
}

function init() {
	let langs = langList()

	let speech = document.getElementById('speechLang')
	speech.innerHTML = "" // remove all children first
	langs.map( lang => {
		let opt = document.createElement('option')
		opt.value = lang
		opt.innerText = lang
		speech.appendChild(opt)
	})

	speech.onchange = handleChange
	document.getElementById('showImageUserList').onchange = handleChange

  const themeList = [
    'default' ,
    'rintaroutw-modern',
    'rintaroutw-luxury',
    'adianta',
    'uunnxx'
  ]

	let theme = document.getElementById('theme')
	theme.innerHTML = "" // remove all children first
	themeList.map( name => {
		let opt = document.createElement('option')
		opt.value = name
		opt.innerText = name
		theme.appendChild(opt)
	})
	theme.onchange = handleChange

	getSavedOptions()
}

function getSavedOptions() {

	const option_keys = [
		"speechLang",
		"showImageUserList",
    "theme"
	];

	platform.storage.local.get(option_keys, data => {
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

if (typeof(browser) != 'undefined')
  document.addEventListener("DOMContentLoaded", init) // for FireFox
