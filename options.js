'use strict'

let userOptions = {}

function updateOptions(data) {
	for (const key in data) {
		//if ( typeof (userOptions[key]) == typeof (data[key]) ) 
		switch(key){
			case 'speechLang':
				userOptions[key] = data[key];
				break
			case 'showImageUserList':
				userOptions[key] = data[key].replace(/\s/g, '').split(',')
				break
		}
	}
	// console.log(userOptions)
}

/* Handle options changed event from content script */
document.addEventListener("UpdateOptions", event =>	updateOptions(event.detail) )

/* Ask content script to load options from local storage */
document.dispatchEvent(new CustomEvent("LoadOptions"))

export { userOptions }
