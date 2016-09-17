// Load the fs package to read and write
var fs = require('fs');

// Load the request package
var request = require('request');

// Load Twitter package
var Twitter = require('twitter');
var keys = require('./keys.js');

// Load Spotify package


// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch(action){
    case 'my-tweets':
        twitter();
    break;

    case 'spotify-this-song':
        spotify();
    break;

    case 'movie-this':
        movieThis();
    break;

    case 'do-what-it-says':
        doWhatItSays();
    break;
}

function twitter() {
	client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
   console.log(tweets);
});


function spotify() {

}

function movieThis() {

}

function doWhatItSays() {

}