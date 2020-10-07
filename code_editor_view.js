'use strict';
// ✉ : envelop
// ⚙ : gear
/* 
 * View 
 */

/* border radius */
const tw_border_radius_medium = "tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium "
const tw_border_radius_small = "tw-border-bottom-left-radius-small tw-border-bottom-right-radius-small tw-border-top-left-radius-small tw-border-top-right-radius-small "
/* content alignment */
const tw_align_center = "tw-align-items-center tw-align-middle tw-justify-content-center "
/* position and size */
const tw_relative = "tw-relative tw-inline-flex "
const tw_absolute_left = "tw-absolute tw-left-0 "
const tw_absolute_right = "tw-absolute tw-mg-r-1 tw-right-0 "
const tw_overflow_hidden = "tw-overflow-hidden "
/* interactive button */
const tw_button_primary = "tw-interactive tw-core-button tw-core-button--primary " + tw_border_radius_medium + tw_align_center + tw_overflow_hidden
const tw_button_icon = "tw-interactive tw-button-icon tw-button-icon--small tw-button-icon--secondary tw-core-button tw-core-button--small " + tw_align_center + tw_border_radius_small + tw_overflow_hidden

// panel of buttons
function createPanel() {
	let panel = document.createElement("div")
	panel.setAttribute("class", "l4t-panel tw-flex tw-full-width tw-justify-content-center tw-pd-l-1 tw-pd-r-1")
	return panel
}

// send button
function createSendButton() {
	let sendButton = document.createElement("button")
	sendButton.setAttribute("class", "l4t-send-button " + tw_button_primary + tw_relative)
	sendButton.innerHTML = "✓"
	return sendButton
}
// close button
function createCloseButton() {
	let closeButton = document.createElement("button")
	closeButton.setAttribute("class", "l4t-close-button " + tw_button_icon + tw_absolute_left)
	closeButton.innerHTML = "✗"
	return closeButton
}
// hash label
function createHashLabel() {
	let hashLabel = document.createElement("div")
	hashLabel.setAttribute("class", "l4t-hash-label " + tw_align_center + tw_absolute_right)
	return hashLabel
}
// the window of the editor
function createEditorWindow() {
	let editorWindow = document.createElement("div")
	editorWindow.setAttribute("class", "l4t-editor-window tw-absolute tw-full-width tw-z-above tw-hide")
	return editorWindow
}
// create the popup button in the chat buttons container
function createPopupButton() {
	let popupButton = document.createElement("button")
	popupButton.setAttribute("class", "l4t-popup-button " + tw_button_primary + tw_relative)
	popupButton.innerHTML = "✑"
	return popupButton
}

export {
	createPanel,
	createSendButton,
	createCloseButton,
	createHashLabel,
	createEditorWindow,
	createPopupButton
}
