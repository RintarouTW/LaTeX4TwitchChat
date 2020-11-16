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

function TWChatRoomContentContainer() {
  let target = document.querySelector(".chat-room__content")
  if (target) return target

  console.error("chat-room__content not found")
  return null
}

function TWObserveThemeChange(updateTheme) {
  // Observe the theme change
  let chatTheme = document.querySelector("[data-a-target=chat-theme-light]")
  if (!chatTheme) chatTheme = document.querySelector("[data-a-target=chat-theme-dark]")
  if (!chatTheme) {
    console.log("failt to locate the chat theme section")
    return
  }
  updateTheme(chatTheme.getAttribute("data-a-target"))
  let themeObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if(mutation.attributeName == 'data-a-target') {
        let theme = chatTheme.getAttribute('data-a-target')
        updateTheme(theme)
      }
    })
  })
  themeObserver.observe(chatTheme, {attributes : true})
}

export {
  TWChatRoomContentContainer,
  TWChatButtonsContainer,
  TWChatInput,
  TWChatSendButton,
  TWObserveThemeChange
}
