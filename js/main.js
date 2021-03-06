var settings = {
    "async": true,
    "crossDomain": true,
    "url": "",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "x-rapidapi-key": "215c8aeae6mshffbed9c9dc6d42cp1e3815jsn4b3d0fc77413"
    }};

var searchResults
var hotels = [];
var hotelNames = [];
var hotelRatings = [];
var hotelPrices = [];
var streetAddress = [];
var hotelNameforSearch = "";

$(".button").on("click", function() {
    hotelNames.splice(0, hotelNames.length)
    hotelRatings.splice(0, hotelRatings.length)
    hotelPrices.splice(0, hotelPrices.length)
    streetAddress.splice(0, streetAddress.length)

    var searchTerm = $(".input").val()
    if (searchTerm === "") {
        return
    }

    $("#recommendationOne").removeClass("is-hidden")
    $("#recommendationTwo").removeClass("is-hidden")
    $("#recommendationThree").removeClass("is-hidden")
    $("#recommendationFour").removeClass("is-hidden")
    $("#recommendationFive").removeClass("is-hidden")

    settings.url = "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" + searchTerm
    $.ajax(settings).then(function (response) {
        var desID = response.suggestions[0].entities[0].destinationId
        settings.url = "https://hotels4.p.rapidapi.com/properties/list?currency=USD&locale=en_US&sortOrder=PRICE&destinationId=" + desID + "&pageNumber=1&pageSize=5"
        $.ajax(settings).then(function (secondResponse) {
            searchResults = secondResponse.data.body.searchResults
            getHotelInfo();
            var hotels = searchResults.results
            var cardHeaders = $(".card-header-title")
            for (var i = 0; i < hotelNames.length; i++) {
                cardHeaders.eq(i).text(hotelNames[i])
            }
            var priceDiv = $(".hotelPrice")
            for (var i = 0; i < hotelPrices.length; i++) {
                priceDiv.eq(i).text("Price: " + hotelPrices[i])
            }
            var ratingDiv = $(".hotelRating")
            for (var i = 0; i < hotelRatings.length; i++) {
                ratingDiv.eq(i).text("Rating: " + hotelRatings[i] + "/10")
            }
            var addressDiv = $(".street")
            for (var i = 0; i < streetAddress.length; i++) {
                addressDiv.eq(i).text("Address: " + streetAddress[i])
            }

            var firstHotelLat = searchResults.results[0].coordinate.lat
            var firstHotelLon = searchResults.results[0].coordinate.lon

            var secondHotelLat = searchResults.results[1].coordinate.lat
            var secondHotelLon = searchResults.results[1].coordinate.lon

            var thirdHotelLat = searchResults.results[2].coordinate.lat
            var thirdHotelLon = searchResults.results[2].coordinate.lon

            var fourthHotelLat = searchResults.results[3].coordinate.lat
            var fourthHotelLon = searchResults.results[3].coordinate.lon

            var fifthHotelLat = searchResults.results[4].coordinate.lat
            var fifthHotelLon = searchResults.results[4].coordinate.lon

            firstMap(firstHotelLat, firstHotelLon);
            secondMap(secondHotelLat, secondHotelLon);
            thirdMap(thirdHotelLat, thirdHotelLon);
            fourthMap(fourthHotelLat, fourthHotelLon);
            fifthMap(fifthHotelLat, fifthHotelLon);
        });
    });
});

$("footer").on("click", ".hotelResults", function(){
    hotelNameforSearch = this.parentNode.parentNode.children[0].innerText
    // Setting our Google Search parameter to read the name of hotelResult title for
    // the hotel chosen. Executing search with the new parameter.
    var newSearch = google.search.cse.element.getElement("results")
    newSearch.execute(hotelNameforSearch)
    // Changing the modal view style
    $(".modal").attr("class", "modal is-active");
    $(".modal-content").css("margin", "10em auto");
    $(".modal-content").css("max-height", "60%");
    $(".gsc-control-wrapper-cse").css("padding", "3em");
    $(".gsc-control-wrapper-cse").css("padding-top", "0em");
    $("#__gcse_0").css("height", "0px");
})

$(".modal-close").on("click", function(){
    $(".modal").attr("class", "modal")
})

function getHotelInfo(){
    for (var i = 0; i < 5; i++){
        hotelNames.push(searchResults.results[i].name);
        hotelRatings.push(searchResults.results[i].guestReviews.rating);
        hotelPrices.push(searchResults.results[i].ratePlan.price.current);
        streetAddress.push(searchResults.results[i].address.streetAddress);
}};


// Function for creating Google Custom Search and setting results to display in modal.
const myInitCallback = function() {
    if (document.readyState == 'complete') {
        // Document is ready when CSE element is initialized.
        // Render an element with both search box and search results in div with id 'test'.
        google.search.cse.element.render(
            {
            div: "open",
            tag: 'searchresults-only'
            });
        } else {
            // Document is not ready yet, when CSE element is initialized.
            google.setOnLoadCallback(function() {
            // Render an element with both search box and search results in div with id 'test'.
            google.search.cse.element.render(
                {
                    div: "open",
                    tag: 'searchresults-only',
                    gname: "results"
                });
            }, true);
        }
    };
    // Initializing Google Custom Search Engine
    window.__gcse = {
    parsetags: 'explicit',
    initializationCallback: myInitCallback
};

function firstMap(firstHotelLat, firstHotelLon) {
    var options = {
        zoom: 10,
        center: {lat:firstHotelLat, lng:firstHotelLon}
    }
    var map = new google.maps.Map(document.getElementById('map1'), options);

    var marker = new google.maps.Marker({
        position: {lat:firstHotelLat, lng:firstHotelLon},
        map: map,
    })
}

function secondMap(secondHotelLat, secondHotelLon) {
    var options = {
        zoom: 10,
        center: {lat:secondHotelLat, lng:secondHotelLon}
    }
    var map = new google.maps.Map(document.getElementById('map2'), options);

    var marker = new google.maps.Marker({
        position: {lat:secondHotelLat, lng:secondHotelLon},
        map: map,
    })
}

function thirdMap(thirdHotelLat, thirdHotelLon) {
    var options = {
        zoom: 10,
        center: {lat:thirdHotelLat, lng:thirdHotelLon}
    }
    var map = new google.maps.Map(document.getElementById('map3'), options);

    var marker = new google.maps.Marker({
        position: {lat:thirdHotelLat, lng:thirdHotelLon},
        map: map,
    })
}

function fourthMap(fourthHotelLat, fourthHotelLon) {
    var options = {
        zoom: 10,
        center: {lat:fourthHotelLat, lng:fourthHotelLon}
    }
    var map = new google.maps.Map(document.getElementById('map4'), options);

    var marker = new google.maps.Marker({
        position: {lat:fourthHotelLat, lng:fourthHotelLon},
        map: map,
    })
}

function fifthMap(fifthHotelLat, fifthHotelLon) {
    var options = {
        zoom: 10,
        center: {lat:fifthHotelLat, lng:fifthHotelLon}
    }
    var map = new google.maps.Map(document.getElementById('map5'), options);

    var marker = new google.maps.Marker({
        position: {lat:fifthHotelLat, lng:fifthHotelLon},
        map: map,
    })
}
