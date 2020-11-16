'use strict'

import { wikiSearch } from '../lib/server.js'

function wikiSearchText(node, text) {

  let keyword = text.replace(/(^\s|\s$)*/, '') 

  return wikiSearch(keyword).then( resp => {
    // console.log(resp)
    if (!resp.title) throw 'no title'
    if (!resp.link) throw 'no link'
    if (!resp.extract) throw 'no extract'

    let container = document.createElement('div')
    container.setAttribute("class", "l4t-wiki-container")

    let title_container = document.createElement('div')
    title_container.setAttribute("class", "l4t-wiki-title-container")
    let title = document.createElement('div')
    title.setAttribute("class", "l4t-wiki-title")
    title.innerText = resp.title
    let before = document.createElement('div')
    before.setAttribute("class", "l4t-wiki-title-before")
    let after = document.createElement('div')
    after.setAttribute("class", "l4t-wiki-title-after")
    title_container.appendChild(before)
    title_container.appendChild(title)
    title_container.appendChild(after)

    let desc = document.createElement('div')
    desc.setAttribute("class", "l4t-wiki-desc")
    desc.innerText = resp.extract

    let link_container = document.createElement('div')
    link_container.setAttribute("class", "l4t-wiki-link")

    let link = document.createElement('a')
    link.setAttribute("class", "tw-link l4t-wiki-link")
    link.href = resp.link
    link.target = '_blank'
    link.innerText = resp.link
    link_container.appendChild(link)

    container.appendChild(title_container)
    container.appendChild(desc)
    container.appendChild(link_container)

    node.appendChild(container)
    node.scrollIntoView()

  }).catch( err => { 
    console.log(err) 
  })
}

export { wikiSearchText }
