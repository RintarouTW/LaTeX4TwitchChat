'user strict';

import { userOptions } from "./options.js"

function show_image(node, username) {

  const userlist = userOptions.showImageUserList;
  if (!userlist.includes('*') && (userlist.indexOf(username) == -1)) return

	let url = node.querySelector('.tw-link')
	if (!url) return
  if(!/(https:)([/|.|\w|\s|%])*\.(?:jpeg|jpg|gif|png|svg)/i.test(url.innerText)) return

  let g = document.createElement('br')
  url.appendChild(g)

	g = document.createElement('img')
	g.setAttribute("style", "max-width: 300px;");
	g.setAttribute("src", url.innerText);
	g.onload = () => node.scrollIntoView()
	url.appendChild(g)
}

export { show_image }
