var timerDuration;
var bool;
var longTimerDuration;
var abc;

var titleShort = Array("Let's take a lil break", "Did someone say stretch?", "Time for a wellness break!", "Your joints called, it's time to stretch", 
"Well, well, well, if it isn't another stretch")

var titleLong =  Array("You've earned this break!", "Let's take a few minutes away from the computer", "Let's get that body moving!", "Let's open up a can of movement" )


function createAlarm(){
    console.log("Thi sis called");
    chrome.alarms.create('shortAlarm', {
        delayInMinutes: Number(timerDuration), periodInMinutes: Number(timerDuration)});
}

function createLongAlarm(){
    console.log("this is also called");
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
    chrome.notifications.create('', options);
}

function clearAlarm(){
    chrome.alarms.clearAll();
}

chrome.alarms.onAlarm.addListener(onAlarm);

function onAlarm(shortAlarm) {
    console.log("alarm called");
    var shortTitle = titleShort[Math.floor((Math.random() * titleShort.length))];
    var options = {
        title: shortTitle,
        message: 'Click for a short video!',
        iconUrl: '48icon.png',
        type: 'basic'}
    bool = 1;
    chrome.notifications.create('', options);
}

chrome.alarms.onAlarm.addListener(onAlarmLong);

function onAlarmLong(longAlarm) {
    console.log("long alarm called");
    var longTitle = titleLong[Math.floor((Math.random() * titleLong.length))];
    var options1 = {
        title: longTitle,
        message: 'Click for a 10 minute video!',
        iconUrl: '48icon.png',
        type: 'basic'}
    bool = 0;
    chrome.notifications.create('', options1);
}



//Checks if the message is for a short or a long message and creates notification
//accordingly 
abc = 1;
chrome.runtime.onMessage.addListener(data => {

    if (data.type == 'clearMessage') {
        clearAlarm();
    }
    if (data.type == 'createMessage'){
        abc += 1;
        console.log(abc);
        timerDuration = data.timePeriod;
        createAlarm();
    }

    if (data.type == 'createLongMessage'){
        longTimerDuration = data.timePeriod;
        createLongAlarm();
    }
    if (data.type == 'getNow'){
        getNow();
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

var longVideos = Array("https://youtu.be/w1INfs260DY?t=470", "https://www.youtube.com/watch?v=tAUf7aajBWE", "https://www.youtube.com/watch?v=M-8FvC3GD8c", 
"https://www.youtube.com/watch?v=6fnLKyRJsrs", "https://www.youtube.com/watch?v=HV_eJ82KE0Q", "https://www.youtube.com/watch?v=w3C08dhJ_SM", "https://www.youtube.com/watch?v=EHMRMibVO2I",
"https://www.youtube.com/watch?v=4pKly2JojMw", "https://www.youtube.com/watch?v=VaoV1PrYft4")
  
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
  });