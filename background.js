var timerDuration;
var bool;
var longTimerDuration;
var abc;
var mute = 1;

var titleShort = Array("Let's take a lil break", "Did someone say stretch?", "Time for a wellness break!", "Your joints called, it's time to stretch", 
"Well,well,well, if it isn't another stretch", "You've worked hard! Rest your eyes!", "Did someone say streettchhhh?", "What's amazing and rhymes with fetch", "Time for a quick break!",
"Like Ross and Rachel, you need a break", "Let's keep that spine feeling fine", "Are you a limo? Because stretch")

var titleLong =  Array("You've earned this break!", "Let's take a few minutes away from the computer", "Let's get that body moving!", "Let's open up a can of movement", "Time for a nice break!",
"You've been working hard! Treat yourself!", "Knock knock, who's there? Stretch.")


function createAlarm(){
    console.log("created");
    chrome.alarms.create('shortAlarm', {
        delayInMinutes: Number(timerDuration), periodInMinutes: Number(timerDuration)});
}

function createLongAlarm(){
    console.log("long alarm created");
    chrome.alarms.create('longAlarm', {
        delayInMinutes: (Number(longTimerDuration) * 60), periodInMinutes: (Number(longTimerDuration) * 60)});
}

function getNow(){
    var shortTitle = titleShort[Math.floor((Math.random() * titleShort.length))];
    var options = {
        title: shortTitle,
        message: 'Click for a short video!',
        iconUrl: '48icon.png',
        type: 'basic'}
    audioNotification();
    chrome.notifications.create('', options);
    
}

function audioNotification(){
    var yourSound = new Audio('bell2.mp3');
    if (mute == 1) {
        yourSound.volume = 1.0;
        yourSound.play();
    }
    if (mute == 2) {
        yourSound.volume = 0.3;
        yourSound.play();
    }
}

function clearAlarm(){
    chrome.alarms.clearAll();
}

chrome.alarms.onAlarm.addListener( function (alarm) {
    if (alarm.name == "shortAlarm") {
    var shortTitle = titleShort[Math.floor((Math.random() * titleShort.length))];
    var options = {
        title: shortTitle,
        message: 'Click for a short video!',
        iconUrl: '48icon.png',
        type: 'basic'}
    bool = 1;
    chrome.notifications.create('', options);
    audioNotification();
    }
    else if (alarm.name == "longAarm"){
    var longTitle = titleLong[Math.floor((Math.random() * titleLong.length))];
    var options1 = {
        title: longTitle,
        message: 'Click for a 10 minute video!',
        iconUrl: '48icon.png',
        type: 'basic'}
    bool = 0;
    chrome.notifications.create('', options1);
    audioNotification();
    }
});



//Checks if the message is for a short or a long message and creates notification
//accordingly 
chrome.runtime.onMessage.addListener(data => {

    if (data.type == 'clearMessage') {
        console.log('clear called');
        clearAlarm();
    }
    if (data.type == 'createMessage'){
        console.log('create called');
        timerDuration = data.timePeriod;
        createAlarm();
    }

    if (data.type == 'createLongMessage'){
        console.log('long create called');
        longTimerDuration = data.timePeriod;
        createLongAlarm();
    }
    if (data.type == 'getNow'){
        getNow();
        bool = 2;
    }
    if (data.type == "muteMessage") {
        mute = 0;
    }
    if (data.type == "unmuteMessage") {
        mute = 1;
    }
    if (data.type == "unmuteLightMessage") {
        mute = 2;
    }
  });


var videos = Array("https://youtu.be/KBaSGF6kYqw?t=21","https://youtu.be/KBaSGF6kYqw?t=46","https://youtu.be/KBaSGF6kYqw?t=80",
"https://youtu.be/KBaSGF6kYqw?t=98","https://youtu.be/KBaSGF6kYqw?t=127", "https://youtu.be/KBaSGF6kYqw?t=150",
"https://youtu.be/w1INfs260DY?t=264","https://youtu.be/w1INfs260DY?t=279","https://youtu.be/w1INfs260DY?t=309", 
"https://youtu.be/w1INfs260DY?t=334", "https://youtu.be/w1INfs260DY?t=360", "https://youtu.be/w1INfs260DY?t=380",
"https://youtu.be/w1INfs260DY?t=417", "https://youtu.be/w1INfs260DY?t=432", "https://youtu.be/w1INfs260DY?t=460",
"https://youtu.be/CAq9vV7gkrs?t=35", "https://youtu.be/CAq9vV7gkrs?t=57","https://youtu.be/CAq9vV7gkrs?t=116",
"https://youtu.be/CAq9vV7gkrs?t=242","https://youtu.be/CAq9vV7gkrs?t=298", "https://youtu.be/CAq9vV7gkrs?t=355",
"https://youtu.be/CAq9vV7gkrs?t=364")

var longVideos = Array("https://youtu.be/3Elmwad8XDI?t=28", "https://www.youtube.com/watch?v=tAUf7aajBWE", "https://www.youtube.com/watch?v=M-8FvC3GD8c", 
"https://www.youtube.com/watch?v=6fnLKyRJsrs",
"https://www.youtube.com/watch?v=4pKly2JojMw","https://youtu.be/NCJeh1pk1no", "https://youtu.be/oar85e9GdLw?t=4", "https://www.youtube.com/watch?v=X3-gKPNyrTA&t=6s",
"https://www.youtube.com/watch?v=XeXz8fIZDCE", "https://www.youtube.com/watch?v=Nnd5Slo02us", "https://youtu.be/EMU5ERi3gg0?t=25", "https://youtu.be/x-68UM13MhA")
  
//When button is clicked, picks a video accordingly.
chrome.notifications.onClicked.addListener(function(notifId) {
      var longItem = longVideos[Math.floor((Math.random() * longVideos.length))];
      var item = videos[Math.floor((Math.random() * videos.length))];
      if (bool == 1){
      chrome.tabs.create({url: item });  //use it here
      }
      if (bool == 0){
        chrome.tabs.create({url: longItem });  //use it here  
      }
      else {
        chrome.tabs.create({url: item });  //use it here
      }
  });