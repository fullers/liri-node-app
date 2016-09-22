
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

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch(action){
    case 'my-tweets':
        mytweets();
    break;

    case 'spotify-this-song':
        spotifythissong();
    break;

    case 'movie-this':
        movieThis();
    break;

    case 'do-what-it-says':
        doWhatItSays();
    break;
}

function mytweets() {

    // Require keys.js to load keys for Twitter
    var twitInfo = require('./keys.js');

    var twitter = new Twit(twitInfo);

	var params = {screen_name: 'wolfster1951'};
    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}

function spotifythissong() {
 
    console.log(value);

    spotify.search({ type: 'track', query: value }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
 
        // Do something with 'data' 

        for (var i=0; i < data.tracks.items.length; i++) {
            if (data.tracks.items[i].name === value) {
                for (var a=0; a < data.tracks.items[i].artists.length; a++) {
                    artists = data.tracks.items[i].artists[a].name;
                }
                artists = data.tracks.items[i].artists.name;
                songName = data.tracks.items[i].name;
                previewUrl = data.tracks.items[i].preview_url;
                console.log("----------------------------");
                console.log("Artist(s):"+artists);
                console.log("The Song's name: "+songName);
                console.log("Preview URL: "+previewUrl);
                console.log("----------------------------");
            } else if(data.tracks.items[i].name !== value){
                
            }
        }
        console.log(data);
    });

}

function movieThis() {

}

function doWhatItSays() {

}