var mongoose = require("mongoose");

// SCHEMA SETUP 
var tweetSchema = new mongoose.Schema({
    name: String,
    image: String,
    tweet: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Tweet", tweetSchema);