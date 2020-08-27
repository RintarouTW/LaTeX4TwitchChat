'use strict';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function loadCSS(url) {
	const link = document.createElement('link');
	link.href = url;
	link.type = 'text/css';
	link.rel = 'stylesheet';
	(document.head || document.documentElement).appendChild(link);
}

function loadScript(url, async = false) {
	var s = document.createElement('script');
	s.type = "text/javascript";
	s.src = url;
	s.async = async;
	/*
	s.onload = function () {
		//this.remove();
		//console.log(url + "is loaded");
	};*/
	(document.head || document.documentElement).appendChild(s);
}

loadCSS("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js")
loadCSS("https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/copy-tex.css")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/copy-tex.min.js")

// jsxgraph for plotting simple function
loadCSS("https://cdn.jsdelivr.net/npm/jsxgraph@1.1.0/distrib/jsxgraph.css")
loadScript("https://cdn.jsdelivr.net/npm/jsxgraph@1.1.0/distrib/jsxgraphcore.js")


const options = {
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
	}
}

function makeid(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function plot(text, fnStr) {
	let randID = makeid(10);
	let g = document.createElement('div');
	g.setAttribute("id", randID);
	g.setAttribute("style", "width: 350px; height:350px;background-color:#fff;");
	text.appendChild(g);
	const board = JXG.JSXGraph.initBoard(randID, {
		boundingbox: [-5, 5, 5, -5], axis:true, showCopyright:false, showNavigation:true
	});

	let f = board.jc.snippet(fnStr, true, 'x', true);
  let curve = board.create('functiongraph',[f,
		function(){
			var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,0],board);
			return c.usrCoords[1];
		},
		function(){
			var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[board.canvasWidth,0],board);
			return c.usrCoords[1];
		}
	],{name:'', withLabel:false});

}

function hook() {  

	let container = document.getElementsByClassName("chat-scrollable-area__message-container")  

	if (!container || !(container[0])) {
		wait(1000).then(hook);
		return;
	}

	container = container[0]

	let observer = new MutationObserver(mutations =>{
		mutations.forEach(mutation => {
			mutation.addedNodes.forEach(node => {
				if (node.className == "chat-line__message") {
					// console.log(node)
					let texts = node.getElementsByClassName("text-fragment")
					for ( let text of texts) {
						let tokens = text.textContent.split(" ")
						if (tokens[0] == "!plot") {
							let fnStr = text.textContent.replace(/!plot/,'')
							//console.log(fnStr)
							if(fnStr.length > 0)
								plot(text, fnStr);
						} else {
							text && text.textContent && katex && renderMathInElement(text, options)        
						}
					}
					node.scrollIntoView()
				}
			})
		})
	})

	let config = {childList: true}
	observer.observe(container, config)

	// console.log("LaTeX4TwitchChat Installed")
}

hook();
