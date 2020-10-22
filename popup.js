document.getElementById("setStretchDuration").addEventListener('click', () => {
    chrome.runtime.sendMessage('', {
        type: 'notification',
        options: {
          title: 'Just wanted to notify you',
          message: 'https://www.youtube.com/watch?v=N9SMOYkfc1c&t=544s great it is!',
          iconUrl: 'icon3.png',
          type: 'basic'
        }
      });
});