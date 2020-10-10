'use strict';

var userOptions = { 
	speechLang : navigator.language
}

function updateOptions(data) {
	//console.log("option changed : " + data)
	for (const key in data) {
		if ( typeof (userOptions[key]) == typeof (data[key]) ) 
			userOptions[key] = data[key];
	}	
}

/* Handle options changed event from content script */
document.addEventListener("UpdateOptions", event => {
	let data = event.detail;
	updateOptions(data);
})

/* Ask content script to load options from local storage */
document.dispatchEvent(new CustomEvent("LoadOptions"))

export { userOptions }
