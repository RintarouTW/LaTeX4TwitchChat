'use strict'

import { disSearch } from '../server.js'
import { say } from '../speech.js'

function showImage(node, {url, width, height, description}) {

  let link = document.createElement('a')
  link.target = '_blank'
  link.href = url
  link.setAttribute("class", "l4t-link")

  let spinner = document.createElement('div')
  spinner.setAttribute("class", "sk-cube-grid")
  for (let i = 1; i <= 9; i++) {
    let cube = document.createElement('div')
    cube.setAttribute("class", `sk-cube sk-cube${i}`)
    spinner.appendChild(cube)
  }
  link.appendChild(spinner)

  let g = document.createElement('div')
  g.setAttribute("class", "l4t-url-image")
  link.appendChild(g)

  let img = new Image()
  img.addEventListener('load', () => {
    spinner.remove()
    g.style.backgroundImage = 'url(' + img.src + ')'
    node.scrollIntoView()
  })
  img.addEventListener('error', () => {
    spinner.remove()
  })
  // console.log(url)
  img.src = url

  let desc = document.createElement('div')
  desc.setAttribute("class", "l4t-gis-desc")

  desc.innerText = description
  link.appendChild(desc)
  node.appendChild(link)
  node.scrollIntoView()
}

function disSearchText(node, text) {

  let keyword = text.replace(/(^\s|\s$)*/, '') 
  if (!keyword) return
  // console.log(keyword)
  disSearch(keyword).then(img => {
    showImage(node, img)
    say(node, text)
  }).catch(err => {
    console.log(err)
  })
}

export { disSearchText }
