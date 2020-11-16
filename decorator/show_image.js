'user strict';

import { userOptions } from "../options.js"

function show_image(node, username) {

  const userlist = userOptions.showImageUserList;
  if (!userlist) return
  if (!userlist.includes('*') && (userlist.indexOf(username) == -1)) return

  let url = node.querySelector('.tw-link')
  if (!url) return
  // if(!/(https:)([/|.|\w|\s|%])*\.(?:jpeg|jpg|gif|png|svg)/i.test(url.innerText)) return
  if (!/^https:/i.test(url.innerText)) return
  if (!/(jpg|jpeg|gif|png|svg)$/i.test(url.innerText)) return

  let g = document.createElement('br')
  url.appendChild(g)

  let imgLink = url.innerText.replace(/\s/g, '')
  g = document.createElement('div')
  g.setAttribute("class", "l4t-url-image")
  g.setAttribute("style", `background: url('${imgLink}') no-repeat center center / cover;`)
  g.innerText = imgLink
  url.innerText = ''
  g.onload = () => node.scrollIntoView()
  url.appendChild(g)
}

export { show_image }
