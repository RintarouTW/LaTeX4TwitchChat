'use strict';

import { isExperimental, loadScript, loadCSS, makeid } from "../lib/common.js"
import { highlightText } from "../lib/highlight.js"

if (isExperimental()) {
  loadCSS("https://sagecell.sagemath.org/static/sagecell_embed.css")
  loadScript("https://sagecell.sagemath.org/static/embedded_sagecell.js")
}

function sage(textNode, payload) {
  if (!isExperimental()) {
    // SageMath is big and heavy, causing failure to load often
    // Only supported in debug mode
    highlightText(textNode, "SageMath is not stable enough to be used by end users yet.")
    return
  }

  let id = makeid(10) 
  let g = document.createElement('div')
  g.setAttribute('id', id)

  let script = document.createElement('script')
  script.setAttribute('type','text/x-sage')
  script.innerText = payload
  g.appendChild(script)
  textNode.appendChild(g)

  sagecell.makeSagecell({
    inputLocation:  '#' + id,
    template: {hide: ["files", "permalink"]},
    // minimal template won't show the code editor.
    // template:       sagecell.templates.minimal, 
    evalButtonText: 'Evaluate'
  });
}

export { sage }
