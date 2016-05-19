var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

// TODO: parse schedule
// Open arminius file (this helped: http://stackoverflow.com/questions/23060567/convert-csv-file-data-in-json-data )
var songlist = fs.readFileSync("arminius.txt", "UTF-8"),
    lines = songlist.split("\n"),
    output = [],
    obj,
    values,
    delay;

for (i=0; i < lines.length; i++) {
    if (lines[i].length > 0) {
        obj = {};
        values = lines[i].split("|");
        obj["timetoplay"] = values[0].trim();
        obj["filename"] = values[1].trim();
        obj["songtitle"] = values[2].trim();
        output.push(obj);
    } else {
        console.log("Empty line ignored");
    }
}

// console.log(output);

// TODO: Sort JSON by date/time

// TODO:    Read in JSON line by line
//          Remove past songs
//          

for (i=0; i < output.length; i++) {
    if (Date.now() > new Date(output[i].timetoplay)) {
        // console.log(`Removing ${output[i].timetoplay} playback of ${output[i].filename}`);
        // console.log(output.length);
        output.shift();
        // console.log(output.length);
        i -= 1;
    } else {
        //console.log(`Play ${output[i].filename} at ${output[i].timetoplay}`);
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