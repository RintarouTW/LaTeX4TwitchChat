'use strict';

import { wait, loadCSS, loadScript } from "./common.js"
import { code, html, css, highlight } from "./code.js"
import { matrix, gauss } from "./matrix.js"
import { dot, graph, digraph, plot } from "./graph.js"
import { show_image } from "./show_image.js"
import { calc } from "./calc.js"

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

function help(text) {
	highlight(text, `
	!plot : plotting ur function
	!dot : draw graph via dot language
	!graph : undirected graph
	!digraph : directed graph
	!matrix : fast way to present a matrix
	!gauss : Gauss elimenate a matrix
	!mc : math calculator, check http://mathjs.org
	!code : beautify and highlight ur code
	!html : present html source
	!css : present css source
	`)
}

function hook() {  

	let hooks = [
		["!plot", " x + cos(x) - sin(x)", plot /* command handler */],
		["!dot", " digraph {1->2->3}", dot /* command handler */],
		["!digraph", " {1->2->3}", digraph /* command handler */],
		["!graph", " {1--2--3}", graph /* command handler */],
		["!matrix", " [a,b,c; d,e,f]", matrix /* command handler */],
		["!gauss", " [1,2,3; 4,5,6]", gauss /* command handler */],
		["!mc", " m=[1,2,3;4,5,6]", calc /* command handler */],
		["!code", " function hello_world() { console.log(\"hello world\") } ", code],
		["!html", " <html><body><h1>Hello World</h1></body></html>", html],
		["!css", " body { background-color: #666666 } ", css],
		["!help", "", help/* command handler */]
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

					for ( let text of texts) 
						text && text.textContent && katex && renderMathInElement(text, katex_options)        

					node.scrollIntoView()
				}
			})
		})
	})

	observer.observe(container, {childList: true})
	// console.log("LaTeX4TwitchChat Installed")
}

hook();
