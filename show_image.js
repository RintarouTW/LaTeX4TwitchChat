'user strict';

var userlist = ["rintaroutw", "taftaff", "Renly", "Filmzy_"]

function show_image(node, username) {

	if (userlist.indexOf(username) == -1) return

	let url = node.getElementsByClassName('tw-link')
	if (url.length == 0) return

	let matched = url[0].innerText.match(/(https:)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg)/) 
	if (!matched || matched.length == 0) return

	let g = document.createElement('img')
	g.setAttribute("style", "max-width: 350px;");
	g.setAttribute("src", url[0].innerText);
	g.onload = function() {
		node.scrollIntoView()
	}
	url[0].appendChild(g)

	console.log(g)
}

export { show_image }
