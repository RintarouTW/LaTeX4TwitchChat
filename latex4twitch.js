'use strict';

import { wait, loadCSS, loadScript } from "./common.js"
import { code, html, css, highlight } from "./code.js"
import { renderMath, tex, cheat } from "./render_math.js"
import { matrix, gauss } from "./matrix.js"
import { dot, graph, digraph, plot } from "./graph.js"
import { show_image } from "./show_image.js"
import { calc } from "./calc.js"

function help(text) {
	highlight(text, String.raw`
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
		["!tex", " \\TeX", tex],
		["!help", "", help /* command handler */],
		["!cheat", "", cheat /* command handler */]
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
