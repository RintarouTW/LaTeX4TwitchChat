# LaTeX in Twitch Chat

A simple Chrome extension to render and copy $\LaTeX$ in Twitch Chat messages.
Some functions via commands, ex: plotting a function, draw graphs, matrix calculation, etc.

## Install

1. [Download](https://github.com/RintarouTW/LaTeX4TwitchChat/zipball/release) the release branch as a zip and decompress it to a folder.

   [下載](https://github.com/RintarouTW/LaTeX4TwitchChat/zipball/release) release branch 成 .zip 檔案，並解壓縮。
2. In your Chrome URL, type `chrome://extensions/`, it'll lead you to the extensions management page.

   在 Chrome URL 中輸入 `chrome://extensions/`，進入延伸套件管理頁面。
3. Turn on the **Developer Mode** with the toggle on the top right corner of the page.

   開啟右上角 **開發人員模式**。
4. Click on `Load unpacked`  button and choose the decompressed directory.

   按下載入未封裝項目按鍵並選擇解壓縮後的檔案夾，即完成安裝。

## Usage in Twitch Chat Room

### Inline Mode

```
This is inline $\LaTeX$.
```

This is inline $\LaTeX$.

### Display Mode

```
This is display style: $$\LaTeX$$
```

This is display style: 

$$
\LaTeX
$$

### Copy

Click on the rendered $\LaTeX$ and copy it (CMD + C or CTRL + C), the original ```$\LaTeX$``` would be copied to the clipboard.

## Commands

###

Help for the commands list

```
!help
```

### Tex

Show the error in ur tex string.

```
!tex \LaTeX
```


### Cheat Sheet

Most used often $\LaTeX$ symbols

```
!cheat
```

### Code

Beautify and highlight the source code.

```
!code function hello() { console.log("hello world") }
```

HTML

```
!html <html><body><h1>Hello World</h1></body></html>
```


CSS
```
!css body { background-color: #666666 }
```

### Plot and Graph

Plotting simple functions.

```
!plot x + cos(x) - sin(x)
```

Draw graph and directed graph.

```
!graph {1--2--3}
!graph -i {1--2--3} // inverse order, bottom up.
!digraph {1->2,3->6}
!digraph -i {1->2,3->6} // inverse order, bottom up.
!dot digraph {a->b->c}
```
check https://graphviz.org/gallery/ for more examples.

### Matrix

Present a Matrix

```
!matrix [a,b,c; d,e,f]
```

Do Gauss elimination.

```
!gauss [1,2,3; 4,5,6]
```

### Math Calculator

Calculate the math for you.

```
!mc m = [1,2; 3,4]
!mc m^2
!mc 128^3
!mc inv(m)
!mc det(m)
!mc clear
```

check https://mathjs.org for more usages.

### SageMath

```
!sage Prosets.DivisorLattice(30)
```

check https://sagemath.org for more usages.

<script>
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

</script>
