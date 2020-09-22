'use strict';

import { makeid } from "./common.js"

function plot(text, fnStr) {

	let randID = makeid(10);
	let g = document.createElement('div');
	g.setAttribute("id", randID);
	g.setAttribute("style", "width: 350px; height:350px");
	text.appendChild(g);

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
	], {name:'', withLabel:false, strokeColor:'white'});
}

function dot(text, fnStr) {
	let g = document.createElement('div');
	g.setAttribute("style", "width: 350px;");

	let viz = new Viz()
	viz.renderSVGElement(fnStr)
		.then(function(element) {
			g.appendChild(element);
			text.appendChild(g);
			text.scrollIntoView();
		})
}

function graph(text, fnStr, is_digraph = false) {
	let type = is_digraph ? "digraph" : "graph"
	let prefix = type + " { graph [bgcolor=transparent]; node[fontcolor=white;color=white]; edge [color=white]; "
	let str = prefix + fnStr + "}"
	dot(text, str)
}

export { plot, dot, graph }
