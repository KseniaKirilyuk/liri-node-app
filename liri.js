require("dotenv").config();
var Request = require("request");
var Spotify = require("node-spotify-api");
var Bandsintown = require('bandsintown')('codingbootcamp');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var inputString = process.argv;
var command = inputString[2];
var userChoice =inputString.slice(3).join(" ");
console.log(userChoice);
//var info = process.argv[3];

if(command === "concert-this"){
//node liri.js concert-this <artist/band name here>
bandInfo()
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")
}
  else if(command === "spotify-this-song"){
//node liri.js spotify-this-song '<song name here>'
  songInfo();
//else genre === undefined default info about "The Sign" by Ace of Base
  }
  else if(command === "movie-this"){
    movieInfo();
//else default:
//If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
//It's on Netflix!
  }
  else if(command === "do-what-it-says"){
    //doIt();
        //fs package
        //LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands
        //output:
        //spotify-this-song for "I Want it That Way," as follows the text in random.txt
        //test  movie-this 
      }
function bandInfo(){
  console.log("results for a song: "+userChoice) 
  Request.get(`http://rest.bandsintown.com/artists/${userChoice}/events?app_id=codingbootcamp`,
    function(err, res, body){
    console.log(JSON.parse(body));

  });
  

};


function songInfo(){
  console.log("results for a song: "+userChoice)  
 
   spotify.search({ type: 'track', query: userChoice }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var result = data.tracks.items[0];

    console.log("///////////////////////////////////");
    console.log('Artists: ' + result.album.artists[0].name)
    console.log('Song name: ' + result.name)
    console.log('Preview: ' + result.album.href)
    console.log('Album: ' + result.album.name)      
  })
};

function movieInfo (){
  console.log("results for a song: "+userChoice)  

  Request( "http://www.omdbapi.com/?t="+userChoice+"&y=&plot=short&apikey=trilogy",
  function(error, response, body){
    if (!error && response.statusCode === 200) {
      var result=JSON.parse(body);

      console.log("///////////////////////////////////");
      console.log("Title: " + result.Title);//parse Json string and returns a JavaScript object
      console.log("Release Year: " + result.Year);
      console.log("IMDB Rating: " + result.imdbRating);
      console.log("Rotten Tomatoes: " + result.Ratings[1].Value);
      console.log("Country: "+ result.Country);
      console.log("Language: "+result.Language);
      console.log("Plot: "+ result.Plot);
      console.log("Actors: "+ result.Actors);
    }
  })
};















