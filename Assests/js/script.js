var myModal = new bootstrap.Modal(document.getElementById('myModal'), { backdrop:"static", keyboard: false });

const imageSearchTerms = ["french-pastries", "french-desserts", "french-casserole"];

let selectedRadioBtn;


// This event listener will show the modal on page load, if the user has not already actively selected a theme on a prior visit.
// The comments within the function should be commented out on deployment, as those comments check whether the user has made an active
// choice for the styling of the page on a prior visit.
window.addEventListener('DOMContentLoaded', function(){
    var themeCheck = this.localStorage.getItem('theme');
    if(themeCheck == null) {
        myModal.show();
    }
    
    
   })

 var theme = localStorage.getItem('theme');
   console.log(`theme: ${theme}`);
   GetImage(theme);


   $('[name=styling]').on('click', function(event){
        console.log(event.target.value);
        selectedRadioBtn = event.target.value;
        console.log(`selectedRadioBtn: ${selectedRadioBtn}`)
})

// Close button. Takes the default of "French for Fun" choice selection. Choice not persist in localStorage, as user did not actively
// choose their theme.
$('#close-modal').on('click', function(event){
     selectedRadioBtn = 3;
     console.log(`selectedRadioBtn: ${selectedRadioBtn}`);
     GetImage(selectedRadioBtn);
})

$('#save-modal').on('click', function(){
    console.log(`selectedRadioBtn: ${selectedRadioBtn}`);
    if(selectedRadioBtn != undefined) {
        console.log(`selectedRadioBtn: ${selectedRadioBtn}`);
        localStorage.setItem('theme', selectedRadioBtn);
        myModal.hide()
        // this runs the function
        GetImage(selectedRadioBtn);
    }
})




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
       var baguetteDescription = $('.baguette-description');
       baguetteDescription.text(unsplashResponse.results[0].alt_description);
       var baguetteString = unsplashResponse.results[0].urls.full;
       var baguetteImg = $('<img>');
       $(baguetteImg).css({'width':'inherit', 'height':'inherit'});
       $(baguetteImg).attr('src', baguetteString);
       $(baguetteImg).appendTo(baguetteDiv);
    });
};



// PILL BUTTONS
    // Select the active pill button from the theme variable.
    // remove the class
    // Need the theme to change based on the choice by the user of the pill button.


