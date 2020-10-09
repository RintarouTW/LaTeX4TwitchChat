'use strict';

/* current index */
let currentMessageIndex = 0
/* unsent message */
let unsentMessage = ''
/* sent messages */
let sentMessageHistory = []

function getMessageByIndex(index) {
	if (currentMessageIndex == sentMessageHistory.length) return unsentMessage
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

function updateUnsentMessage(msg) {
	if (currentMessageIndex < sentMessageHistory.length) return
	unsentMessage = msg
}

function sendMessage(msg) {
	updateUnsentMessage('')
	sentMessageHistory.push(msg)
	currentMessageIndex = sentMessageHistory.length
}

export {
	updateUnsentMessage,
	sendMessage,
	getPrevMessage,
	getNextMessage
}
