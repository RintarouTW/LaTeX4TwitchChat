# $\LaTeX$ in Twitch Chat

A simple Chrome extension to render and copy $\LaTeX$ in Twitch Chat messages.
Some functions via commands, ex: plotting a function, draw graphs, matrix calculation, etc.

I'm from Taiwan, sorry for my poor English. You may check [my Twitch channel](https://twitch.tv/RintarouTW) to see the live demo.

<div id="twitch-embed"></div>

## Features

- Preview $\LaTeX$ locally and render them in the chat.
- Code editor for uploading your code being highlighted in original format to the chat.
 - Highlight the uploaded code and you can copy them by clicking the copy button.
- Graphviz support
- Plotting function
- Math Calculator
- Click the chat message to speech for learning different languages.
  (default disabled, you can enable this in the option page of the extension)
- <kbd>Up</kbd>/<kbd>Down</kbd> keys to traverse the history of messages your have sent.
- Auto load the image below the link of URL for the white listed users which is configured in the extension options.
- Search on Wikipedia

### Experimental

- SageMath cell support

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

Click on the rendered $\LaTeX$ and copy it (<kbd>Cmd/Ctrl</kbd> + <kbd>C</kbd>), the original ```$\LaTeX$``` would be copied to the clipboard.

## Commands

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

Show and highlight the uploaded code(by hash) in the original format.

```
!pre #hash of the uploaded code#
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

### Speech

Speak the words in the specified language.

```
!say hello
```

Stop the speech right away.

```
!shutup
```

### Search

Search on Wikipedia.

```
!wiki Taiwan
```

### SageMath (Experimental)

SageMath cell is kind of heavey and only supported in experimental mode now.
You may enable it by changing the isExperimental() return value to true.

```
!sage Prosets.DivisorLattice(30)
```

check https://sagemath.org for more usages.

<script src="./assets/init.js"></script>

