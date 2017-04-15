const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    routes = require("./routes"),
    PORT = 3001,
    seedDB = require("./seeds");

/* configure server */
mongoose.connect("mongodb://localhost/twitter_clone_v3");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

/* seed database with sample tweets */
seedDB();

/* add our routes */
app.use('/', routes);

// INDEX - show all tweets 
app.get("/tweets", function(req, res) {
    // Get all tweets from DB
    Tweet.find({}, function(err, allTweets) {
        if (err) {
            console.log(err);
        } else {
            // Sort tweets by most recent showing first
            allTweets.sort(function(a, b) { 
                return (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0); 
            });
            res.render("index", { tweets: allTweets });
        }
    });
})

// CREATE - add new tweet to DB 
app.post("/tweets", function(req, res) {
    // get data from form and add to tweets array 
    var name = req.body.name;
    var image = twitterIcon;
    var tweet = req.body.tweet;
    var newTweet = { name: name, image: image, tweet: tweet };
    // Create a new tweet and save it to DB 
    Tweet.create(newTweet, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to tweets page 
            res.redirect("/tweets");
        }
    });
});

// SHOW /signup - Show new user signup form
app.get('/signup', function(req, res){
    res.render('user/signup');
});

// CREATE /signup - Create new user, Log user in, then redirect
app.post('/signup', function(req, res){
    // Needs Auth & DB model made before page can work
    res.send('Signup form under construction');

});

// NEW - as of now, since the tweet form is already on the home page, there's no need to create a route to get to the form
// if interested, the code would simply look like the following:
//
// app.get("/tweets/new", function(req, res){
//    res.render("new.ejs"); 
// });

// SHOW - as of now, no additional detail of the tweets are being implemented.
// if interested, the code would simply look like the following:
//
// app.get("/tweets/:id", function(req, res){
//     //find the tweet with provided ID
//     Tweet.findById(req.params.id, function(err, foundTweet){
//         if(err){
//             console.log(err);
//         } else {
//             //render show template with that tweet
//             res.render("show", {tweet: foundTweet});
//         }
//     });
// })

// setup server for localhost on port 3001
app.listen(PORT, 'localhost', function() {
    console.log(`Twitter Clone Server Started on port ${PORT}`);
});