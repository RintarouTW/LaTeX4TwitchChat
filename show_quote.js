'user strict';

import { userOptions } from "./options.js"

function show_quote(node) {

  let fragments = node.getElementsByClassName('text-fragment')
  if (!fragments[0]) return

  let fragment = fragments[0]
  if (!fragment) return

  let text = fragment.innerText.replace(/(^\s|\s$)/g, '')
  let quotes = text.match(/^"(\w|\s|-|.)*"$/) 
  if (!quotes) return
  let quote = quotes[0].replace('"', '').replace('"', '')

  fragment.setAttribute('class' , 'text-fragment l4t-quote')
  let g = document.createElement('span')
  g.innerText = quote
  fragment.innerText = ''
  fragment.appendChild(g)
  node.scrollIntoView()
}

export { show_quote }
