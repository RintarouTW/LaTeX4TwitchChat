'use strict';

import { highlight } from "./code.js"

var parser

function calc(text, fnStr) {

	if (!parser)
		parser = math.parser()

	if (fnStr.replace(/\s*/g, '') == "clear") {
		parser.clear()
		text.textContent += "$$\\mathrm{cleared}$$"
		return
	}

	try {
		let res = parser.evaluate(fnStr)
		let resStr = math.format(res, { precision: 14 })
		let tex = math.parse(resStr).toTex()
		text.textContent += "$$" + tex + "$$"
	}
	catch (err) {
		highlight(text, err.toString())
	}
}

export {calc}
