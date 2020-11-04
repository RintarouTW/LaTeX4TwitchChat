'use strict'

import { gisSearch } from './server.js'
import { say } from './speech.js'

function showImage(node, {url, width, height, description}) {

  let link = document.createElement('a')
  link.target = '_blank'
  link.href = url
  link.setAttribute("class", "l4t-link")

  let g = document.createElement('div')
  g.setAttribute("class", "l4t-url-image")
  g.setAttribute("style", `background: url('${url}') no-repeat center center / cover;`)
	g.onload = () => node.scrollIntoView()
	link.appendChild(g)

  let desc = document.createElement('div')
  desc.setAttribute("class", "l4t-gis-desc")

  desc.innerText = description
  link.appendChild(desc)
  node.appendChild(link)
  node.scrollIntoView()
}

function gisSearchText(node, text) {
  
  let keyword = text.replace(/(^\s|\s$)*/, '') 
  if (!keyword) return
  // console.log(keyword)
  say(node, text)
  gisSearch(keyword).then(img => {
    showImage(node, img)
  }).catch(err => {
    console.log(err)
  })
}

export { gisSearchText }
