'use strict';

import {highlight} from "./code.js"

function renderMath(textNode) {

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
		},
		errorCallback : function (err) {
			let msg = err.toString().replace('KaTeX auto-render:', '')
			msg = msg.replace(/ with $/, '')
			highlight(textNode, msg)
		}
	}

	renderMathInElement(textNode, katex_options)
}

export { renderMath }
