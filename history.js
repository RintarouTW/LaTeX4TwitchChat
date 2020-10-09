'use strict';

/* current index */
let currentMessageIndex = 0
/* unsent message */
let unsentBuffer = ''
/* sent messages */
let sentMessageHistory = []

function getMessageByIndex(index) {
	if (currentMessageIndex == sentMessageHistory.length) return unsentBuffer 
	return sentMessageHistory[index]
}

/* exports */
function getPrevMessage() {
	if (currentMessageIndex == 0) return false
	currentMessageIndex -= 1
	return getMessageByIndex(currentMessageIndex)
}

function getNextMessage() {
	if (currentMessageIndex == sentMessageHistory.length) return false
	currentMessageIndex += 1
	return getMessageByIndex(currentMessageIndex)
}

function updateBuffer(msg) {
	if (currentMessageIndex < sentMessageHistory.length) return
	unsentBuffer = msg
}

function sendMessage(msg) {
	updateBuffer('')
	sentMessageHistory.push(msg)
	currentMessageIndex = sentMessageHistory.length
}

export {
	updateBuffer,
	sendMessage,
	getPrevMessage,
	getNextMessage
}
