


    


var unsplashURL = 'https://api.unsplash.com/search/photos/?query=baguette&client_id=n9E_S2EHFcnLYsoG5u6jQxiQbaC0NN-KhidZTVGIH8w';


$.ajax({
    url: unsplashURL,
    method: "GET"
    }).then(function(unsplashResponse) {
        console.log(unsplashResponse);
       var baguetteDiv = $('.baguette-div');
       baguetteDiv.empty();
       var baguetteString = unsplashResponse.results[0].urls.full;
       var baguetteImg = $('<img>');
       $(baguetteImg).css({'width':'inherit', 'height':'inherit'});
       $(baguetteImg).attr('src', baguetteString);
       $(baguetteImg).appendTo(baguetteDiv);
    })
