'user strict';

var userlist = ["rintaroutw", "taftaff", "Renly", "Filmzy_"]

function show_image(node, username) {

	if (userlist.indexOf(username) == -1) return

	let url = node.querySelector('.tw-link')
	if (!url) return

	let matched = url.innerText.match(/(https:)([/|.|\w|\s|-])*\.(?:jpeg|jpg|gif|png|svg)/) 
	if (!matched || matched.length == 0) return

	let g = document.createElement('img')
	g.setAttribute("style", "max-width: 350px;");
	g.setAttribute("src", url.innerText);
	g.onload = function() {
		node.scrollIntoView()
	}
	url.appendChild(g)

	console.log(g)
}

export { show_image }
