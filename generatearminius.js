// Constants

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
// rounder could also be added to the interval portion if necessary
var DEFAULTROUNDER = 1;
var DEFAULTMININTERVALS = 100;
var DEFAULTMAXINTERVALS = 200;
var DEFAULTSTEPBACKMINUTES = 60;
var DEFAULTMININTERVALMINUTES = 10;
var DEFAULTMAXINTERVALMINUTES = 20;
var DEFAULTMINNUMSONGS = 3;
var DEFAULTMAXNUMSONGS = 5;
var rounder;
var minIntervals;
var maxIntervals;
var stepBackMinutes;
var minIntervalMinutes;
var maxIntervalMinutes;
var minNumSongs;
var maxNumSongs;

//Setting up prompt for customized variables
var prompt = require('prompt');

//Currently the 'pattern' does not control number of digits but it ain't high priority
//Also need to compare that mins are not larger than maxes
var promptSchema =  {
    properties: {
        minIntervals: {
            description: 'Minimum number of playback groups (1-999)',
            type: 'integer',
            pattern: /[1-9][0-9]{0,2}/,
            message: 'Must be between 1 and 999',
            default: DEFAULTMININTERVALS,
            required: true
        },
        maxIntervals: {
            description: 'Maximum number of playback groups (1-999)',
            type: 'integer',
            pattern: /[1-9][0-9]{0,2}/,
            message: 'Must be between 1 and 999',
            default: DEFAULTMAXINTERVALS,
            required: true
        },
        rounder: {
            description: 'Minutes to round to (1-99)',
            type: 'integer',
            pattern: /[1-9][0-9]{0,1}/,
            message: 'Must be between 1 and 99',
            default: DEFAULTROUNDER,
            required: true
        },
        stepBackMinutes: {
            description: 'Number of minutes to step back to create a cushion of previous songs (1-999)',
            type: 'integer',
            pattern: /[1-9][0-9]{0,2}/,
            message: 'Must be between 1 and 999',
            default: DEFAULTSTEPBACKMINUTES,
            required: true
        },
        minIntervalMinutes: {
            description: 'Minimum number of minutes between intervals (1-999)',
            type: 'integer',
            pattern: /[1-9][0-9]{0,2}/,
            message: 'Must be between 1 and 999',
            default: DEFAULTMININTERVALMINUTES,
            required: true
        },
        maxIntervalMinutes: {
            description: 'Maximum number of minutes between intervals (1-999)',
            type: 'integer',
            pattern: /[1-9][0-9]{0,2}/,
            message: 'Must be between 1 and 999',
            default: DEFAULTMAXINTERVALMINUTES,
            required: true
        },
        minNumSongs: {
            description: 'Minimum number of songs per playback group (1-99)',
            type: 'integer',
            pattern: /[1-9][0-9]{0,1}/,
            message: 'Must be between 1 and 99',
            default: DEFAULTMINNUMSONGS,
            required: true
        },
        maxNumSongs: {
            description: 'Maximum number of songs per playback group (1-99)',
            type: 'integer',
            pattern: /[1-9][0-9]{0,1}/,
            message: 'Must be between 1 and 99',
            default: DEFAULTMAXNUMSONGS,
            required: true
        }
    }
}

prompt.start();

prompt.get(promptSchema, function(err, result) {
    console.log('Minimum Intervals: ' + result.minIntervals);
    console.log('Maximum Intervals: ' + result.maxIntervals);
    minIntervals        = result.minIntervals;
    maxIntervals        = result.maxIntervals;
    rounder             = result.rounder * 60000;
    stepBackMinutes     = result.stepBackMinutes;
    minIntervalMinutes  = result.minIntervalMinutes;
    maxIntervalMinutes  = result.maxIntervalMinutes;
    minNumSongs         = result.minNumSongs;
    maxNumSongs         = result.maxNumSongs;

    //Variables
    var fs = require("fs");
    var numberOfIntervals = Math.random() * (maxIntervals - minIntervals) + minIntervals;
    //intervalTime rounds to the nearest rounder
    var intervalTime = new Date(Math.round((Date.now()) / rounder) * rounder);
    var songNumber;
    var csv = "";

    //Check initial time variable
    console.log(`Exact time:   ${new Date(Date.now())}`);
    console.log(`Rounded time: ${intervalTime.toString()}`);

    //Step back a few minutes to potentially generate part of playlist before Now
    intervalTime.setMinutes(intervalTime.getMinutes() - stepBackMinutes);


    for (var i = 0; i < numberOfIntervals; i++) { 
        intervalTime.setMinutes(intervalTime.getMinutes() + (Math.floor(Math.random() * (maxIntervalMinutes - minIntervalMinutes + 1)) + minIntervalMinutes));
        console.log(`Interval #${i + 1}:  ${intervalTime.toString()}`);
        for (var j = 0; j < (Math.floor(Math.random() * maxNumSongs) + minNumSongs); j++) {
            songNumber = (Math.floor(Math.random() * SONGLIST.length));
            console.log(`                Song #${j+1}: ${SONGLIST[songNumber].filename}`);
            csv += `${intervalTime.toString()} | ${SONGLIST[songNumber].filename} | ${SONGLIST[songNumber].songtitle}\n`;
        }
    }

    fs.writeFile("arminius.txt", csv, function(err) {

    });

    console.log("CSV file written");
});

