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

function highlight(textNode, text) {
	let g = document.createElement('code')
	g.innerText = text

	let pre = document.createElement('pre')
	pre.appendChild(g)
	textNode.appendChild(pre)

	hljs.highlightBlock(pre)
}

function beautify(textNode, type = "code") {

	const func_map = {
		"code": js_beautify,
		"html": html_beautify,
		"css": css_beautify
	}

	let plaintext = textNode.textContent.replace(/^!(code|css|html)\s*/, '')
	textNode.textContent = "!" + type
	let currNode = textNode.nextElementSibling
	while (currNode) {
		plaintext += currNode.innerText
		let nextNode = currNode.nextElementSibling
		currNode.parentNode.removeChild(currNode)
		currNode = nextNode
	}

	let beautified = (func_map[type])(plaintext, option)

	highlight(textNode, beautified, type)
}

function code(textNode) {
	beautify(textNode, "code")
}

function html(textNode) {
	beautify(textNode, "html")
}

function css(textNode) {
	beautify(textNode, "css")
}

export { code, html, css, highlight }
