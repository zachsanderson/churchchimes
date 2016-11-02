var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
var logger = require('./lib/log4js');

module.exports = function(io) {
    io.on('connection', function(socket) {
        console.log("This shit connected here");
        socket.on('message', function(message) {
            console.log("Connection on socket.io on socket", message.value);    
        });    
    });
};



const DEFAULT_DELAY = 3000;

// Parse schedule
// Open arminius file 

var arminius = fs.readFileSync("arminius.txt", "UTF-8");
var playlist = getPlaylist(arminius);
var timeoutid;

// Reference socket.io from main app
var io = null;

// TODO: Sort JSON by date/time

// Read in JSON line by line
// console.log(playlist);

// Example FS watch functionality:
// (Side effect to this is the program will never end without user action now)
// NOTE: I think you probably want to watch a directory for changes rather than
//   a single file. The reason being: a deletion of that file will end your
//   ability to detect changes at all. The alternative would be in the case of
//   a "rename" (deletions come across called renames as well), you could setup
//   a NEW fswatcher, if you want. But I still think the impl will be simpler
//   if you just watch a particular sub directory. Or better yet, look at a
//   mount directory for automounted usb disk ;)
fs.watch('arminius.txt', {persistent: true}, updatePlaylist);


logger.info(`Starting up at ${new Date(Date.now()).toString()}...`);

if (playlist.length > 0) {
    queueSong(playlist[0]);
} else {
    console.log("No more songs to play (did not enter function)");
}

function queueSong(song) {
    // Set delay to 3 seconds (DEFAULT_DELAY) if song is past due
    var delay = DEFAULT_DELAY;
    if (Date.now() < new Date(song.timetoplay)) {
        delay = new Date(song.timetoplay) - Date.now();    
    }
    console.log(`${song.filename} will play in ${delay/1000} seconds`); 

    timeoutid = setTimeout(function() {
        console.log(`Playing ${song.filename} at ${new Date(Date.now())}`);
        fs.createReadStream(`audio/${song.filename}`)
          .pipe(new lame.Decoder())
          .on("format", function (format) {
            this.pipe(new Speaker(format));
            if (io) io.emit('play', {song: playlist[0].songtitle});
          })
          .on("end", function() {
            console.log(`${song.filename} finished playing`);

            // Notify the front-end (all connections)
            if (io) io.emit('stop');

            // Remove song that was just played
            playlist.shift();
            // After removing that song, queue next song if available
            if (playlist.length > 0) {
                queueSong(playlist[0]);
            } else {
                console.log("Last song just played");
                timeoutid = null;
            }
          });
        }, delay);
}


// TODO: Allow for "Church is out" button    

/**
 * Helper function to parse a String of file contents into
 * a playlist, following our definition of a playlist (pipe-separated)
 */
function getPlaylist(fileContents)
{
    var lines = fileContents.split("\n");
    var list = lines
        .filter(function(el, i, ar) { return (el.length > 0); })
        .map(function(v, i, ar) {
            var splits = v.split('|');
            return {
                timetoplay: splits[0].trim(),
                filename: splits[1].trim(),
                songtitle: splits[2].trim()
            };
        });
    
    // Filter out past songs, return resulting array
    return list.filter(function(el, i, ar) {
        return (Date.now() < new Date(el.timetoplay));
    });
}

/**
 * Action handler for a file change in the 'arminius.txt' playlist
 */
function updatePlaylist(event, filename)
{
    if (event == 'change') {
        console.log(`Playlist update detected on "${filename}"`);
        
        // Cancel old schedule
        console.log('Canceling scheduled playback');
        if (timeoutid) clearTimeout(timeoutid);

        // Get new playlist
        var newplaylist = fs.readFileSync("arminius.txt", "UTF-8"),
        playlist = getPlaylist(newplaylist);

        // And schedule new playback
        if (playlist.length > 0) {
            queueSong(playlist[0]);
        } else {
            console.log("No songs to play in new playlist");
        }
    }
    else if (event == 'rename') {
        console.log(`"${filename}" was renamed`);
        // TODO: Handle this if desired
    }
    else {
        console.log(`Unexpected FSWatcher event: ${event}`);
    }
}

/**
 * Define a link between the websocket and the chimeplayer, once a connection is made.
 */
module.exports = {
    setSocketIo: function(socketio) {
        // Assign the local (private) variable
        io = socketio;
    }
}
