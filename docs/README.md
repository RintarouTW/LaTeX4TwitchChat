# LaTeX in Twitch Chat

A simple Chrome extension to rendering $\LaTeX$ in Twitch Chat messages.

## Install

1. [Download](https://github.com/RintarouTW/LaTeX4TwitchChat/zipball/release) the release branch as a zip and decompress it to a folder.

   [下載](https://github.com/RintarouTW/LaTeX4TwitchChat/zipball/release) release branch 成 .zip 檔案，並解壓縮。
2. In your Chrome URL, type `chrome://extensions/`, it'll lead you to the extensions management page.

   在 Chrome URL 中輸入 `chrome://extensions/`，進入延伸套件管理頁面。
3. Toun on the **Developer Mode** with the toggle on the top right corner of the page.

   開啟右上角 **開發人員模式**。
4. Click on `Load unpacked`  button and choose the decompressed directory.

   按下載入未封裝項目按鍵並選擇解壓縮後的檔案夾，即完成安裝。

## Usage in Twitch Chat Room

### Inline Mode

```
This is a inline $\LaTeX$.
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
