//Constants
var MININTERVALS = 100;
var MAXINTERVALS = 200;
var STEPBACKMINUTES = 60;
var MININTERVALMINUTES = 10;
var MAXINTERVALMINUTES = 20;
var SONGLIST = [
        {filename: "057-high.mp3", songtitle: "O, For a Thousand Tongues to Sing"},
        {filename: "061-high.mp3", songtitle: "Come Thou Almighty King"},
        {filename: "064-high.mp3", songtitle: "Holy, Holy, Holy"},
        {filename: "077-high.mp3", songtitle: "How Great Thou Art"},
        {filename: "088-high.mp3", songtitle: "Maker, In Whom We Live"},
        {filename: "089-high.mp3", songtitle: "Joyful, Joyful, We Adore Thee"},
        {filename: "092-high.mp3", songtitle: "For the Beauty of the Earth"},
        {filename: "095-high.mp3", songtitle: "Praise God From Whom All Blessings Flow"},
        {filename: "098-high.mp3", songtitle: "To God Be The Glory"},
        {filename: "103-high.mp3", songtitle: "Immortal, Invisible, God Only Wise"},
        {filename: "110-high.mp3", songtitle: "A Mighty Fortress Is Our God"},
        {filename: "127-high.mp3", songtitle: "Guide Me, O Thou Great Jehovah"},
        {filename: "128-high.mp3", songtitle: "He Leadeth Me: O Blessed Thought"},
        {filename: "133-high.mp3", songtitle: "Leaning on the Everlasting Arms"},
        {filename: "144-high.mp3", songtitle: "This Is My Father's World"},
        {filename: "154-high.mp3", songtitle: "All Hail the Power of Jesus' Name"},
        {filename: "156-high.mp3", songtitle: "I Love to Tell the Story"},
        {filename: "157-high.mp3", songtitle: "Jesus Shall Reign"},
        {filename: "170-high.mp3", songtitle: "O How I Love Jesus"},
        {filename: "203-high.mp3", songtitle: "Hail to the Lord's Anointed"},
        {filename: "213-high.mp3", songtitle: "Lift Up Your Heads, Ye Mighty Gates"},
        {filename: "277-high.mp3", songtitle: "Tell Me the Stories of Jesus"},
        {filename: "288-high.mp3", songtitle: "Were You There"},
        {filename: "297-high.mp3", songtitle: "Beneath the Cross of Jesus"},
        {filename: "298-high.mp3", songtitle: "When I Survey the Wondrous Cross"},
        {filename: "314-high.mp3", songtitle: "In the Garden"},
        {filename: "354-high.mp3", songtitle: "I Surrender All"},
        {filename: "361-high.mp3", songtitle: "Rock of Ages, Cleft for Me"},
        {filename: "369-high.mp3", songtitle: "Blessed Assurance"},
        {filename: "377-high.mp3", songtitle: "It Is Well with My Soul"},
        {filename: "LittleBrownChurch.mp3", songtitle: "Little Brown Church in the Wildwood"},
        {filename: "WhisperingHope.mp3", songtitle: "Whispering Hope"}
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