'use strict';

const router = require('express').Router();
const Tweet = require("../models/tweet");
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

module.exports = router;