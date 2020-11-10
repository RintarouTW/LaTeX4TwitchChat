'use strict';

import { loadScript } from "../common.js"
import { highlightText } from "../highlight.js"

// mathjs
loadScript("https://cdnjs.cloudflare.com/ajax/libs/mathjs/7.2.0/math.min.js")

var parser

function calc(text, fnStr) {

  if (!parser) parser = math.parser()

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
  }	catch (err) {
    highlightText(text, err.toString())
  }
}

export { calc }
