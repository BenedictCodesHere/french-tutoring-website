// This line of code creates a modal, and prevents the modal from being closed by clicking off it.
var myModal = new bootstrap.Modal(document.getElementById('myModal'), { backdrop:"static", keyboard: false });

// Array of search terms for the unSplash API.
const imageSearchTerms = ["french-pastries", "french-desserts", "french-casserole"];

// This will be used in the window event listener immediately below.
let selectedRadioBtn;


// This event listener will show the modal on page load, if the user has not already actively selected a theme on a prior visit.
// The comments within the function should be commented out on deployment, as those comments check whether the user has made an active
// choice for the styling of the page on a prior visit.
window.addEventListener('DOMContentLoaded', function(){
    var themeCheck = this.localStorage.getItem('theme');
    // This condition checks whether there is any value for "theme" currently saved in localStorage. It shows the modal if there is no value saved.
    if(themeCheck == null) {
        myModal.show();

        // This section changes the value of the theme based on which button is clicked.
        $('[name=styling]').on('click', function(event){
            console.log(event.target.value);
            selectedRadioBtn = event.target.value;
            console.log(`selectedRadioBtn: ${selectedRadioBtn}`)
            theme = localStorage.getItem('theme');
        })
        
        // Close button. Takes the default of "French for Fun" choice selection. Choice not persist in localStorage, as user did not actively
        // choose their theme.
        $('#close-modal').on('click', function(event){
         selectedRadioBtn = 3;
         console.log(`selectedRadioBtn: ${selectedRadioBtn}`);
         youtubeApiCall(selectedRadioBtn);
         GetImage(selectedRadioBtn);
         checkTheme(selectedRadioBtn);
         theme = localStorage.getItem('theme');
        });
        

        // This event listener results in the chosen theme being saved and stored, and the modal being hidden.
        $('#save-modal').on('click', function(){
        console.log(`selectedRadioBtn: ${selectedRadioBtn}`);
        if(selectedRadioBtn != undefined) {
            console.log(`selectedRadioBtn: ${selectedRadioBtn}`);
            localStorage.setItem('theme', selectedRadioBtn);
            myModal.hide()
            // this runs the function to grab the relevant Youtube video dependent on the user's selection of French for Business, French For Kids,
            // or French for Fun.
            youtubeApiCall(selectedRadioBtn);
            // This runs the unSplash API call to grab the relevant image based on theme selection.
            GetImage(selectedRadioBtn);
            // This function makes sure that the theme-switching navbar has the correct anchor element being styled with the class of "active".
            checkTheme(selectedRadioBtn);
            // THis line simply updates the global "theme" variable. 
            theme = localStorage.getItem('theme');
        }
        });


    }
    
   });

 var theme = localStorage.getItem('theme');
   console.log(`theme: ${theme}`);
   GetImage(theme);

   function checkTheme(themeStored){
    let currentlyActiveBtnNumber = $('.active').attr('data-number');
    // Apply the class of active to the button which has the data-number equal to the 
    // value stored in the theme variable
    if(currentlyActiveBtnNumber != themeStored){
        $('.active').removeClass('active');
    }
    var setActiveBtn = $('.nav-pills').find(`[data-number=${themeStored}]`);
    console.log(setActiveBtn);
    $(setActiveBtn).addClass('active');
}

checkTheme(theme);



    






// FUNCTION to get an image from the unsplash API based on the relevant search term, which is selected due to the user's theme choice.
function GetImage(num){
var unsplashURL = `https://api.unsplash.com/search/photos/?query=${imageSearchTerms[num - 1]}&page=1&orientation=landscape&client_id=n9E_S2EHFcnLYsoG5u6jQxiQbaC0NN-KhidZTVGIH8w`;
$.ajax({
    url: unsplashURL,
    method: "GET"
    }).then(function(unsplashResponse) {
        console.log(unsplashResponse);
       var baguetteDiv = $('.baguette-div');
       baguetteDiv.empty();
       var baguetteString = unsplashResponse.results[0].urls.full;
       var baguetteImg = $('<img>');
       baguetteImg.attr('alt', unsplashResponse.results[0].alt_description);
       $(baguetteImg).css({'width':'inherit', 'height':'inherit'});
       $(baguetteImg).attr('src', baguetteString);
       $(baguetteImg).appendTo(baguetteDiv);
    });
};






// YOUTUBE API
const apiKeyYoutube = 'AIzaSyDiJ4L5kg5fHA5kii65hc4766UiYe0u-Us';
const playlistId1 = 'PLGk8cogrddcmMIL5KQYmyS69zJGRdFVyD';
const playlistId2 = 'PLGk8cogrddclUSzkpSgcdzeP7Ir-40lQa';
const playlistId3 = 'PLGk8cogrddckuqithmkd8W79F2U9AZhtn';
const playlistArray = [playlistId1, playlistId2, playlistId3];
let videoArray = [];
const maxResults = 2;



console.log(`Theme: ${theme}`);

function randomWholeNum(arrayLength) {

    // Only change code below this line
  let randomNum = Math.floor(Math.random() * arrayLength);
    return randomNum;
  }


function youtubeApiCall(themeIndex){
let chosenPlaylist = playlistArray[themeIndex - 1];
const urlYoutube = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${chosenPlaylist}&key=${apiKeyYoutube}`;

$.ajax({
    url: urlYoutube,
    method: "GET"
    }).then(function(youtubeResponse) {
        console.log(youtubeResponse);
        videoArray = [];
        for ( let i = 0; i < maxResults; i++) {
            // var currentEtag = youtubeResponse.items[i].etag;
            // if (currentEtag == localStorage.getItem())
            var currentVideo = youtubeResponse.items[i].contentDetails.videoId;
            videoArray.push(currentVideo);
            console.log(videoArray);
            
            // stickTheOtherVideoIn();
           
        }
        let randomIndex = randomWholeNum(videoArray.length);
        stickTheVideoIn(videoArray[randomIndex]);
    })
}


    console.log(videoArray);


// This is the function which we need to call based on the theme number.
    youtubeApiCall(theme);


    

    



function stickTheVideoIn(value) {
let firstVideo = value;
console.log(firstVideo);
var youtubeSource = `https://www.youtube.com/embed/${firstVideo}`;
const htmlForIt = `<iframe id="real-player"  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; gyroscope; web-share" allowfullscreen></iframe>`

let youtubeContainer = document.querySelector('#youtube-container');

console.log(youtubeContainer);
$(youtubeContainer).html(htmlForIt);
console.log(youtubeSource);
console.log('-----------------------------------------------------------------------------')

const realPlayer = $('#real-player');
console.log(realPlayer);
realPlayer.attr('src', youtubeSource);
console.log(youtubeContainer);
};




let themeNotSaved = 0;



function themeChanger(event){
console.log(event.target)
if($(event.target).hasClass('active')) {
    return;
} else {
    themeNotSaved = Number($(event.target).attr('data-number'));
    console.log(themeNotSaved);
    youtubeApiCall(themeNotSaved);
    GetImage(themeNotSaved);
    localStorage.setItem('theme', themeNotSaved);
}
}

// PILL BUTTONS
$('#theme-btn-one').on('click', themeChanger)
$('#theme-btn-two').on('click', themeChanger)
$('#theme-btn-three').on('click', themeChanger)








