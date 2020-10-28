var enabled = 0;
var timerDuration;
var longTimerDuration;

function setMinutes(){
    timerDuration = document.getElementById('stretchMinutes').value;
    longTimerDuration = document.getElementById('longMinutes').value;
    console.log("the value is :",timerDuration);
}


function checkAlarms(){
    var storedTime;
    var storedLongTime;
    chrome.storage.local.get(['time'],function(result) {
        storedTime = result.time
    });
    chrome.storage.local.get(['longTime'],function(result) {
        storedLongTime = result.longTime
    });

    chrome.storage.local.get(['saved'],function(result) {
        if (result.saved == 'yes'){
            document.getElementById('stretchMinutes').value = Number(storedTime);
            document.getElementById('enable').click();        
        }
    });
    chrome.storage.local.get(['longTimeSaved'],function(result) {
        if (result.longTimeSaved == 'yes'){
            document.getElementById('longMinutes').value = Number(storedLongTime);
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

function getNow() {
    chrome.runtime.sendMessage('', {
        type: 'getNow',
      });
}

function createLongAlarm() {
    setMinutes()
    chrome.runtime.sendMessage('', {
        type: 'createLongMessage',
        timePeriod: longTimerDuration
      });
    chrome.storage.local.set({'longTime':Number(longTimerDuration)}, function(){});
    chrome.storage.local.set({'longTimeSaved': 'yes'}, function(){});
}

function clearAlarm() {
    chrome.runtime.sendMessage('', {
        type: 'clearMessage',
      });
    chrome.storage.local.set({'saved': 'no'}, function(){});
    chrome.storage.local.set({'longTimeSaved': 'no'}, function(){});
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
        createAlarm()
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
    if (enabled == 0) {
    document.getElementById('enable').click();
    chrome.storage.local.set({'enabled': 1}, function(){});
    enabled = 1;        
    document.getElementById('EnabledText').innerHTML = '&nbsp; Enabled';
    document.getElementById('EnabledText').style.color = "#73d38b";
    };
    createLongAlarm() });

document.getElementById("getStretch").addEventListener('click', () => {      
    getNow() });

