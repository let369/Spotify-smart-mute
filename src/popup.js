'use strict';
var button = document.getElementById('extSwitch');
chrome.storage.sync.get('checked', function(data) {
  button.checked = data.checked;
});

document.addEventListener('DOMContentLoaded', function() {
  button.addEventListener('click', function(event) {
    if(event.target.checked) {
      chrome.runtime.sendMessage({action: 'STARTLISTENER'});
    } else {
      chrome.runtime.sendMessage({action: 'STOPLISTENER'});
    }
    chrome.storage.sync.set({checked: event.target.checked})
    // window.close(); // Closes the popup
  });
});
