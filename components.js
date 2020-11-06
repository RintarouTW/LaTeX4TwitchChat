'use strict';

import { TWChatInput, TWChatButtonsContainer, TWChatSendButton } from "./tw_elements_finder.js"
import { popupButtonForEditor } from "./code_editor.js"
import { previewMath } from "./render_math.js"
import { updateBuffer, sendMessage, prevMessage, nextMessage } from "./history.js"

function createPreviewBox() {
	let previewBox = document.createElement("div")
	previewBox.setAttribute("class", "tw-align-items-center tw-overflow-hidden tw-flex")
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

function hookL4TComponents() {
	/* Preview the user input for LaTeX locally */
	let previewBox = createPreviewBox()
	let chatInput = TWChatInput()

	chatInput.addEventListener("input", evt => {
		updateBuffer(evt.target.value)
		if (!(/\$.*\$/.test(chatInput.value))) {
			previewBox.innerText = ""
			return
		}
		previewBox.innerText = chatInput.value
		previewMath(previewBox)
	})

	/* consider autocomplete the commands and history just like the shell */
	chatInput.addEventListener("keydown", evt => {
		let target = evt.target
		switch (evt.code) {
      case 'KeyL':
        if (evt.ctrlKey) {
          target.focus()
          target.select()
          document.execCommand("insertText", true, '/clear ')
          TWChatSendButton().click()
        }
        break
      case 'Enter':
        if (!evt.shiftKey) {
          sendMessage(target.value)
          previewBox.innerHTML = ""
        }
        break
      case 'ArrowUp':
        if (cursorLineNo(target) == 1) {
          let msg = prevMessage()
          if (msg != null) {
            target.focus()
            target.select()
            document.execCommand("insertText", true, msg)
          }
        }
        break
      case 'ArrowDown':
        if (cursorLineNo(target) == totalLines(target)) {
          let msg = nextMessage()
          if (msg != null) {
            target.focus()
            target.select()
            document.execCommand("insertText", true, msg)
          }
        }
        break
    }
  })

  // the popup button of the code editor
  let popupButton = popupButtonForEditor()
  let chatButtonsContainer = TWChatButtonsContainer()

  chatButtonsContainer.insertBefore(previewBox, chatButtonsContainer.childNodes[1])
  chatButtonsContainer.insertBefore(popupButton, previewBox)
}

export { hookL4TComponents }
