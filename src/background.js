'use strict';

function muteTabOnMatch(tabId, changeInfo, tab) {
  if(changeInfo.title){
    console.log(changeInfo.title);
    chrome.tabs.query({url: "*://open.spotify.com/*"}, function(tabs) {
      if(changeInfo.title.includes("Spotify") || changeInfo.title.includes("Advertisement")){
        // console.log("Mute tab...");
        chrome.tabs.update(tabs[0].id, {"muted": true});
      } else {
        // console.log("Unmute tab...");
        chrome.tabs.update(tabs[0].id, {"muted": false});
      }
    });
  }
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action === 'STARTLISTENER') {
      // console.log("Received to start.");
      chrome.tabs.onUpdated.addListener(muteTabOnMatch);
    } else if (request.action === 'STOPLISTENER'){
      // console.log("Received to stop.");
      chrome.tabs.query({url: "*://open.spotify.com/*"}, function(tabs) {
        for(var tab of tabs){
          chrome.tabs.update(tab.id, {"muted": false});
        }
      });
      chrome.tabs.onUpdated.removeListener(muteTabOnMatch);
    }
  }
)