"use strict";

const router = require("express").Router();
const Tweet = require("../models/tweet");
const user = require("./user.js");
const twitterIcon = "https://img.clipartfest.com/672f88933a5add7f407647d3ac640baf_circle-twitter-icon-twitter-icon-clipart_512-512.png";


/* show home page */
router.get("/", function(req, res) {
    res.render("landing");
});

// INDEX - show all tweets
router.get("/tweets", function(req, res) {
    Tweet.find({}, function(err, allTweets) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { tweets: allTweets });
        }
    });
});

// CREATE - add new tweet to DB
router.post("/tweets", function(req, res) {
    const name = req.body.name;
    const image = twitterIcon;
    const tweet = req.body.tweet;
    const newTweet = { name: name, image: image, tweet: tweet };

    Tweet.create(newTweet, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/tweets");
        }
    });
});

// DELETE - delete tweet from DB using MongoDB ID
router.delete("/tweets/:id", function(req, res){
    // Find the Tweet in the Database and remove it
    // /tweets/:id is the route that we are using to delete tweets
    // You get the :id from the route using "req.params.id"
    Tweet.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/tweets");
        } else {
            res.redirect("/tweets");
        }
    });
});

// INCLUDE USER ROUTES from user.js file
router.use("/", user);

module.exports = router;