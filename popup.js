document.getElementById("setStretchDuration").addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
        type: 'notification',
        options: {
          title: 'Time for a wellness break!',
          message: 'Click for a short video!',
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
          title: "You've earned this break",
          message: 'Click for a 10 minute video.',
          iconUrl: 'icon3.png',
          type: 'basic'
        },
        var: 'longy'
      });
});

document.getElementById("getStretch").addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
        type: 'notification',
        options: {
          title: "Let's stretch!",
          message: 'Click for a short video!',
          iconUrl: 'icon3.png',
          type: 'basic'
        },
        var: 'shorty'
      });
});

var link

