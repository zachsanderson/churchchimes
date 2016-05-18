var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

// TODO: parse schedule
// Open arminius file
var songlist = fs.readFileSync("arminius.csv", "UTF-8");

console.log(songlist);


// TODO: setup timeouts
setTimeout(function() {
    console.log("starting");    
    fs.createReadStream(process.argv[2])
      .pipe(new lame.Decoder())
      .on('format', function (format) {
        this.pipe(new Speaker(format));
      });
    }, 3 * 1000);

console.log("done");