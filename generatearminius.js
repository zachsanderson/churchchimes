//Constants
var MININTERVALS = 4;
var MAXINTERVALS = 10;
var STEPBACKMINUTES = 5;
var MININTERVALMINUTES = 3;
var MAXINTERVALMINUTES = 5;
var SONGLIST = [
        {filename: "FartherAlong.mp3", songtitle: "Farther Along"},
        {filename: "057.mp3", songtitle: "O, For a Thousand Tongues to Sing"},
        {filename: "061.mp3", songtitle: "Come Thou Almighty King"},
        {filename: "064-low.mp3", songtitle: "Holy, Holy, Holy"},
        {filename: "088-low.mp3", songtitle: "Maker, In Whom We Live"},
        {filename: "089-low.mp3", songtitle: "Joyful, Joyful, We Adore Thee"},
        {filename: "092-low.mp3", songtitle: "For the Beauty of the Earth"},
        {filename: "095-low.mp3", songtitle: "Praise God From Whom All Blessings Flow"},
        {filename: "098-low.mp3", songtitle: "To God Be The Glory"}
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
        csv += `${intervalTime.toString()} | ${SONGLIST[songNumber].filename} | ${SONGLIST[songNumber].songtitle}\n`;
    }
}

fs.writeFile("arminius.txt", csv, function(err) {

});

console.log("CSV file written");