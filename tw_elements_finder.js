'use strict';

function TWChatButtonsContainer() {
	let chatButtonsContainer = document.getElementsByClassName("chat-input__buttons-container")[0]

	if (chatButtonsContainer)
		return chatButtonsContainer

	console.error("chat-buttons-container not found")
	return null
}

function TWChatInput() {
	let textAreas = document.getElementsByTagName("textarea")

	for (let x of textAreas) 
		if (x.getAttribute("data-a-target") == "chat-input")
			return x

	console.error("chat-input not found")
	return null
}

function TWChatSendButton() {
	let buttons = document.getElementsByClassName("tw-core-button--primary")

	for (let x of buttons) 
		if (x.getAttribute("data-a-target") == "chat-send-button")
			return x

	console.error("chat-send-button not found")
	return null
}

export {
	TWChatButtonsContainer,
	TWChatInput,
	TWChatSendButton
}
