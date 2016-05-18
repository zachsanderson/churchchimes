//Constants
var MININTERVALS = 4;
var MAXINTERVALS = 10;
var STEPBACKMINUTES = 5;
var MININTERVALMINUTES = 3;
var MAXINTERVALMINUTES = 5;
var SONGLIST = [
        {filename: "allcreaturesofourgod.mp3", songtitle: "All Creatures of Our God and King"},
        {filename: "amazinggrace.mp3", songtitle: "Amazing Grace"},
        {filename: "americanrobin.mp3", songtitle: "American Robin"},
        {filename: "comethoualmightyking.mp3", songtitle: "Come Thou Almighty King"},
        {filename: "mightyfortress.mp3", songtitle: "A Mighty Fortress is Our God"}
    ];
// Rounding coefficient for even minutes # of minutes * 60 seconds * 1000 milliseconds
// ROUNDER could also be added to the interval portion if necessary
var ROUNDER = 1 * 60000;

//Variables
var fs = require("fs");
var numberOfIntervals = Math.random() * (MAXINTERVALS - MININTERVALS) + MININTERVALS;
//intervalTime rounds to the nearest ROUNDER (after a # of seconds for BUFFER added)
var intervalTime = new Date(Math.round((Date.now()) / ROUNDER) * ROUNDER);
var songNumber;
var csv = "";

//Check initial time variable
console.log(`Exact time:   ${new Date(Date.now())}`);
console.log(`Rounded time: ${intervalTime.toString()}`);

//Step back a few minutes to potentially generate part of playlist before Now
intervalTime.setMinutes(intervalTime.getMinutes() - STEPBACKMINUTES);


for (var i = 0; i < numberOfIntervals; i++) { 
    intervalTime.setMinutes(intervalTime.getMinutes() + (Math.floor(Math.random() * (MAXINTERVALMINUTES - MININTERVALMINUTES + 1)) + MININTERVALMINUTES));
    console.log(`Interval #${i + 1}:  ${intervalTime.toString()}`);
    for (var j = 0; j < (Math.floor(Math.random() * 3) + 1); j++) {
        songNumber = (Math.floor(Math.random() * SONGLIST.length));
        console.log(`                Song #${j+1}: ${SONGLIST[songNumber].filename}`);
        csv += `${intervalTime.toString()}, ${SONGLIST[songNumber].filename}, ${SONGLIST[songNumber].songtitle}\n`;
    }
}

fs.writeFile("arminius.csv", csv, function(err) {

});

console.log("CSV file written")