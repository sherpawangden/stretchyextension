var bool = 0;

chrome.runtime.onMessage.addListener(data => {
    bool = 0;
    if (data.var == "shorty"){
        bool = 1;
    }
    if (data.type === 'notification') {
    chrome.notifications.create('', data.options);
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
