'user strict';

import { userOptions } from "./options.js"

function show_quote(node) {

  let fragments = node.getElementsByClassName('text-fragment')
  if (!fragments[0]) return

  let fragment = fragments[0]
  if (!fragment) return

  let text = fragment.innerText.replace(/(^\s|\s$)/g, '') // remove the spaces before and after.
  let quotes = text.match(/^"(\w|\s|-|.)*"$/)     // search for ^" and "$ case
  let quote
  if (quotes) {
    quote = quotes[0].replace(/(^"|"$)/g, '')     // remove ^" and "$ from string
  } else  {
     quotes = text.match(/(?=^> ((\w|\s|-|.)*))/) // search for ^> case
    if(!quotes) return
    quote = quotes[1]
  }
  if (!quote) return    // empty quote, just return
  fragment.innerText = ''
  fragment.setAttribute('class' , 'text-fragment l4t-quote')
  let g = document.createElement('span')
  g.innerText = quote
  fragment.appendChild(g)
  node.scrollIntoView()
}

export { show_quote }
