var chimeplayer = require('./chimeplayer.js');
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    var songtitle = "Little Brown Church";
    res.render("home", {songtitle: songtitle});
});

io.on('connection', function(socket){
    console.log('websocket connected');
});
// Associate socketio with chimplayer
chimeplayer.setSocketIo(io);

http.listen(3001, function(){
    console.log("Server started");
});

