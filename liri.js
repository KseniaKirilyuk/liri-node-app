require("dotenv").config();
var Request = require("request");
var Spotify = require("node-spotify-api");
var Bandsintown = require('bandsintown')('codingbootcamp');
var keys = require("./keys.js");
var moment=require("moment")
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

//User input
var inputString = process.argv;
var command = inputString[2];
var userChoice =inputString.slice(3).join(" ");
console.log(userChoice);

//input user's commands,it switches to the related one 
if(command === "concert-this"){bandInfo()}
else if(command === "spotify-this-song"){songInfo()}
else if(command === "movie-this"){movieInfo();}
else if(command === "do-what-it-says"){doIt();}


function bandInfo(){
  console.log("results for a song: "+userChoice) 
  Request.get(`http://rest.bandsintown.com/artists/${userChoice}/events?app_id=codingbootcamp`,
    function(err, res, body){
     if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Venue name: " + JSON.parse(body)[0].venue.name);
    console.log("Venue location: " + JSON.parse(body)[0].venue.country +" , " + JSON.parse(body)[0].venue.city);
    var date=JSON.parse(body)[0].datetime;
    console.log("Date time: " + moment(date).format('MM DD YYYY'));

  });
};


function songInfo(){
  console.log("results for a song: "+userChoice)  
 
   spotify.search({ type: 'track', query: userChoice }, function(err, data) {

    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(query);
    var result = data.tracks.items[0];

    console.log("///////////////////////////////////");
    console.log('Artists: ' + result.album.artists[0].name)
    console.log('Song name: ' + result.name)
    console.log('Preview: ' + result.album.href)
    console.log('Album: ' + result.album.name) 
  
  })

};

function movieInfo (){
  console.log("results for a movie: "+userChoice)  

  Request( "http://www.omdbapi.com/?t="+userChoice+"&y=&plot=short&apikey=trilogy",
  function(error, response, body){
    if (!error && response.statusCode === 200) {
      var result=JSON.parse(body);

      console.log("///////////////////////////////////");
      console.log("Title: " + result.Title);
      console.log("Release Year: " + result.Year);
      console.log("IMDB Rating: " + result.imdbRating);
      console.log("Rotten Tomatoes: " + result.Ratings[1].Value);
      console.log("Country: "+ result.Country);
      console.log("Language: "+result.Language);
      console.log("Plot: "+ result.Plot);
      console.log("Actors: "+ result.Actors);
    }
    else{
      console.log("If you haven't watched "+"Mr. Nobody,"+ "then you should: http://www.imdb.com/title/tt0485947/")
      console.log("It's on Netflix!");
    }
  })
};

function doIt(){
  fs.readFile("random.txt", "utf8", function(error, data){
    if (error) {
      return console.log(error)
    }
      var dataArr = data.split(",");
      console.log(dataArr);
      var command=dataArr[0];
      var userChoice=dataArr[1];
  });
}














