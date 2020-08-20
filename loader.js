function loadScript(src, type = "") {
  /* Insert the final install script to the head */
  var s = document.createElement('script');
  if (type != "")
    s.type = type;
  s.src = chrome.runtime.getURL(src);
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}

loadScript("latex4twitch.js");
