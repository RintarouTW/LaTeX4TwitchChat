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

loadScript("latex4twitch.js");
