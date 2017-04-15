const Tweet = require("./models/tweet");
const Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://img.clipartfest.com/672f88933a5add7f407647d3ac640baf_circle-twitter-icon-twitter-icon-clipart_512-512.png",
        tweet: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://img.clipartfest.com/672f88933a5add7f407647d3ac640baf_circle-twitter-icon-twitter-icon-clipart_512-512.png",
        tweet: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://img.clipartfest.com/672f88933a5add7f407647d3ac640baf_circle-twitter-icon-twitter-icon-clipart_512-512.png",
        tweet: "blah blah blah"
    }
];

function seedDB() {
    //Remove all tweets
    Tweet.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed tweets!");
        //add a few tweets
        data.forEach(function(seed) {
            Tweet.create(seed, function(err, tweet) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a tweet");
                    //create a comment
                    Comment.create({
                        text: "This place is great",
                        author: "Homer"
                    }, function(err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            tweet.comments.push(comment);
                            tweet.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;