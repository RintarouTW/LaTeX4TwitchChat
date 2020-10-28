'user strict';

import { userOptions } from "./options.js"

function parseVideoId(link) {
  let videoId = link
  let id = link.match(/(watch\?|&)v=(\w|-)*/)
  if (id) videoId = id[0].split('=')[1]
  id = link.match(/(?<=^https:\/\/youtu.be\/)(\w|-)*/)
  if(id) videoId = id[0]
  if (/^http(s)?:/.test(videoId)) return undefined
  return videoId
}

function yt_image(node, username) {

  const userlist = userOptions.showImageUserList;
  if (!userlist.includes('*') && (userlist.indexOf(username) == -1)) return

	let url = node.querySelector('.tw-link')
  if (!url) return
  let videoId = parseVideoId(url.innerText)
  if (!videoId) return

  let g = document.createElement('br')
  url.appendChild(g)

  let imgLink = 'https://img.youtube.com/vi/' + videoId + '/0.jpg'
  let shortURL = 'https://youtu.be/' + videoId
  g = document.createElement('div')
  g.setAttribute("class", "l4t-yt-image")
  g.setAttribute("style", `background: url(${imgLink}) no-repeat center center / cover;`)
  g.innerText = shortURL
  url.innerText = ''
  g.onload = () => node.scrollIntoView()
  url.appendChild(g)
}

export { yt_image }
