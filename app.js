var chimeplayer = require('./chimeplayer.js');
var logger = require('./lib/log4js');
var express = require('express');
var child_process = require('child_process');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT=3001;

/**
 * Handler for the "shutdown" button press (sent via websocket command)
 *
 * NOTE: Remember in order for this to work without an error, the user running
 *   this code must be able to run "sudo shutdown -h", without a password. So
 *   therefore if the user running this process is not root, you need to add
 *   the following to your SUDOERS file (consider the security implications):
 *     <this_user_name> ALL=NOPASSWD:/sbin/shutdown
 */
function processShutdown()
{
    logger.info('Software shutdown initiated...');
    child_process.exec('sudo /sbin/shutdown -h now', function(err, stderr, stdout){
        if (err) logger.error('Couldn\'t perform software shutdown: ', err);
        logger.debug('Successfully started shutdown procedure!');
    });
}

/** Configure Express: **/
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    var songtitle = "Little Brown Church";
    res.render("home", {songtitle: songtitle});
});

/** Configure Socket.io **/
// Detect Websocket connection
io.on('connection', function(socket){
    logger.debug('websocket connected');

    // Handle software shutdown request event from client JS
    socket.on('shutdown', function(data) {
        processShutdown();
        // NOTE: could respond to client-side on success if we wanted...
    });
});
// Associate socketio with chimeplayer
chimeplayer.setSocketIo(io);

/**
 * Startup express app!
 */
http.listen(PORT, function(){
    logger.info(`WebServer started on port ${PORT}`);
});

