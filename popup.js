var enabled = 0;
var timerDuration;
var longTimerDuration;

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
            turnButtonOff();
        }
    });

    chrome.storage.local.get(['longTimeSaved'],function(result) {
        if (result.longTimeSaved == 'yes'){
            document.getElementById('longMinutes').value = Number(storedLongTime);  
        }
    });

    chrome.storage.local.get(['muteSaved'],function(result) {
        if (result.muteSaved == 'yes'){
            document.getElementById("unmuted").style.display = "none";
            document.getElementById("unmutelight").style.display = "none";
            document.getElementById("muted").style.display = "inline-block";
        }
        if (result.muteSaved == 'light') {
            document.getElementById("muted").style.display = "none";
            document.getElementById("unmuted").style.display = "none";
            document.getElementById("unmutelight").style.display = "inline-block";
        }
        if (result.muteSaved == 'no') {
            document.getElementById("muted").style.display = "none";
            document.getElementById("unmuted").style.display = "inline-block";
            document.getElementById("unmutelight").style.display = "none";
        }
    });
    
}

function turnButtonOff () {
    document.getElementById("setLongDuration").style.display = "none";
    document.getElementById("stopStretches").style.display = "inline-block";

}

function turnButtonOn () {
    document.getElementById("stopStretches").style.display = "none";
    document.getElementById("setLongDuration").style.display = "inline-block";
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

function unMuteLight() {
    chrome.runtime.sendMessage('', {
        type: 'unmuteLightMessage',
    });
    chrome.storage.local.set({'muteSaved': 'light'}, function(){});
}

function unMute(){
    chrome.runtime.sendMessage('', {
        type: 'unmuteMessage',
    });
    chrome.storage.local.set({'muteSaved': 'no'}, function(){});
}

function Mute(){
    chrome.runtime.sendMessage('', {
        type: 'muteMessage',
    });
    chrome.storage.local.set({'muteSaved': 'yes'}, function(){});
}

document.getElementById("unmuted").addEventListener('click', () => {
    document.getElementById("unmuted").style.display = "none";
    document.getElementById("unmutelight").style.display = "none";
    document.getElementById("muted").style.display = "inline-block";
    Mute();

});

document.getElementById("unmutelight").addEventListener('click', () => {
    document.getElementById("unmutelight").style.display = "none";
    document.getElementById("muted").style.display = "none";
    document.getElementById("unmuted").style.display = "inline-block";
    unMute();
    

});

document.getElementById("muted").addEventListener('click', () => {
    document.getElementById("muted").style.display = "none";
    document.getElementById("unmutelight").style.display = "inline-block";
    document.getElementById("unmuted").style.display = "none";
    unMuteLight();
});


document.getElementById("setLongDuration").addEventListener('click', () => {
    enabled = 1;    
    document.getElementById('selectConfirm').style.opacity = "1";
    turnButtonOff() ;
    createAlarms() ;}  
    );  

document.getElementById("stopStretches").addEventListener('click', () => {
    clearAlarm();
    turnButtonOn();
    document.getElementById('selectConfirm').style.opacity = "0";
});


document.getElementById("getStretch").addEventListener('click', () => {      
    getNow() });

