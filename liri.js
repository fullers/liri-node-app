
// Load the fs package to read and write
var fs = require('fs');

// Load the request package
var request = require('request');

// Load Twitter package
var Twit = require("twitter");

// Load Spotify package
var spotify = require('spotify');

// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var action = process.argv[2];
var value = process.argv[3];

var temp = [];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch(action){
    case 'my-tweets':
        mytweets();
    break;

    case 'spotify-this-song':
        spotifythissong(value);
    break;

    case 'movie-this':
        movieThis(value);
    break;

    case 'do-what-it-says':
        doWhatItSays();
    break;
}

function mytweets(userName) {

    // Require keys.js to load keys for Twitter
    var keys = require('./keys.js');

    var twitInfo = keys.twitterKeys;

    var twitter = new Twit(twitInfo);

	var params = {screen_name: 'wolfster1951'};
    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}

function spotifythissong(song) {
 
    if(song == null) {

        song = "The Sign";

    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
 
        // For loop that checks the tracks object, items array  and then checkes the artists array in the spotify api
        // Based on the items, it console logs the Artist, Song Name, Preview URL, and Album.

        for (var i=0; i < data.tracks.items.length; i++) {
            if (data.tracks.items[i].name === song) {
                for (var a=0; a < data.tracks.items[i].artists.length; a++) {
                    artists = data.tracks.items[i].artists[a].name;
                }
                songName = data.tracks.items[i].name;
                previewUrl = data.tracks.items[i].preview_url;
                album = data.tracks.items[i].album.name;
                console.log("----------------------------");
                console.log("Artist(s):"+artists);
                console.log("The Song's name: "+songName);
                console.log("Preview URL: "+previewUrl);
                console.log("Album: "+album);
                console.log("----------------------------"+'\n');
            } else if(data.tracks.items[i].name !== song){
                
            }
        }
    });

}

function movieThis(title) {

 if(title == null) {

        title = "Mr Nobody";

    }

    // Then run a request to the OMDB API with the movie specified
    request('http://www.omdbapi.com/?t='+title+'&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode == 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
        console.log("----------------------------");
        console.log("This Movie Information is:");
        console.log("Title: " + JSON.parse(body)["Title"]);
        console.log("Year: " + JSON.parse(body)["Year"]);
        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
        console.log("Country where produced: " + JSON.parse(body)["Country"]);
        console.log("Language: " + JSON.parse(body)["Language"]);
        console.log("Plot: " + JSON.parse(body)["Plot"]);
        console.log("Actors: " + JSON.parse(body)["Actors"]);
        console.log("Rotten Tomatoes:");
        console.log("Ratings: "+JSON.parse(body)["tomatoRating"]);
        console.log("URL: "+JSON.parse(body)["tomatoURL"]);
        console.log("----------------------------");
    }
});

}

function doWhatItSays() {

        fs.readFile("random.txt", "utf8", function(err,data){
    
        // Break the string down by comma separation and store the contents into the output array.
        var output = data.toString().split(',');
   
        value = output[1];
        
        if(output[0] == 'my-tweets') {
            mytweets();
        }        
        
        if(output[0] == 'spotify-this-song') {
            
            spotifythissong(value);
        }
        if (output[0] == 'movie-this') {

            movieThis(value);
        }
        
       });   
}