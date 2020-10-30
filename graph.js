'use strict';

import { makeid, loadCSS, loadScript } from "./common.js"
import { highlightText } from "./highlight.js"

// jsxgraph for plotting simple function
loadCSS("https://cdn.jsdelivr.net/npm/jsxgraph@1.1.0/distrib/jsxgraph.css")
loadScript("https://cdn.jsdelivr.net/npm/jsxgraph@1.1.0/distrib/jsxgraphcore.js")

// viz.js for dot, graph and digraph
loadScript("https://cdnjs.cloudflare.com/ajax/libs/viz.js/2.1.2/viz.js")
loadScript("https://cdnjs.cloudflare.com/ajax/libs/viz.js/2.1.2/lite.render.js")

function plot(textNode, text) {

	let randID = makeid(10);
	let g = document.createElement('div');
	g.setAttribute("id", randID);
	g.setAttribute("style", "width: 300px; height:300px");
	textNode.appendChild(g);

	const board = JXG.JSXGraph.initBoard(randID, {
		boundingbox: [-5, 5, 5, -5], axis:false, showCopyright:false, showNavigation:true
	});

	JXG.Options.axis.strokeColor = "#666666"

	// draw x axis
	let xaxis = board.create('axis',
		[ [0,0],[1,0] ], {
			label: {offset: [7, -10]}, // Doesn't do anything here.
			drawZero:false // Doesn't do anything here.
		});
	xaxis.removeAllTicks();
	board.create('axis', [[0,0],[1,0]], {
		ticks: {
			drawLabels: true,
			strokeColor: 'grey',
			label: {
				offset: [-4, -15],
				strokeColor: '#666666'
			}
		}
	});

	// draw y axis
	let yaxis = board.create('axis',	[ [0,0],[0,1] ]);
	yaxis.removeAllTicks();
	board.create('axis', [[0,0],[0,1]], {
		ticks: {
			drawLabels: true,
			strokeColor: 'grey',
			label: {
				offset: [-15, -1],
				strokeColor: '#666666'
			}
		}
	});

	// draw function
	let f = board.jc.snippet(text, true, 'x', true);
	let curve = board.create('functiongraph',[f,
		function(){
			var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,0],board);
			return c.usrCoords[1];
		},
		function(){
			var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[board.canvasWidth,0],board);
			return c.usrCoords[1];
		}
	], {name:'', withLabel:false, strokeColor:'white'});
}

function dot(textNode, text) {
	let g = document.createElement('div');
	g.setAttribute("style", "max-width: 300px");

	let viz = new Viz()
	viz.renderSVGElement(text)
		.then( element => {
			g.appendChild(element);
			textNode.appendChild(g);
			textNode.scrollIntoView();
		}, err => {
			highlightText(textNode, err.toString())
		})
}

function ddot(textNode,text) {
	let theme_setting = String.raw`graph [bgcolor=transparent]; node[fontcolor=white;color=white]; edge [color=white];`
	let loc_bracket = text.indexOf('{') + 1
	let prefix = text.substr(0, loc_bracket)
	let postfix = text.substr(loc_bracket, text.length)

	dot(textNode, prefix + theme_setting + postfix)
}

function graph(textNode, text) {
	let rankdir = ""
	if (/^\s?-i\s+/.test(text)) {
		rankdir = ";rankdir=BT"
		text = text.replace(/^\s?-i\s+/, '')
  }
  let prefix = "graph { graph [bgcolor=transparent" + rankdir + "]; node[fontcolor=white;color=white]; edge [color=white]; "

  dot(textNode, prefix + text + "}")
}

function digraph(textNode, text) {
  let rankdir = ""
  if (/^\s?-i\s+/.test(text)) {
    rankdir = ";rankdir=BT"
    text = text.replace(/^\s?-i\s+/, '')
  }
  let prefix = "digraph { graph [bgcolor=transparent" + rankdir + "]; node[fontcolor=white;color=white]; edge [color=white]; "
  dot(textNode, prefix + text + "}")
}

export { plot, dot, ddot, graph, digraph }
