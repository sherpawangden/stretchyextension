document.getElementById("setStretchDuration").addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
        type: 'notification',
        options: {
          title: 'Just wanted to notify you',
          message: 'great it is!',
          iconUrl: 'icon3.png',
          type: 'basic'
        },
        var: 'shorty'
      });
});

document.getElementById("setLongDuration").addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
        type: 'notification',
        options: {
          title: 'Just Long time  to notify you',
          message: 'great it is!',
          iconUrl: 'icon3.png',
          type: 'basic'
        },
        var: 'longy'
      });
});

var link

