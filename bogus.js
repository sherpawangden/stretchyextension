// "matches": ["https://www.facebook.com/*", "https://twitter.com/*", "https://www.instagram.com/*", "https://www.youtube.com/*",
//              "https://www.reddit.com/*"],

background:

chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'notification') {
      chrome.notifications.create('', data.options);
    }
  });


  chrome.browserAction.onClicked.addListener(function (tab) {
    /* Send a message to the active tab's content script */
    chrome.runtime.sendMessage('', {
            type: 'notification',
            options: {
              title: 'Just wanted to notify you',
              message: 'How great it is!',
              iconUrl: '/icon.png',
              type: 'basic'
            }
          });
    console.log('Sent message')
});


Thanks to:

https://medium.com/@moshfeu/notifications-in-chrome-extension-50aac17b3b7d

https://github.com/RichardJCai/Pomodoro-Timer-Chrome-Extension




// alert('Go do something else bro')