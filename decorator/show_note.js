'user strict';

import { userOptions } from "../options.js"

function show_note(node) {

  let fragments = node.getElementsByClassName('text-fragment')
  if (!fragments[0]) return

  let text = fragments[0].innerText
  if (text[0] == '!'/* || /^Welcome! /.test(text)*/) return
  fragments[0].setAttribute('class' , 'text-fragment l4t-note')
  node.scrollIntoView()
}

export { show_note }
