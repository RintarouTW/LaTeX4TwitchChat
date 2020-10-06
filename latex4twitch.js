'use strict';

import { wait, loadCSS, loadScript } from "./common.js"
import { TWChatButtonsContainer, TWChatInput } from "./tw_elements_finder.js"
import { code, html, css, highlight } from "./code.js"
import { renderMath, tex, cheat, previewMath } from "./render_math.js"
import { matrix, gauss } from "./matrix.js"
import { dot, graph, digraph, plot } from "./graph.js"
import { show_image } from "./show_image.js"
import { calc } from "./calc.js"
import { sage } from "./sage.js"
import { codeEditor, pre } from "./code_editor.js"

function help(textNode) {
	highlight(textNode, String.raw`
	--[ LaTeX ]-- 
	$\LaTeX$ : inline mode; $$\LaTeX$$ : display mode
	!matrix : fast way to present a matrix
	!tex : show the parse error of ur tex string.
	!cheat : some used often symbols

	--[ Code ]-- 
	!code : beautify and highlight ur code
	!css : present css source
	!html : present html source
	
	--[ Graphics ]-- 
	!plot : plotting ur function (JSXGraph)
	!dot : draw graph via dot language (Graphviz)
	!graph : undirected graph
	!digraph : directed graph

	--[ Calculation ]-- 
	!gauss : Gauss elimenates a matrix
	!mc : math calculator, (http://mathjs.org)
	!sage : SageMath (http://sagemath.org)
	`)
}

function hookup() {  

	let hooks = [
		["!matrix" /* command */ , " [a,b,c; d,e,f]" /* usage example */, matrix /* handler */],
		["!tex", " \\TeX", tex ],
		["!cheat", "", cheat ],

   	["!code", " function hello_world() { console.log(\"hello world\") } ", code ],
		["!html", " <html><body><h1>Hello World</h1></body></html>", html ],
		["!css", " body { background-color: #666666 } ", css ],
		["!pre", " hash code", pre ],

		["!plot" , " x + cos(x) - sin(x)" , plot ],
		["!dot", " digraph {1->2,3->6}", dot ],
		["!digraph", " {1->2,3->6}", digraph ],
		["!graph", " {1--2,3--6}", graph ],
	
		["!gauss", " [1,2,3; 4,5,6]", gauss ],
		["!mc", " m=[1,2,3;4,5,6]", calc ],
		["!sage", " Posets.DivisorLattice(30)", sage ],

		["!help", "", help ]
	]

	let container = document.getElementsByClassName("chat-scrollable-area__message-container")

	if (!container || !(container[0]) || (typeof CodeMirror == 'undefined')) {
		wait(1000).then(hookup)
		return
	}

	container = container[0]

	let observer = new MutationObserver(mutations =>{
		mutations.forEach(mutation => {
			mutation.addedNodes.forEach(node => {
				if (node.className == "chat-line__message") {

					let username = node.getElementsByClassName("chat-author__intl-login")
					if (username[0]) {
						username = username[0].innerText.replace(/[\( \)]/g, '')
						show_image(node, username)
					}

					let texts = node.getElementsByClassName("text-fragment")
					let cmd = texts[0]

					if (cmd) {
						let tokens = cmd.textContent.split(" ")
						hooks.map( h => {
							if (tokens[0] == h[0]) {
								let payload = cmd.textContent.replace(h[0], '') /* get the user command payload */
								if (payload.length == 0) {
									payload = h[1]
									cmd.textContent += payload
								}
								(h[2])(cmd, payload) // call command handler
							}
						})
					}

					for (let textNode of texts) {
						if (textNode && textNode.textContent && katex) {
							renderMath(textNode)
						}

						textNode.addEventListener("click", () => {
							/* speech for pure text only */
							if (textNode.childElementCount > 0) return
							let utterThis = new SpeechSynthesisUtterance(textNode.innerHTML)
							utterThis.voice = speechSynthesis.getVoices()[66]
							speechSynthesis.speak(utterThis)
						})
					}

					node.scrollIntoView()
				}
			})
		})
	})

	observer.observe(container, {childList: true})

	/* Preview the user input for LaTeX locally */
	let chatInput = TWChatInput()
	let chatButtonsContainer = TWChatButtonsContainer()
	let preview = document.createElement("div")
	preview.setAttribute("style", "margin: 0px 5px 0px 5px;width:140px")
	preview.setAttribute("class", "tw-align-items-center tw-align-middle")

	chatButtonsContainer.insertBefore(preview, chatButtonsContainer.childNodes[1])
	chatInput.addEventListener("input", (evt) => {
		if (!(/\$.*\$/.test(chatInput.value))) {
			preview.innerHTML = ""
			return
		}
		preview.innerHTML = chatInput.value
		previewMath(preview)
	})

	chatInput.addEventListener("keydown", (evt) => {
		if (evt.code == 'Enter') {
			preview.innerHTML = ""
		}
	})

	// the code editor
	let popupButton = codeEditor()
  chatButtonsContainer.insertBefore(popupButton, preview)
}

hookup();
