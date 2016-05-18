//Constants
var MININTERVALS = 3;
var MAXINTERVALS = 10;
var SONGLIST = [
        {filename: "allcreaturesofourgod.mp3", songtitle: "All Creatures of Our God and King"},
        {filename: "amazinggrace.mp3", songtitle: "Amazing Grace"},
        {filename: "americanrobin.mp3", songtitle: "American Robin"},
        {filename: "comethoualmightyking.mp3", songtitle: "Come Thou Almighty King"},
        {filename: "mightyfortress.mp3", songtitle: "A Mighty Fortress is Our God"}
    ];
// Rounding coefficient for even minutes # of minutes * 60 seconds * 1000 milliseconds
var ROUNDER = 1 * 60000;
// Buffer seconds to buy the file some time from generation to actual playback
var BUFFER = 10 * 1000;


//Variables
var fs = require("fs");
var numberOfIntervals = Math.random() * (MAXINTERVALS - MININTERVALS) + MININTERVALS;
//inALittleBit rounds to the nearest ROUNDER (after a # of seconds for BUFFER added)
var inALittleBit = new Date(Math.round((Date.now() + BUFFER) / ROUNDER) * ROUNDER);
var csv = "";

console.log(inALittleBit.toString());
console.log(new Date(Date.now()));

for (var i = 0; i < numberOfIntervals; i++) { 
    
}


fs.writeFile("arminius.csv", csv, function(err) {

});