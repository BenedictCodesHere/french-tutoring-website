





// TO DO:
// 1. Create pure functions which deal with the addition and removal of classes throughout the page.

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






