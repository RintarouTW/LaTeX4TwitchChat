'use strict'

const themes = {
  'default' : {
    '--text-base-color': 'white',
    '--badge-filter': 'none',
    '--round-border-radius': 'none',
    '--username-font-weight': 'bold', 
    '--username-filter': 'none',
    '--mention-background-color': '#507c6a',
    '--mention-border': 'none'
  },
  'rintaroutw-luxury' : {
    // '--font-base': 'cursive',
    // 'font-weight': '600',
    '--text-base-color': 'cornsilk',
    '--badge-filter': 'hue-rotate(10deg) invert(1)',
    '--round-border-radius': '60px',
    '--username-font-weight': 'normal',
    '--username-filter': 'none',
    '--mention-background-color': '#000',
    '--mention-border': '1px solid #666'
  },
  'rintaroutw-modern' : {
    '--text-base-color': 'white',
    '--badge-filter': 'hue-rotate(10deg) invert(1)',
    '--round-border-radius': '60px',
    '--username-font-weight': 'normal',
    '--username-filter': 'hue-rotate(160deg)',
    '--mention-background-color': '#507c6a',
    '--mention-border': '1px solid #363636'
  },
  'adianta' : {
    '--text-base-color': 'white',
    '--badge-filter': 'hue-rotate(30deg) invert(1)',
    '--round-border-radius': '60px',
    '--username-font-weight': 'bold', 
    '--username-filter': 'none',
    '--mention-background-color': '#000',
    '--mention-border': '1px solid #363636'
  },
  'uunnxx' : {
    '--text-base-color': 'cornsilk',
    '--badge-filter': 'hue-rotate(30deg) invert(1)',
    '--round-border-radius': '3px',
    '--username-font-weight': 'normal',
    '--username-filter': 'none',
    '--mention-background-color': '#000',
    '--mention-border': '1px solid #363636'
  }
}

function setTheme(themeName) {
  const root = document.querySelector('.tw-root--theme-dark')
  if (!root) return
  const theme = themes[themeName]
  for (let key in theme) 
    root.style.setProperty(key, theme[key])
}

// window.setTheme = setTheme // for test

export { setTheme }
