'use strict';

import { loadCSS, loadScript } from "../lib/common.js"
import { highlightText } from "../lib/highlight.js"

// KaTeX for LaTeX rendering
loadCSS("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js")
loadCSS("https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/copy-tex.css")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/copy-tex.min.js")

let katex_options = {
  // output: "html", // keep mathml for copy-tex to work
  delimiters: [
    { left: "$$", right: "$$", display: true },
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true },
    { left: "\\begin{equation}", right: "\\end{equation}", display: true}
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
}

function tex(textNode, payload) {
  try {
    textNode.innerHTML = katex.renderToString(payload, katex_options)
  } catch (err) {
    let msg = err.toString().replace(' KaTeX parse error:', '')
    highlightText(textNode, msg)
  }
}

function previewMath(textNode) {

  katex_options.errorCallback = function (err) {
    let msg = err.toString().replace('KaTeX auto-render:', '')
    msg = msg.replace(/ with $/, '')
    textNode.textContent = ""
    highlightText(textNode, msg)
  }

  try {
    renderMathInElement(textNode, katex_options)
  } catch (err) {
    //console.log(err)
  }
}

function renderMath(textNode) {

  katex_options.errorCallback = function (err) {
    let msg = err.toString().replace('KaTeX auto-render:', '')
    msg = msg.replace(/ with $/, '')
    highlightText(textNode, msg)
  }

  renderMathInElement(textNode, katex_options)
}

function cheat(textNode) {
  textNode.textContent += String.raw`
  $$\LaTeX \text{ Symbols }$$
  $$
  \begin{array}{r|r|r|r}
  \land & land & \lor & lor\\
  \cup & cup & \cap & cap\\
  \lt & lt & \gt & gt\\
  \leq & leq & \geq & geq\\
    = & = & \neq & neq\\
  \subset & subset & \supset & supset\\
  \subseteq & subseteq & \supseteq & supseteq\\
  \varnothing & varnothing\\
  \preceq & preceq & \succeq & succeq\\
  \approx & approx\\
  \equiv & equiv &
    \cong & cong\\
  \simeq & simeq\\
  \forall & forall & \exists & exists\\
  \in & in& \ni & ni\\
  \notin & notin\\
  \end{array}
  $$
  `
  const links = [
    { text: 'more examples', url: 'https://hackmd.io/@RintarouTW/LaTeX_%E8%AA%9E%E6%B3%95%E7%AD%86%E8%A8%98'},
    { text: 'Graphviz Graph Attributes', url: 'https://graphviz.org/doc/info/attrs.html'}
  ]
  links.map( a => {
    let p = document.createElement('p')
    let g = document.createElement('a')
    g.innerText = a.text
    g.setAttribute('href', a.url)
    p.appendChild(g)
    textNode.appendChild(p)
  })
}


export { renderMath, tex, cheat, previewMath }
