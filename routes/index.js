"use strict";

const router = require("express").Router();
const Tweet = require("../models/tweet");
const User = require("../models/user");
const userRoutes = require("./user.js");


/* show home page */
router.get("/", function(req, res) {
    res.render("landing");
});

// INDEX - show all tweets
router.get("/tweets", function(req, res) {
    //
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), "gi");
        // searches tweets based on search query
        Tweet.find({ tweet: regex }, function(err, allTweets) {
            console.log("SEARCH TEST:");
            console.log("Regex: " + regex);
            if (err) {
                console.log(err);
            } else {
                // Sort tweets by date
                allTweets.sort(function(a, b) { return (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0); });
                res.render("index", { tweets: allTweets });
            }
        });
    // No search query, Find all tweets
    // Eventually find only tweets from those who the user follows
    } else {
        //
        Tweet.find({}, function(err, allTweets) {
            if (err) {
                console.log(err);
            } else {
                // Sort tweets by date
                allTweets.sort(function(a, b) { return (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0); });
                res.render("index", { tweets: allTweets });
            }
        });
    }
});

// CREATE - add new tweet to DB
router.post("/tweets", isLoggedIn, function(req, res) {
    const newTweet = { tweet: req.body.tweet };
    User.findOne({"username": res.locals.currentUser.username},  function(err, profile){
        if(err){
            console.log(err);
            res.redirect("/tweets");
        } else {
            // Increment tweets on profile 
            var tweetAmnt = profile.meta.tweets + 1;
            profile.meta.tweets = tweetAmnt;
            profile.save();
            // Create a new tweet
            Tweet.create(newTweet, function(err, tweet) {
                if (err) {
                    console.log(err);
                    res.redirect("/tweets");
                } else {
                    // Add user information to tweet (id, username)
                    tweet.user.id = res.locals.currentUser._id;
                    tweet.user.username = res.locals.currentUser.username;
                    tweet.save();
                    res.redirect("/tweets");
                }
            });
        } 
    });
         
});

// DELETE - delete tweet from DB using MongoDB ID
router.delete("/tweets/:id", isLoggedIn, function(req, res) {
    // Find the Tweet in the Database and remove it
    // /tweets/:id is the route that we are using to delete tweets
    // You get the :id from the route using "req.params.id"
    Tweet.findById(req.params.id, function(err, tweet) {
        if (err) {
            console.log(err);
            res.redirect("/tweets");
        } else {
            // Check to make sure the currentUser trying to delete tweet is the creator
            if (res.locals.currentUser.username == tweet.user.username) {
                // remove tweet from DB & redirect
                User.findOne({username: res.locals.currentUser}, function(err, profile){
                    if(err){
                        console.log(err);
                        res.redirect("/tweets");
                    } else {
                        // Decrement tweets in profile
                        if(profile.meta.tweets > 0){
                            var tweetAmnt = (profile.meta.tweets - 1);
                            profile.meta.tweets = tweetAmnt;
                            profile.save();
                        }
                        // Remove tweet from Tweets DB
                        tweet.remove();
                        res.redirect("/tweets");
                    }
                }); 
            }
        }
    });
});

// INCLUDE USER ROUTES from user.js file
router.use("/", userRoutes);

// Check if loggedin MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
} 

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;