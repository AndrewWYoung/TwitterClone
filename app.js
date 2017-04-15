var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Tweet = require("./models/tweet"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/twitter_clone_v3");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// var Tweet = mongoose.model("Tweet", tweetSchema);

// Creates test objects (tweets) for the DB 
// Tweet.create(
//     {
//         name: "Andrew",
//         image: "https://img.clipartfest.com/672f88933a5add7f407647d3ac640baf_circle-twitter-icon-twitter-icon-clipart_512-512.png",
//         tweet: "This is a test tweet"
//     },
//     function(err, tweet){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED TWEET");
//             console.log(tweet);
//         }
//     }
// );

// // Array of tweets since there's not database
var twitterIcon = "https://img.clipartfest.com/672f88933a5add7f407647d3ac640baf_circle-twitter-icon-twitter-icon-clipart_512-512.png";
// var tweets = [
//     {name: "Christopher", image: twitterIcon, tweet: "insert lorem ipsum here"},
//     {name: "Andrew", image: twitterIcon, tweet: "insert lorem ipsum here"},
//     {name: "Oscar", image: twitterIcon, tweet: "lorem ipsum!"},
// ]

// Landing Page  
app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX - show all tweets 
app.get("/tweets", function(req, res) {
    // Get all tweets from DB
    Tweet.find({}, function(err, allTweets) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { tweets: allTweets });
        }
    });
})

// CREATE - add new tweet to DB 
app.post("/tweets", function(req, res) {
    // get data from form and add to tweets array 
    var name = req.body.name;
    var image = twitterIcon;
    var tweet = req.body.tweet;
    var newTweet = { name: name, image: image, tweet: tweet };
    // Create a new tweet and save it to DB 
    Tweet.create(newTweet, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to tweets page 
            res.redirect("/tweets");
        }
    });
});

// NEW - as of now, since the tweet form is already on the home page, there's no need to create a route to get to the form
// if interested, the code would simply look like the following:
//
// app.get("/tweets/new", function(req, res){
//    res.render("new.ejs"); 
// });

// SHOW - as of now, no additional detail of the tweets are being implemented.
// if interested, the code would simply look like the following:
//
// app.get("/tweets/:id", function(req, res){
//     //find the tweet with provided ID
//     Tweet.findById(req.params.id, function(err, foundTweet){
//         if(err){
//             console.log(err);
//         } else {
//             //render show template with that tweet
//             res.render("show", {tweet: foundTweet});
//         }
//     });
// })

// app.get("/tweets", function(req, res){
//     res.render("tweets", {tweets : tweets});
// });

// get data from form and add to tweets array 
// redirect back to tweets page
app.post("/tweets", function(req, res) {
    var name = req.body.name;
    var image = twitterIcon;
    var tweet = req.body.tweet;
    var newTweet = { name: name, image: twitterIcon, tweet: tweet };
    tweets.push(newTweet);
    res.redirect("/tweets");
});

// setup server for localhost on port 3001
// localhost:3001/
app.listen(3001, 'localhost', function() {
    console.log("Twitter Clone Server Started...");
});