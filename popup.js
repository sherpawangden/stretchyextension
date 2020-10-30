var enabled = 0;
var timerDuration;
var longTimerDuration;
var fromSet = 0;

function setMinutes(){
    timerDuration = document.getElementById('stretchMinutes').value;
    longTimerDuration = document.getElementById('longMinutes').value;
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
            document.getElementById('selectConfirm').style.opacity = "1";  
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

function createAlarms() {
    setMinutes()
    if (timerDuration != 0){
        console.log("alarm set");
        chrome.runtime.sendMessage('', {
        type: 'createMessage',
        timePeriod: timerDuration
      });
    }
    if (longTimerDuration != 0) {
        console.log("Long alarm set");
        chrome.runtime.sendMessage('', {
        type: 'createLongMessage',
        timePeriod: longTimerDuration
      });}

    chrome.storage.local.set({'longTime':Number(longTimerDuration)}, function(){});
    chrome.storage.local.set({'longTimeSaved': 'yes'}, function(){});
    chrome.storage.local.set({'time':Number(timerDuration)}, function(){});
    chrome.storage.local.set({'saved': 'yes'}, function(){});
}

function getNow() {
    chrome.runtime.sendMessage('', {
        type: 'getNow',
      });
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
        document.getElementById('selectConfirm').style.opacity = "0";

    }
    else {
        enabled = 1;
        if (fromSet == 0){
        chrome.storage.local.set({'enabled': 1}, function(){});
        document.getElementById('EnabledText').innerHTML = '&nbsp; Enabled';
        document.getElementById('EnabledText').style.color = "#73d38b";
        setMinutes();
        createAlarms()
        }
        fromSet = 0;
    }
})


document.getElementById("setLongDuration").addEventListener('click', () => {
    if (enabled == 0) {
    fromSet = 1;
    document.getElementById('enable').click();
    chrome.storage.local.set({'enabled': 1}, function(){});
    enabled = 1;        
    document.getElementById('EnabledText').innerHTML = '&nbsp; Enabled';
    document.getElementById('EnabledText').style.color = "#73d38b";
    };
    document.getElementById('selectConfirm').style.opacity = "1";
    clearAlarm;
    createAlarms() ;});


document.getElementById("getStretch").addEventListener('click', () => {      
    getNow() });

