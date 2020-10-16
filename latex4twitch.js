'use strict';

import { wait, loadCSS, loadScript } from "./common.js"
import { hookL4TComponents } from "./components.js"
import { code, html, css, highlightText, pre } from "./highlight.js"
import { renderMath, tex, cheat } from "./render_math.js"
import { matrix, gauss } from "./matrix.js"
import { dot, ddot, graph, digraph, plot } from "./graph.js"
import { show_image } from "./show_image.js"
import { calc } from "./calc.js"
import { sage } from "./sage.js"
import { speak, say, shutup } from "./speech.js"

function help(textNode) {

  highlightText(textNode, String.raw`
  --[ LaTeX ]-- 
  $\LaTeX$ : inline mode; $$\LaTeX$$ : display mode
  !matrix : fast way to present a matrix
  !tex : show the parse error of ur tex string.
  !cheat : some used often symbols
  --[ Code ]-- 
  !code : beautify and highlight ur code
  !css : present css source
  !html : present html source
  --[ Plotting and Graph ]-- 
  !plot : plotting ur function (JSXGraph)
  !dot : draw graph via dot language (Graphviz)
  !ddot : draw graph via dot language in dark mode
  !graph : undirected graph
  !digraph : directed graph
  --[ Calculation ]-- 
  !gauss : Gauss elimenates a matrix
  !mc : math calculator, (http://mathjs.org)
  --[ Speech ]--
  !say : say the words in the specified language.
  !shutup : stop the speech right away.
  `)
}

(function hookup() {  

  let hooks = [
    ["!matrix" /* command */ , " [a,b,c; d,e,f]" /* usage example */, matrix /* handler */],
    ["!tex", " \\TeX", tex ],
    ["!cheat", "", cheat ],

    ["!code", " function hello_world() { console.log(\"hello world\") } ", code ],
    ["!html", " <html><body><h1>Hello World</h1></body></html>", html ],
    ["!css", " body { background-color: #666666 } ", css ],
    ["!pre", " hash code", pre ],

    ["!plot" , " x + cos(x) - sin(x)" , plot ],
    ["!dot", " digraph {1->2,3->6}", dot ],
    ["!ddot", " digraph {1->2,3->6}", ddot ],
    ["!digraph", " -i {1->2,3,5;2->6,10;3->6,15;5->10,15;6,10,15->30}", digraph ],
    ["!graph", " {1--2,3--6}", graph ],

    ["!gauss", " [1,2,3; 4,5,6]", gauss ],
    ["!mc", " m=[1,2,3;4,5,6]", calc ],
    // ["!sage", " Posets.DivisorLattice(30)", sage ],
    
    ["!say", " zh 你好", say ],
    ["!shutup", "", shutup ],
    ["!help", "", help ]
  ]

  let container = document.querySelector(".chat-scrollable-area__message-container")

  if (!container || (typeof CodeMirror == 'undefined')) {
    wait(1000).then(hookup)
    return
  }

  let observer = new MutationObserver(mutations =>{
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.className == "chat-line__message") {
          /* show image by URL directly, privileged users only */
          let username = node.querySelector(".chat-author__intl-login")
          if (username) {
            username = username.innerText.replace(/[\( \)]/g, '')
            show_image(node, username)
          }

          let texts = node.getElementsByClassName("text-fragment")
          let cmd = texts[0]
          if (cmd) { /* commands handling */
            let tokens = cmd.textContent.split(" ")
            hooks.map( h => {
              if (tokens[0] == h[0]) {
                /* get the user command payload */
                let payload = cmd.textContent.replace(h[0], '') 
                if (payload.length == 0) {
                  payload = h[1]
                  cmd.textContent += payload
                }
                (h[2])(cmd, payload) // call command handler
              }
            })
          }

          for (let textNode of texts) {
            /* LaTeX rendering in chat messages */
            if (textNode && textNode.textContent && katex) 
              renderMath(textNode)

            /* TTS */
            if (textNode.childElementCount == 0) { /* speech for pure text only */
              textNode.classList.add('l4t-speechable')
              textNode.addEventListener("click", () => {
                navigator.clipboard.writeText(textNode.innerText)/*.then( () => { console.log('copied') }) */
                speak(textNode, textNode.innerHTML)
              })
            }
          }
          node.scrollIntoView()
        }
      })
    })
  })
  observer.observe(container, {childList: true})
  hookL4TComponents()
})()
