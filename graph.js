'use strict';

import { makeid } from "./common.js"

function plot(textNode, text) {

	let randID = makeid(10);
	let g = document.createElement('div');
	g.setAttribute("id", randID);
	g.setAttribute("style", "width: 350px; height:350px");
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
	g.setAttribute("style", "width: 350px;");

	let viz = new Viz()
	viz.renderSVGElement(text)
		.then(function(element) {
			g.appendChild(element);
			textNode.appendChild(g);
			textNode.scrollIntoView();
		})
}

function graph(textNode, text) {
	let prefix = "graph { graph [bgcolor=transparent]; node[fontcolor=white;color=white]; edge [color=white]; "
	dot(textNode, prefix + text + "}")
}

function digraph(textNode, text) {
	let prefix = "digraph { graph [bgcolor=transparent]; node[fontcolor=white;color=white]; edge [color=white]; "
	dot(textNode, prefix + text + "}")
}

export { plot, dot, graph, digraph }
