var enabled = 0;
var titleShort = Array("Let's take a lil break", "Did someone say stretch?", "Time for a wellness break!", "Your joints called, it's time to stretch", 
"Well, well, well, if it isn't another stretch")

var titleLong =  Array("You've earned this break!", "Let's take a few minutes away from the computer", "Let's get that body moving!", "Let's open up a can of movement" )
var timerDuration

function setMinutes(){
    timerDuration = document.getElementById('stretchMinutes').value;
    console.log("the value is :",timerDuration);
}

function createAlarm() {
    setMinutes()
    chrome.alarms.create('shortAlarm', {
    delayInMinutes: Number(timerDuration), periodInMinutes: Number(timerDuration)});
}

function clearAlarm() {
    chrome.alarms.clear('shortAlarm');
}

document.getElementById('enable').addEventListener('click', () => {
    if (enabled == 1) {
        clearAlarm();
        enabled = 0;
    }
    else {
        enabled = 1;
        setMinutes();
        createAlarm();
    }
})

chrome.alarms.onAlarm.addListener(onAlarm);

function onAlarm(shortAlarm) {
    sendNotifactionShort();
}

document.getElementById("setStretchDuration").addEventListener('click', () => {
    setMinutes();
    if (enabled == 0) {
    document.getElementById('enable').click();
    enabled = 1;
    };
    createAlarm() });

function sendNotifactionShort() {
    console.log('Send notification called.');

    var shortTitle = titleShort[Math.floor((Math.random() * titleShort.length))];
    chrome.runtime.sendMessage('', {
        type: 'notification',
        options: {
          title: shortTitle,
          message: 'Click for a short video!',
          iconUrl: 'icon3.png',
          type: 'basic'
        },
        var: 'shorty'
      });
}

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

