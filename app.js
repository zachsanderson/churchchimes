var chimeplayer = require('./chimeplayer.js');
var logger = require('./lib/log4js');
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT=3000;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    var songtitle = "Little Brown Church";
    res.render("home", {songtitle: songtitle});
});

io.on('connection', function(socket){
    logger.debug('websocket connected');
});
// Associate socketio with chimplayer
chimeplayer.setSocketIo(io);

http.listen(PORT, function(){
    logger.info(`WebServer started on port ${PORT}`);
});

