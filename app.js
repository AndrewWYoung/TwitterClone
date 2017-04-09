var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Array of tweets since there's not database
var twitterIcon = "https://img.clipartfest.com/672f88933a5add7f407647d3ac640baf_circle-twitter-icon-twitter-icon-clipart_512-512.png";
var tweets = [
    {name: "Christopher", image: twitterIcon, tweet: "insert lorem ipsum here"},
    {name: "Andrew", image: twitterIcon, tweet: "insert lorem ipsum here"},
    {name: "Oscar", image: twitterIcon, tweet: "lorem ipsum!"},
]

app.get("/", function(req, res){
    // res.send("Twitter Clone");
    res.render("landing.ejs");
});

app.get("/tweets", function(req, res){
    res.render("tweets", {tweets : tweets});
});

// get data from form and add to tweets array 
// redirect back to tweets page
app.post("/tweets", function(req, res){
    var name = req.body.name;
    var image = twitterIcon;
    var tweet = req.body.tweet;
    var newTweet = {name : name, image: twitterIcon, tweet : tweet};
    tweets.push(newTweet);
    res.redirect("/tweets");
});

// setup server for localhost on port 3001
app.listen(3001, 'localhost', function(){
    console.log("Twitter Clone Server Started...");
});