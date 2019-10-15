var s = document.createElement("script"); 
s.src = chrome.extension.getURL("video-forward-backward-seek.js");
//console.log("document.getElementsByTagName('head')[0]", document.getElementsByTagName("head")[0]);
//console.log("s.src",s.src);
document.getElementsByTagName("head")[0].appendChild(s);

