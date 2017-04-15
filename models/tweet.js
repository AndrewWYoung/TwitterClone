var mongoose = require("mongoose");

// SCHEMA SETUP 
var tweetSchema = new mongoose.Schema({
    name: String,
    image: String,
    tweet: String,
    date: {type: Date, default: Date.now},
    meta: {
    	likes: {type: Number, default: 0},
    	retweets: {type: Number, default: 0},
    	replies: {type: Number, default: 0}
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Tweet", tweetSchema);