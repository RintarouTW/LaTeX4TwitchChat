function loadCSS(url) {
  const link = document.createElement('link');
  link.href = url;
  link.type = 'text/css';
  link.rel = 'stylesheet';
  (document.head || document.documentElement).appendChild(link);
}

function loadScript(url, onload = null, async = false) {
  var s = document.createElement('script');
  s.type = "text/javascript";
  s.src = url;
  s.async = async;
  if(onload) {
    s.onload = onload
  }
  (document.head || document.documentElement).appendChild(s);
}

const options = {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ],
      trust: true,
      strict: "ignore",
      macros: {
        "\\eqref": "\\href{#1}{}",   // not support yet
        "\\label": "\\href{#1}{}",   // not support yet
        "\\require": "\\href{#1}{}", // not support yet
        "\\tag": "\\href{#1}{}",     // not support yet
        "\\hfil": "\\space",         // not support yet
        "\\style": "\\href{#1}{}",   // not support yet
        "\\def": "\\gdef", // def only work in local context, make it global
        "\\cal": "\\mathcal",
        "\\pmatrix": "\\begin{pmatrix}#1\\end{pmatrix}",
        "\\cases": "\\begin{cases}#1\\end{cases}",
        "\\align": "\\begin{aligned}#1\\end{aligned}",
        "\\eqalign": "\\begin{aligned}#1\\end{aligned}",
        "\\array": "\\begin{array}#1\\end{array}",
        "\\gather": "\\begin{gathered}#1\\end{gathered}",
      }
    }

loadCSS("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js")
loadCSS("https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/copy-tex.css")
loadScript("https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/copy-tex.min.js", () => {
  renderMathInElement(document.body, options);
})

// load Twitch
loadScript("https://embed.twitch.tv/embed/v1.js", () => {
  new Twitch.Embed("twitch-embed", {
    width: 854,
    height: 480,
    channel: "rintaroutw",
    parent: ["rintaroutw.github.io"]
  })
})
