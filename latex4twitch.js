'use strict';

import { matrix } from "./matrix.js"
import { wait, loadCSS, loadScript } from "./common.js"
import { graph, dot, plot } from "./graph.js"
import { show_image } from "./show_image.js"
import { code, html, css } from "./code.js"

// KaTeX for LaTeX rendering
loadCSS("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js")
loadCSS("https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/copy-tex.css")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/copy-tex.min.js")

// jsxgraph for plotting simple function
loadCSS("https://cdn.jsdelivr.net/npm/jsxgraph@1.1.0/distrib/jsxgraph.css")
loadScript("https://cdn.jsdelivr.net/npm/jsxgraph@1.1.0/distrib/jsxgraphcore.js")

// viz.js for dot, graph and digraph
loadScript("https://cdnjs.cloudflare.com/ajax/libs/viz.js/2.1.2/viz.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/viz.js/2.1.2/lite.render.js")

// code beautify
loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify-css.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify-html.js")

// highlight.js
loadCSS("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/styles/tomorrow-night.min.css")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/highlight.min.js")

// mathjs
loadScript("https://cdnjs.cloudflare.com/ajax/libs/mathjs/7.2.0/math.min.js")

const katex_options = {
	delimiters: [
		{ left: "$$", right: "$$", display: true },
		{ left: "$", right: "$", display: false },
		{ left: "\\(", right: "\\)", display: false },
		{ left: "\\[", right: "\\]", display: true }
	],
	trust: true,
	strict: "ignore",
	macros: {
		"\\eqref": "\\href{#1}{}",   // not support yet
		"\\label": "\\href{#1}{}",   // not support yet
		"\\require": "\\href{#1}{}", // not support yet
		"\\tag": "\\href{#1}{}",     // not support yet
		"\\hfil": "\\space",         // not support yet
		"\\style": "\\href{#1}{}",   // not support yet
		"\\def": "\\gdef", // def only work in local context, make it global
		"\\cal": "\\mathcal",
		"\\pmatrix": "\\begin{pmatrix}#1\\end{pmatrix}",
		"\\vmatrix": "\\begin{vmatrix}#1\\end{vmatrix}",
		"\\bmatrix": "\\begin{bmatrix}#1\\end{bmatrix}",
		"\\cases": "\\begin{cases}#1\\end{cases}",
		"\\align": "\\begin{aligned}#1\\end{aligned}",
		"\\eqalign": "\\begin{aligned}#1\\end{aligned}",
		"\\array": "\\begin{array}#1\\end{array}",
		"\\gather": "\\begin{gathered}#1\\end{gathered}",
	}
}

function hook() {  

	let hooks = [
		["!plot", " x + cos(x) - sin(x)", plot /* command handler */, false /*option*/],
		["!dot", " digraph {1->2->3}", dot /* command handler */, false /*option*/],
		["!digraph", " {1->2->3}", graph /* command handler */, true /*option*/],
		["!graph", " {1--2--3}", graph /* command handler */, false /*option*/],
		["!matrix", " [1,2,3], [4,5,6]", matrix /* command handler */, false /*option*/],
		["!gauss", " [1,2,3], [4,5,6]", matrix /* command handler */, true /*option*/],
		["!code", " function hello_world() { console.log(\"hello world\") } ", code, false ],
		["!html", " <html><body><h1>Hello World</h1></body></html>", html, false ],
		["!css", " body { background-color: #666666 } ", css, false ]
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
					for ( let text of texts) {
						let tokens = text.textContent.split(" ")
						hooks.map( h => {
							if (tokens[0] == h[0]) {
								let fnStr = text.textContent.replace(h[0], '') /* get the user command payload */
								if (fnStr.length == 0) {
									fnStr = h[1]
									text.textContent += fnStr 
								}
								(h[2])(text, fnStr, h[3], username, node) // call command handler
							}
						})
						text && text.textContent && katex && renderMathInElement(text, katex_options)        
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
