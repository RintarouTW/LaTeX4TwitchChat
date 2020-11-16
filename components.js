'use strict';

import { TWChatInput, TWChatButtonsContainer, TWChatSendButton } from "./tw_elements.js"
import { popupButtonForEditor } from "./code_editor.js"
import { previewMath } from "./math/render_math.js"
import { 
  setHistoryBuffer,
  sendHistoryMessage,
  prevHistoryMessage,
  nextHistoryMessage 
} from "./history.js"

let previewBox

function createPreviewBox() {
  previewBox = document.createElement("div")
  // previewBox.setAttribute("class", "tw-align-items-center tw-overflow-hidden tw-flex")
  previewBox.setAttribute("class", "l4t-preview-window")
  /* don't wrap on white space, also prevent the flex box eating the white spaces */
  previewBox.setAttribute("style", "white-space: pre; margin-left: .7em;") 
  return previewBox
}

/* totalLines of textarea */
function totalLines(textarea) {
  return textarea.value.split('\n').length
}

/* current lineNo of the cursor */
function cursorLineNo(textarea) {
  return textarea.value.substr(0, textarea.selectionStart).split('\n').length
}

function keyBinding(evt) {
  let target = evt.target
  switch (evt.code) {
    case 'KeyL': // clear chat with ctrl + l
      if (evt.ctrlKey) {
        target.focus()
        target.select()
        document.execCommand("insertText", true, '/clear ')
        TWChatSendButton().click()
      }
      break
    case 'Enter':
      if (!evt.shiftKey) {
        sendHistoryMessage(target.value)
        // document.dispatchEvent(new CustomEvent('test', {detail:'reset'}))
        previewBox.innerHTML = ''
      }
      break
    case 'ArrowUp': // history traverse
      if (cursorLineNo(target) == 1) {
        let msg = prevHistoryMessage()
        if (msg != null) {
          target.focus()
          target.select()
          document.execCommand("insertText", true, msg)
        }
      }
      break
    case 'ArrowDown': // history traverse
      if (cursorLineNo(target) == totalLines(target)) {
        let msg = nextHistoryMessage()
        if (msg != null) {
          target.focus()
          target.select()
          document.execCommand("insertText", true, msg)
        }
      }
      break
  }
}

function hookL4TComponents() {
  // Preview the user input for LaTeX locally 
  previewBox = createPreviewBox()
  let chatInput = TWChatInput()

  chatInput.addEventListener("input", evt => {
    setHistoryBuffer(evt.target.value)
    if (!(/\$.*\$/.test(chatInput.value))) {
      previewBox.innerText = ""
      return
    }
    previewBox.innerText = chatInput.value
    previewMath(previewBox)
  })

  // consider autocomplete the commands and history just like the shell
  chatInput.addEventListener("keydown", keyBinding)

  // the popup button of the code editor
  let popupButton = popupButtonForEditor()
  let chatButtonsContainer = TWChatButtonsContainer()

  // chatButtonsContainer.insertBefore(popupButton, chatButtonsContainer.childNodes[1])
  chatButtonsContainer.insertBefore(previewBox, chatButtonsContainer.childNodes[1])
  chatButtonsContainer.insertBefore(popupButton, previewBox)
}

export { hookL4TComponents }
