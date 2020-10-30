'use strict'

const defaultOptions = { 
	speechLang : "Disabled",
	showImageUserList : ""
}

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
  let evt = new CustomEvent("UpdateOptions", { detail: json });
  document.dispatchEvent(evt);
}

function init() {

  document.addEventListener("LoadOptions", (evt) => {
    platform.storage.local.get(Object.keys(defaultOptions), (data) => {
      let options = Object.assign({}, defaultOptions)
      for (let key in data) options[key] = data[key]
      updateOptions(options)
    })
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
  loadScript("latex4twitch.js")
}

init()
