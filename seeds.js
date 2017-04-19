const Tweet = require("./models/tweet");
const User = require("./models/user");
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

// Default password for admin will be freecodecamp
var defaultPassword = "freecodecamp";
var defaultAdmin = {
    user: {
        firstname: "Admin",
        lastname: "Admin",
        location: "USA",
        birthday: "05-20-1960",
        email: "admin@admin.com",
        description: "Thanks for visiting my site! Hope you like it!"
    },
    username: "admin"
};

function seedDB() {
    removeAllTweets();
    createTweets();
}

function createTweets(){
    data.forEach(function(seed){
        // Find user with the username for the seeded Tweet
        console.log("searching for " + seed.user.username);
        User.findOne({username: seed.user.username}, function(err, profile){
            if(err){
                console.error(err);
            } else {
                if(profile == null){
                    // if No user found in DB, create one using default information!
                    User.register(defaultAdmin, defaultPassword, function(err, profile){
                        if(err){
                            console.log("Admin account not found, but error creating one!");
                        } else {
                            if(profile){
                                console.log("Default Admin account registered!");
                                seed.user.id = profile.user._id;
                                Tweet.create(seed, function(err, tweet){
                                    if(err){
                                        console.error(err);
                                    } else {
                                        console.log("Added tweet by " + tweet.user.username);
                                    }
                                });
                            }  
                        }
                    });
                } else {
                    seed.user.id = profile.user._id;
                    Tweet.create(seed, function(err, tweet){
                        if(err){
                            console.error(err);
                        } else {
                            console.log("Added tweet by " + tweet.user.username);
                        }
                    });
                }
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