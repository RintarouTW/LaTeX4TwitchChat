'user strict';

import { userOptions } from "../lib/options.js"

function show_note(node) {

  let fragments = node.getElementsByClassName('text-fragment')
  if (!fragments[0]) return

  let fragment = fragments[0]

  let text = fragment.innerText
  if (text[0] == '!'/* || /^Welcome! /.test(text)*/) return
  fragment.innerText = ''
  fragment.setAttribute('class' , 'text-fragment')
  
  let container = document.createElement('div')
  container.setAttribute('style', 'width: 100%; display: flex;')

  let note = document.createElement('div')
  note.setAttribute('class', 'l4t-note')
  note.innerText = text

  container.appendChild(note)

  let svg = document.createElement('button')
  svg.innerHTML = String.raw`<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>`
  svg.setAttribute("class", "l4t-copy-note-button")
  svg.setAttribute("show", "false")

  fragment.addEventListener("mouseenter", e => {
    svg.setAttribute("show", "true")
  })
  fragment.addEventListener("mouseleave", e => {
    svg.setAttribute("show", "false")
  })

  svg.addEventListener("click", e => {
    if (svg.getAttribute("show") == "false") return
    navigator.clipboard.writeText(text).then( () => {
      //console.log("copied") 
    })
  })

  container.appendChild(svg)
  fragment.appendChild(container)

  node.scrollIntoView()
}

export { show_note }
