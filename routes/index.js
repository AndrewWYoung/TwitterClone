"use strict";

const router = require("express").Router();
const Tweet = require("../models/tweet");
const user = require("./user.js");


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
            // Sort tweets by date
            allTweets.sort(function(a, b) {return (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0);});
            res.render("index", { tweets: allTweets });
        }
    });
});

// CREATE - add new tweet to DB
router.post("/tweets", function(req, res) {
    const newTweet = { tweet: req.body.tweet };
    // Check if currentUser is loggedin
    if(res.locals.currentUser){
        Tweet.create(newTweet, function(err, tweet) {
            if (err) {
                console.log(err);
            } else {
                // Add user information to tweet (id, username)
                tweet.user.id = res.locals.currentUser._id;
                tweet.user.username = res.locals.currentUser.username;
                tweet.save();
                res.redirect("/tweets");
            }
        }); 
    // if NO currentUser logged in, redirect to /tweets
    } else {
        res.redirect("/tweets");
    }
});

// DELETE - delete tweet from DB using MongoDB ID
router.delete("/tweets/:id", function(req, res){
    // Find the Tweet in the Database and remove it
    // /tweets/:id is the route that we are using to delete tweets
    // You get the :id from the route using "req.params.id"
    // Check if there is a user logged in
    if(res.locals.currentUser){
        Tweet.findById(req.params.id, function(err, tweet){
            if(err){
                console.log(err);
                res.redirect("/tweets");
            } else {
                // Check to make sure the currentUser trying to delete tweet is the creator
                if(res.locals.currentUser.username == tweet.user.username){
                    // remove tweet from DB & redirect
                    tweet.remove();
                    res.redirect("/tweets");
                }
            }
        });
    } else {
        res.redirect("/tweets");
    }
});

// INCLUDE USER ROUTES from user.js file
router.use("/", user);

module.exports = router;