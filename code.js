'use strict';

const option = {
  "indent_size": "2",
  "indent_char": " ",
  "max_preserve_newlines": "5",
  "preserve_newlines": true,
  "keep_array_indentation": false,
  "break_chained_methods": false,
  "indent_scripts": "normal",
  "brace_style": "collapse",
  "space_before_conditional": true,
  "unescape_strings": false,
  "jslint_happy": false,
  "end_with_newline": true,
  "wrap_line_length": "0",
  "indent_inner_html": false,
  "comma_first": false,
  "e4x": false,
  "indent_empty_lines": false
}

function code(text, fnStr) {

	let beautified = js_beautify(fnStr, option)
	text.textContent = "!code"

	let g = document.createElement('code')
	g.innerText = beautified

	let pre = document.createElement('pre')
	pre.appendChild(g)
	text.appendChild(pre)

	hljs.highlightBlock(pre)
}

export { code }
