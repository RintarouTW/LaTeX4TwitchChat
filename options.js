'use strict';

var userOptions = { 
	speechLang : navigator.language,
	showUserImage : [],
  
}

function updateOptions(data) {
	for (const key in data) {
		//console.log(key)
		if ( typeof (userOptions[key]) == typeof (data[key]) ) 
			userOptions[key] = data[key];
	}
	console.log(userOptions)
}

/* Handle options changed event from content script */
document.addEventListener("UpdateOptions", event =>	updateOptions(event.detail) )

/* Ask content script to load options from local storage */
document.dispatchEvent(new CustomEvent("LoadOptions"))

export { userOptions }
