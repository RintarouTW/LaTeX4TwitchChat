'use strict';

import { loadScript, loadCSS, makeid } from "./common.js"

loadCSS("https://sagecell.sagemath.org/static/sagecell_embed.css")
loadScript("https://sagecell.sagemath.org/static/embedded_sagecell.js")

function sage(textNode, payload) {
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
    //template:       sagecell.templates.minimal, // minimal template won't show the code editor.
    evalButtonText: 'Evaluate'
	});
}

export {sage}
