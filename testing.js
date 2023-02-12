

// const apiKeyYoutube = 'AIzaSyDiJ4L5kg5fHA5kii65hc4766UiYe0u-Us'
// const channelIDYoutube = 'UCzHgrasytJoOOJi6Hpx23gQ';
// const videoArray = [];
// const maxResults = 3; 
// const urlYoutube = `https://www.googleapis.com/youtube/v3/search/?part=snippet&key=${apiKeyYoutube}&channelId=${channelIDYoutube}&type=video&maxResults=${maxResults}&order=viewcount`;







// console.log(urlYoutube);

// The eTag of the video shows whether the video has been modified or not. Each time a video is modified, it is assigned a 
// new eTag.

// we want to cache the video using the etag, saving the etag to localStorage. This reduces the quota usage
// Youtube Data API has a daily quota limit of 10,000 quota units. In order to optimise the API calls,
// so that we are not running up our quota limit unnecessarily, we can cache the eTag of our videos in localStorage,
// then compare the eTag that is newly retrieved with our fresh API call, and only retrieve the video if the eTag has been 
// updated. Otherwise, we can simply retrieve the video that has been cached.



// QUESTION: Why not simply hard-code it, and target the youtube videos by their video ID in the first place, rather than going 
// through an API call?

// ANSWER: The only reason that we opt for going through an API is so that we can search and filter by certain constraints. 
// So, we would want to perhaps grab the MOST VIEWED videos of our client's channel, or the MOST VIEWED videos of a particular PLAYLIST
// on our client's channel. 

// Because these are dynamic values, and subject to change over time, we would want to use an API call rather than hard-coding 3 fixed video IDs and selecting
// from those videos.

$.ajax({
    url: urlYoutube,
    method: "GET"
    }).then(function(youtubeResponse) {
        console.log(youtubeResponse);
        for ( let i = 0; i < maxResults; i++ ) {
            // var currentEtag = youtubeResponse.items[i].etag;
            // if (currentEtag == localStorage.getItem())
            var currentVideo = youtubeResponse.items[i].id.videoId;
            videoArray.push(currentVideo);
            console.log(videoArray);

            stickTheVideoIn(videoArray[0]);
            // stickTheOtherVideoIn();
           
        }
       
    })


    console.log(videoArray);


stickTheVideoIn();


function stickTheVideoIn(value) {
  let firstVideo = value; // this needs to be replaced by the API call
  console.log(firstVideo);
  var youtubeSource = `https://www.youtube.com/embed/${firstVideo}`;
  const htmlForIt = `<iframe id="real-player" width="800" height="500" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; gyroscope; web-share" allowfullscreen></iframe>`

  let youtubeContainer = document.querySelector('#youtube-container');

  console.log(youtubeContainer);
  $(youtubeContainer).html(htmlForIt);
  console.log(youtubeSource);
  console.log('-----------------------------------------------------------------------------')
  
  const realPlayer = $('#real-player');
  console.log(realPlayer);
  realPlayer.attr('src', youtubeSource);
  
  // realPlayer.appendTo(youtubeContainer);
  
  console.log(youtubeContainer);
  
};





// function stickTheOtherVideoIn(){

//   let thisVideo = videoArray[0];
// var tag = document.createElement('script');

//       tag.src = "https://www.youtube.com/iframe_api";
//       var firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// //       // 3. This function creates an <iframe> (and YouTube player)
// //       //    after the API code downloads.


//   var player;
//   function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//       height: '390',
//       width: '640',
//       videoId: thisVideo,
//       playerVars: {
//         'playsinline': 1
//       },
//       events: {
//         'onReady': onPlayerReady,
//         'onStateChange': onPlayerStateChange
//       }
//     });
//   }

// //       // 4. The API will call this function when the video player is ready.
//   function onPlayerReady(event) {
//     event.target.playVideo();
//   }

// //       // 5. The API calls this function when the player's state changes.
// //       //    The function indicates that when playing a video (state=1),
// //       //    the player should play for six seconds and then stop.
//   var done = false;
//   function onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.PLAYING && !done) {
//       setTimeout(stopVideo, 6000);
//       done = true;
//     }
//   }
//   function stopVideo() {
//     player.stopVideo();
//   }


// }

     







// YELP RAPIDAPI REVIEWS (NOT REALLY WORKING)

    //   const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://yelp-com.p.rapidapi.com/search/nearby/37.788719679657554/-122.40057774847898?radius=5&term=Restaurants&offset=0",
    //     "method": "GET",
    //     "headers": {
    //         "X-RapidAPI-Key": "d3f7972343mshcca1c420b88d898p1a74a5jsn5f6870b55fe4",
    //         "X-RapidAPI-Host": "yelp-com.p.rapidapi.com"
    //     }
    // };
    
    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });






