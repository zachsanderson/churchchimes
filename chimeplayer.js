var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

// TODO: parse schedule
// Open arminius file (this helped: http://stackoverflow.com/questions/23060567/convert-csv-file-data-in-json-data )
var songlist = fs.readFileSync("arminius.txt", "UTF-8"),
    lines = songlist.split("\n"),
    output = [],
    obj,
    values;

for (i=0; i < lines.length; i++) {
    if (lines[i].length > 0) {
        obj = {};
        values = lines[i].split("|");
        obj["timetoplay"] = values[0].trim();
        obj["filename"] = values[1].trim();
        obj["songtitle"] = values[2].trim();
        output.push(obj);
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

var delay = new Date(output[0].timetoplay) - Date.now();
console.log(`${output[0].filename} will play in ${delay/1000} seconds`); 

// TODO: setup timeouts
setTimeout(function() {
    console.log(`Playing ${output[0].filename} at ${new Date(Date.now())}`);
    fs.createReadStream(`audio/${output[0].filename}`)
      .pipe(new lame.Decoder())
      .on("format", function (format) {
        this.pipe(new Speaker(format));
      })
      //.on("start", function() {console.log(`${output[0].filename} now playing`);}) 
      .on("end", function() {console.log(`${output[0].filename} finished playing`);});
    }, delay);

// TODO: Allow for "Church is out" button