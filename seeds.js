const Tweet = require("./models/tweet");
// defaultTwitterIcon = https://img.clipartfest.com/672f88933a5add7f407647d3ac640baf_circle-twitter-icon-twitter-icon-clipart_512-512.png

var data = [
    {
        user: {username: "admin"},
        tweet: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.",
        meta: {likes: 20, retweets: 5, replies: 2}
    },
    {
        user: {username: "admin"},
        tweet: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.",
        meta: {likes: 10}
    },
    {
        user: {username: "admin"},
        tweet: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.",
        meta: {retweets: 25}
    }
];

function seedDB() {
    removeAllTweets();
    createTweets();
}

function createTweets(){
    data.forEach(function(seed){
        Tweet.create(seed, function(err, tweet){
            if(err){
                console.log(err);
            } else {
                console.log("Added Tweet by " + tweet.user.username);
            }
        });
    });
}

function removeAllTweets(){
    Tweet.remove({user: {username: "admin"}}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Remove all tweets");
        }
    });
}

module.exports = seedDB;