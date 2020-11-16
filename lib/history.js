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
function prevHistoryMessage() {
  if (currentIndex == 0) return null
  return messageByIndex(--currentIndex)
}

function nextHistoryMessage() {
  if (currentIndex == history.length) return null
  return messageByIndex(++currentIndex)
}

function setHistoryBuffer(msg) {
  if (currentIndex < history.length) return
  unsentBuffer = msg
}

function sendHistoryMessage(msg) {
  setHistoryBuffer('')
  history.push(msg)
  currentIndex = history.length
}

export {
  setHistoryBuffer,
  sendHistoryMessage,
  prevHistoryMessage,
  nextHistoryMessage
}
