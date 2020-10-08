function loadScript(src) {
  /* Insert the final install script to the head */
  var s = document.createElement('script');
  s.type = "module";
  s.src = chrome.runtime.getURL(src);
	/*
  s.onload = function () {
    this.remove();
  }; */
  (document.head || document.documentElement).appendChild(s);
}

function loadCSS(src) {
	const link = document.createElement('link');
	if (window.browser)
  	link.href = browser.runtime.getURL(src);
	else
  	link.href = chrome.runtime.getURL(src);
	link.type = 'text/css';
	link.rel = 'stylesheet';
	(document.head || document.documentElement).appendChild(link);
}

loadCSS("latex4twitch.css");
loadScript("latex4twitch.js");
