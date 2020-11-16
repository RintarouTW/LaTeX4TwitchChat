'user strict';

import { userOptions } from "../lib/options.js"
import { getVideoInfo } from "../lib/server.js"

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
  if (!userlist) return
  if (!userlist.includes('*') && (userlist.indexOf(username) == -1)) return

  let url = node.querySelector('.tw-link')
  if (!url) return
  if (!/^http(s)?:/.test(url.innerText)) return

  let videoId = parseVideoId(url.innerText)
  if (!videoId) return

  let imgLink = 'https://img.youtube.com/vi/' + videoId + '/0.jpg'
  let shortURL = 'https://youtu.be/' + videoId
  let g = document.createElement('div')
  g.setAttribute("class", "l4t-yt-image")
  g.setAttribute("style", `background: url(${imgLink}) no-repeat center center / cover;`)
  g.innerText = shortURL
  url.innerText = ''
  g.onload = () => node.scrollIntoView()
  url.appendChild(g)

  let title = document.createElement('div')
  title.setAttribute("class", "l4t-yt-title")
  getVideoInfo(videoId).then( res => {
    if (res.error) throw res.error.message
    // console.log(res.snippet.title)
    title.innerText = res.snippet.title
    url.appendChild(title)
    node.scrollIntoView()
  }).catch( err => {
    console.log(err)
  })
}

export { yt_image }
