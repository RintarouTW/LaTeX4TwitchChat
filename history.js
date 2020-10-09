'use strict';

/* unsent message */
let unsentBuffer = ''

/* current index */
let currentIndex = 0
/* history of sent messages */
let history = []

function messageByIndex(index) {
	if (currentIndex == history.length) return unsentBuffer 
	return history[index]
}

/* exports */
function prevMessage() {
	if (currentIndex == 0) return null
	currentIndex -= 1
	return messageByIndex(currentIndex)
}

function nextMessage() {
	if (currentIndex == history.length) return null
	currentIndex += 1
	return messageByIndex(currentIndex)
}

function updateBuffer(msg) {
	if (currentIndex < history.length) return
	unsentBuffer = msg
}

function sendMessage(msg) {
	updateBuffer('')
	history.push(msg)
	currentIndex = history.length
}

export {
	updateBuffer,
	sendMessage,
	prevMessage,
	nextMessage
}
