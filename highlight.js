'use strict';

import { loadCSS, loadScript } from "./common.js"
import { getCode } from "./server.js"

// code beautify
loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify-css.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify-html.js")

// highlight.js
loadCSS("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/styles/tomorrow-night-bright.min.css")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/highlight.min.js")
/* Languages */
loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/languages/javascript.min.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/languages/python.min.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/languages/bash.min.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/languages/cpp.min.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/languages/css.min.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/languages/json.min.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/languages/julia.min.js")

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

function highlightText(textNode, text) {
  let g = document.createElement('code')
  g.innerText = text

  let pre = document.createElement('pre')

  pre.appendChild(g)
  textNode.appendChild(pre)

  hljs.highlightBlock(pre)
  textNode.scrollIntoView()
}

function highlightCode(textNode, text) {
  let g = document.createElement('code')
  g.innerText = text

  let svg = document.createElement('button')
  svg.innerHTML = String.raw`<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>`
  svg.setAttribute("class", "l4t-copy-code-button")
  svg.setAttribute("show", "false")

  let pre = document.createElement('pre')
  pre.addEventListener("mouseenter", e => {
    svg.setAttribute("show", "true")
  })
  pre.addEventListener("mouseleave", e => {
    svg.setAttribute("show", "false")
  })

  svg.addEventListener("click", e => {
    if (svg.getAttribute("show") == "false") return
    navigator.clipboard.writeText(text).then( () => {
      //console.log("copied") 
    })
  })

  pre.appendChild(g)
  textNode.appendChild(pre)

  hljs.highlightBlock(pre)
  pre.appendChild(svg)
  textNode.scrollIntoView()
}

function pre(textNode, payload) {
  let hash = payload.replace(/\s/g, '')
  // check payload
  if(!/^[a-zA-z0-9]{10}$/.test(hash)) {
    console.log("invalid hash : " + hash)
    return
  }
  getCode(hash).then( json => {
    highlightCode(textNode, json.code)
  }).catch(error => {
    highlightCode(textNode, error.message)
  })
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

  highlightCode(textNode, beautified, type)
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

export { code, html, css, highlightText, highlightCode, pre }
