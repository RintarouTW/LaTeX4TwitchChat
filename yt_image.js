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
/*
  fetch('https://img.youtube.com/vi/' + videoId + '/0.jpg', {
    method: 'GET',
    mode: 'no-cors'
  }).then( res => {
    console.log(res.blob())
    if (!res.ok) throw 'failed to get image'*/
    let g = document.createElement('br')
    url.appendChild(g)

    g = document.createElement('div')
    g.setAttribute("style", 'width:300px; height: 90px; background: url(https://img.youtube.com/vi/' + videoId + '/0.jpg) no-repeat center center / cover; border-radius: 20px;');
    g.onload = () => node.scrollIntoView()
    url.appendChild(g)
  // }).catch(error => console.log(error))
}

export { yt_image }
