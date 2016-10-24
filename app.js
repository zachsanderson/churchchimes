var chimeplayer = require('./chimeplayer.js');
var express = require("express");
var app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    var songtitle = "Little Brown Church";
    res.render("home", {songtitle: songtitle});
});

app.listen(3000, function(){
    console.log("Server started");
});