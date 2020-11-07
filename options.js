'use strict'

import { setTheme } from './themes.js'

let userOptions = {}

const UPDATE_OPTIONS_EVENT = "UpdateOptions"
const LOAD_OPTIONS_EVENT = "LoadOptions"

function updateOptions(json) {

  let data = JSON.parse(json)

  for (const key in data) {
    // if ( typeof (userOptions[key]) == typeof (data[key]) ) 
      switch(key){
        case 'speechLang':
          userOptions[key] = data[key];
          break
        case 'showImageUserList':
          userOptions[key] = data[key].replace(/\s/g, '').split(',')
          break
        case 'theme':
          userOptions[key] = data[key];
          setTheme(data[key]);
          break
      }
  }
  // console.log(userOptions)
}

function loadOptions() {
  // Ask content script to load options from local storage 
  document.dispatchEvent(new CustomEvent(LOAD_OPTIONS_EVENT))
}

// Handle options changed event from content script
document.addEventListener(UPDATE_OPTIONS_EVENT, event =>	updateOptions(event.detail) )

export { userOptions, loadOptions }
