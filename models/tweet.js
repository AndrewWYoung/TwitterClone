var mongoose = require("mongoose");

// SCHEMA SETUP 
var tweetSchema = new mongoose.Schema({
    image: {type: String, default: "https://img.clipartfest.com/672f88933a5add7f407647d3ac640baf_circle-twitter-icon-twitter-icon-clipart_512-512.png"},
    tweet: String,
    date: {type: Date, default: Date.now},
    meta: {
        likes: {type: Number, default: 0},
        retweets: {type: Number, default: 0},
        replies: {type: Number, default: 0}
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Tweet", tweetSchema);