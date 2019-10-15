# chrome-brightcove-forward-backward-extension
A chrome extension for any website which uses brightcove video library player. It provides forward and backward seeking of video. Its a simple dom listener for key events and uses brightcove's library(currentTime and duration methods on videojs.getPlayers() object) to forward or backward seek a video being played. Chrome extensions content script is used for injecting script into desired website.


One might need to change the player name set in brightcove. Here it is abcPlayer, replace it with your player name if required.

# Advantages

1. There are no memory leakages in this code. 
2. Thorough validation is provided to safeguard from exceptional cases. 
3. Checked for browser compatibility. References can be found in video-forward-backward-seek.js file.

# Drawback

1. Listener is added on document, and its always active.
  a. So for every keystore this handler gets invoked eventhough video might not be there in that page. Though I tried to make this handler for angularjs app to get added based on event like(page navigation only when in single page application), but was not able to achieve it. 
  Reason was I got $rootScope from angularjs injector and added listeners. After debugging found listeners were added. But when came out of injector $rootScope did not contained those listeners. root-scope-listener-add.js this code was at top in video-forward-backward-seek.js


# TODO

1. Add touch event listeners for mobile and touch screen devices. 

2. Add icon when forward or backward seek is done.
