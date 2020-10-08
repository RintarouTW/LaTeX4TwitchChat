'use strict';

function TWChatButtonsContainer() {
	let chatButtonsContainer = document.querySelector(".chat-input__buttons-container")
	if (chatButtonsContainer) return chatButtonsContainer

	console.error("chat-buttons-container not found")
	return null
}

function TWChatInput() {
	let target = document.querySelector("textarea[data-a-target=chat-input]")
  if (target) return target

	console.error("chat-input not found")
	return null
}

function TWChatSendButton() {
  let target = document.querySelector("button[data-a-target=chat-send-button]")
  if (target) return target

	console.error("chat-send-button not found")
	return null
}

export {
	TWChatButtonsContainer,
	TWChatInput,
	TWChatSendButton
}
