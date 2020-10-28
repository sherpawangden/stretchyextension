var enabled = 0;

function setMinutes(){
    timerDuration = document.getElementById('stretchMinutes').value;
    console.log("the value is :",timerDuration);
}


function checkAlarms(){
    var storedTime;
    chrome.storage.local.get(['time'],function(result) {
        storedTime = result.time
    });
    chrome.storage.local.get(['saved'],function(result) {
        if (result.saved == 'yes'){
            document.getElementById('stretchMinutes').value = Number(storedTime);
            document.getElementById('enable').click();        
        }
    });
}

checkAlarms();

function createAlarm() {
    setMinutes()
    chrome.runtime.sendMessage('', {
        type: 'createMessage',
        timePeriod: timerDuration
      });
    chrome.storage.local.set({'time':Number(timerDuration)}, function(){});
    chrome.storage.local.set({'saved': 'yes'}, function(){});
}

function clearAlarm() {
    chrome.runtime.sendMessage('', {
        type: 'clearMessage',
      });
    chrome.storage.local.set({'saved': 'no'}, function(){});
}

document.getElementById('enable').addEventListener('click', () => {
    if (enabled == 1) {
        clearAlarm();
        chrome.storage.local.set({'enabled': 0}, function(){});
        enabled = 0;
        document.getElementById('EnabledText').innerHTML = '&nbsp; Disabled';
        document.getElementById('EnabledText').style.color = " #7a7979";

    }
    else {
        enabled = 1;
        chrome.storage.local.set({'enabled': 1}, function(){});
        document.getElementById('EnabledText').innerHTML = '&nbsp; Enabled';
        document.getElementById('EnabledText').style.color = "#73d38b";
        setMinutes();
    }
})



document.getElementById("setStretchDuration").addEventListener('click', () => {
    if (enabled == 0) {
    document.getElementById('enable').click();
    chrome.storage.local.set({'enabled': 1}, function(){});
    enabled = 1;        
    document.getElementById('EnabledText').innerHTML = '&nbsp; Enabled';
    document.getElementById('EnabledText').style.color = "#73d38b";
    };
    createAlarm() });

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

