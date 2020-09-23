'use strict';

const option = {
  "indent_size": "2",
  "indent_char": " ",
  "max_preserve_newlines": "5",
  "preserve_newlines": true,
  "keep_array_indentation": false,
  "break_chained_methods": false,
  "indent_scripts": "normal",
  "brace_style": "end-expand",
  "space_before_conditional": true,
  "unescape_strings": false,
  "jslint_happy": false,
  "end_with_newline": false,
  "wrap_line_length": "50",
  "indent_inner_html": false,
  "comma_first": false,
  "e4x": false,
  "indent_empty_lines": false
}

function beautify(text, type = "code") {

	const func_map = {
		"code": js_beautify,
		"html": html_beautify,
		"css": css_beautify
	}

	let plaintext = text.textContent.replace(/^!(code|css|html)\s*/, '')
	text.textContent = "!" + type
	let currNode = text.nextElementSibling
	while (currNode) {
		plaintext += currNode.innerText
		let nextNode = currNode.nextElementSibling
		console.log(currNode.nodeName)
		//if ((currNode.nodeName != "A") && nextNode && (nextNode.nodeName != "A"))
		//	plaintext += '\n'
		currNode.parentNode.removeChild(currNode)
		currNode = nextNode
	}
	//console.log(plaintext)

	let beautified = (func_map[type])(plaintext, option)

	let g = document.createElement('code')
	g.innerText = beautified

	let pre = document.createElement('pre')
	pre.appendChild(g)
	text.appendChild(pre)

	hljs.highlightBlock(pre)
}

function code(text) {
	beautify(text, "code")
}

function html(text) {
	beautify(text, "html")
}

function css(text) {
	beautify(text, "css")
}

export { code, html, css }
