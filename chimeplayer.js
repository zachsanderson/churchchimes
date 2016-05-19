var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

// Parse schedule
// Open arminius file 

var songlist = fs.readFileSync("arminius.txt", "UTF-8"),
    lines = songlist.split("\n"),
    output = [],
    obj,
    values,
    delay;

output = lines
    .filter(function(el, i, ar) { return (el.length > 0); })
    .map(function(v, i, ar) {
        var splits = v.split('|');
        return {
            timetoplay: splits[0].trim(),
            filename: splits[1].trim(),
            songtitle: splits[2].trim()
        };
    });

// TODO: Sort JSON by date/time

// Read in JSON line by line
// Remove past songs      

for (i=0; i < output.length; i++) {
    // Check to see if this song was scheduled to play earlier
    if (Date.now() > new Date(output[i].timetoplay)) {
        // Remove this song
        output.shift();
        // Step i back 1 since length has changed and each song shifted forward one
        i -= 1;
    }
}

// console.log(output);

console.log(new Date(Date.now()).toString());

if (output.length > 0) {
    queueSong(output[0]);
} else {
    console.log("No more songs to play (did not enter function)");
}

function queueSong(song) {
    // Set delay to 5 seconds if song is past due
    if (Date.now() > new Date(song.timetoplay)) {
        delay = 5000;
    } else { // Set delay for when future song is scheduled
        delay = new Date(song.timetoplay) - Date.now();    
    }
    console.log(`${song.filename} will play in ${delay/1000} seconds`); 

    setTimeout(function() {
        console.log(`Playing ${song.filename} at ${new Date(Date.now())}`);
        fs.createReadStream(`audio/${song.filename}`)
          .pipe(new lame.Decoder())
          .on("format", function (format) {
            this.pipe(new Speaker(format));
          })
          //.on("start", function() {console.log(`${output[0].filename} now playing`);}) 
          .on("end", function() {
            console.log(`${song.filename} finished playing`);
            // Remove song that was just played
            output.shift();
            // After removing that song, queue next song if available
            if (output.length > 0) {
                queueSong(output[0]);
            } else {
                console.log("Last song just played");
            }
          });
        }, delay);
}
    // TODO: Allow for "Church is out" button    