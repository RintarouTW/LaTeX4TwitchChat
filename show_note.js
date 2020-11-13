'user strict';

import { userOptions } from "./options.js"

function show_note(node) {

  let fragments = node.getElementsByClassName('text-fragment')
  fragments[0].setAttribute('class' , 'text-fragment l4t-note')
  node.scrollIntoView()
}

export { show_note }
