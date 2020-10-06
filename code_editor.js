'use strict';

import { loadCSS, loadScript } from "./common.js"
import { highlight } from "./code.js"
import { TWChatInput, TWChatSendButton } from "./tw_elements_finder.js"
import { getHash, postCode, getCode } from "./code_server.js"

loadCSS("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/codemirror.min.css")
loadCSS("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/theme/tomorrow-night-bright.min.css")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/codemirror.min.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/mode/javascript/javascript.min.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/mode/python/python.min.js")
//loadScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/keymap/vim.min.js")
//loadScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/keymap/sublime.min.js")

var _cmInstance; /* code mirror editor */

/* View */
function createSendButton() {
	// send button
	let sendButton = document.createElement("button")
	sendButton.setAttribute("style", "margin-bottom:5px;padding:0px 5px 0px 5px")
	sendButton.setAttribute("class", "tw-flex tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--primary tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative")
	sendButton.innerHTML = "send"
	return sendButton
}

function createButtonsBar() {
	// buttons bar
	let bar = document.createElement("div")
	bar.setAttribute("style", "background-color:#0f111a")
	bar.setAttribute("class", "tw-flex tw-full-width tw-justify-content-center tw-pd-l-1 tw-pd-r-1")
	return bar
}

function createPopupButton() {
	// create the popup button in the chat buttons container
	let popupButton = document.createElement("button")
	// Fixme: need to be refined
	popupButton.setAttribute("style", "padding:0px 6px 0px 6px;margin:6px 0px 6px 0px")
	popupButton.setAttribute("class", "tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--primary tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative")
	popupButton.innerHTML = "code"
	return popupButton
}

function createCloseButton() {
	let closeButton = document.createElement("button")
	closeButton.setAttribute("style", "margin-bottom:5px;padding:0px 5px 0px 5px")
	closeButton.setAttribute("class", "tw-absolute tw-left-0 tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--primary tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden")
	closeButton.innerHTML = "close"
	return closeButton
}

function createHashLabel() {
	let hashLabel = document.createElement("div")
	hashLabel.setAttribute("style", "font-family:monospace;color:#666666;padding-top:8px")
	hashLabel.setAttribute("class", "tw-absolute tw-mg-r-1 tw-right-0")
	return hashLabel
}

function createCodeWindow() {
	let codeWindow = document.createElement("div")
	codeWindow.setAttribute("class", "tw-absolute tw-full-width tw-z-above tw-hide")
	return codeWindow
}

/* Controller */

function newHashFromServer(hashLabel, sendButton) {
	// get new hash
	getHash().then( json => {
		hashLabel.innerHTML = json.hash
		sendButton.disabled = false // enable send button
	}).catch(error => {
		console.error(error)
		alert(error.message)
		sendButton.disabled = false // enable send button
	})
}

function codeEditor() {

	let content_container = document.getElementsByClassName("chat-room__content")[0]
	let codeWindow = createCodeWindow()
	let popupButton = createPopupButton()
	let textarea = document.createElement("textarea")
	textarea.value = "Edit the code here.."
	let bar = createButtonsBar()
	let closeButton = createCloseButton()
	let hashLabel = createHashLabel()
	let sendButton = createSendButton()

	codeWindow.appendChild(textarea)

	bar.appendChild(closeButton)
	bar.appendChild(sendButton)
	bar.appendChild(hashLabel)
	codeWindow.appendChild(bar)

	content_container.appendChild(codeWindow)

	newHashFromServer(hashLabel, sendButton)

	// code mirror editor
	_cmInstance = CodeMirror.fromTextArea(textarea, {
		mode: {name: "javascript"},
		//mode: {name: "python"},
		//keymap: "vim",
		autoRefresh: true,
		autofocus: true,
		tabSize: 2,
		indentUnit: 2,
		lineNumbers: true,
		theme: "tomorrow-night-bright"
	})
	_cmInstance.refresh() 

	popupButton.addEventListener("click", evt => {
		codeWindow.classList.toggle("tw-hide")
		if(!codeWindow.classList.contains("tw-hide")){
			_cmInstance.refresh()
			_cmInstance.focus()
		}
	});

	closeButton.addEventListener("click", evt => {
		codeWindow.classList.toggle("tw-hide")
		if(!codeWindow.classList.contains("tw-hide")) {
			_cmInstance.refresh()
			_cmInstance.focus()
		}
	})

	let twChatInput = TWChatInput()
	let twChatSendButton = TWChatSendButton()

	sendButton.addEventListener("click", evt => {
		sendButton.disabled = true
		postCode(hashLabel.innerHTML, {code : _cmInstance.getValue()}).then( json => {
			hashLabel.innerHTML = json.newHash
			codeWindow.classList.toggle("tw-hide")
			sendButton.disabled = false
			twChatInput.focus()
			// the original hash is returned if the code was posted success
			document.execCommand("insertText", true, "!pre " + json.hash) 
			twChatSendButton.click()
		}).catch( error => {
			console.error(error)
			alert(error.message)
		})
	})

	return popupButton
}

function pre(textNode, payload) {
	let hash = payload.replace(/\s/g, '')
	// check payload
	if(!/^[a-zA-z0-9]{10}$/.test(hash)) {
		console.log("invalid hash : " + hash)
		return
	}
	getCode(hash).then( json => {
		highlight(textNode, json.code)
	}).catch(error => {
		highlight(textNode, error.message)
	})
}

export { codeEditor, pre }
