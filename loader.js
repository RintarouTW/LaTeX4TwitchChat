'use strict'

/* - workaround
 * duplicate from default.js for Firefox which 
 * won't support import within content script
 */
const defaultOptions = { 
	speechLang : "Disabled",
	showImageUserList : "",
  theme : "default"
}

const UPDATE_OPTIONS_EVENT = "UpdateOptions"
const LOAD_OPTIONS_EVENT = "LoadOptions"

let platform = (typeof(browser) != 'undefined') ? browser : chrome

function loadScript(src) {
  /* Insert the final install script to the head */
  let s = document.createElement('script');
  s.type = "module";
  s.src = platform.runtime.getURL(src);
  (document.head || document.documentElement).appendChild(s);
}

function loadCSS(src) {
  const link = document.createElement('link');
  link.href = platform.runtime.getURL(src);
  link.type = 'text/css';
  link.rel = 'stylesheet';
  (document.head || document.documentElement).appendChild(link);
}

function updateOptions(data) {
  const json = JSON.stringify(data)
  let evt = new CustomEvent(UPDATE_OPTIONS_EVENT, { detail: json });
  document.dispatchEvent(evt);
}

function init() {

  document.addEventListener(LOAD_OPTIONS_EVENT, (evt) => {
/* import within content script just won't work in Firefox, 
 * the workaround is to duplicate from default.js
 */
//  import('./default.js').then(module => {
//      const defaultOptions = module.defaultOptions */
      platform.storage.local.get(Object.keys(defaultOptions), (data) => {
        let options = Object.assign({}, defaultOptions)
        for (let key in data) options[key] = data[key]
        updateOptions(options)
      })
//    })
  })

  /* Config changed by Popup/Option page */
  platform.storage.onChanged.addListener((changes, namespace) => {
    if(namespace != "local") return

    let data = {}
    for (let key in changes)
      data[key] = changes[key].newValue
    updateOptions(data)
  })

  loadCSS("./styles/latex4twitch.css")
  loadCSS("./styles/custom_twitch.css")
  loadCSS("./styles/wiki.css")
  loadScript("themes.js")
  loadScript("latex4twitch.js")
}

init()
