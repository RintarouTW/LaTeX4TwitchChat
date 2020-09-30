'use strict';

import { wait, loadCSS, loadScript } from "./common.js"
import { code, html, css, highlight } from "./code.js"
import { renderMath, tex, cheat } from "./render_math.js"
import { matrix, gauss } from "./matrix.js"
import { dot, graph, digraph, plot } from "./graph.js"
import { show_image } from "./show_image.js"
import { calc } from "./calc.js"
import { sage } from "./sage.js"

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

function hook() {  

	let hooks = [
		["!matrix" /* command */ , " [a,b,c; d,e,f]" /* usage example */, matrix /* handler */],
		["!tex", " \\TeX", tex ],
		["!cheat", "", cheat ],

   	["!code", " function hello_world() { console.log(\"hello world\") } ", code ],
		["!html", " <html><body><h1>Hello World</h1></body></html>", html ],
		["!css", " body { background-color: #666666 } ", css ],

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

	if (!container || !(container[0])) {
		wait(1000).then(hook)
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
							/*
							let svgTexts = textNode.getElementsByTagName('text')
							for (let text of svgTexts) renderMath(text)
							*/
						}
					}

					node.scrollIntoView()
				}
			})
		})
	})

	observer.observe(container, {childList: true})
	// console.log("LaTeX4TwitchChat Installed")
}

hook();
