"use strict";

const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user.js");
const Tweet = require("../models/tweet.js");

router.use(require("body-parser").urlencoded({ extended: true }));

// SHOW /register - Show new user signup form
router.get("/register", function(req, res){
    res.render("user/signup");
});

// CREATE /signup - Create new user, Log user in, then redirect
router.post("/register", function(req, res){

    var newUser = new User(
        {
            user: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                location: req.body.location,
                birthday: req.body.birthday,
                email: req.body.email,
                description: ""
            },
            username: req.body.username
        });

    User.register(newUser, req.body.password, function(err){
        if(err){
            console.log(err);
            return res.render("user/signup");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/tweets");
        });
    });
});

// LOGIN SHOW PAGE
router.get("/login", function(req, res){
    res.render("user/login");
});

// LOGIN-> POST ROUTE AUTHENTICATION
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/tweets",
        failureRedirect: "/login"
    }), function(){
    }
);

// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// /username PROFILE ROUTE
router.get("/:username", function(req, res) {
    User.findOne({ username: req.params.username }, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/tweets"); // No profile/Error redirect to /tweets page
        } else {
            if(user){
                Tweet.find({user: {id: user._id, username: req.params.username}}, function(err, allTweets){
                    if(err){
                        console.log(err);
                        res.redirect("/tweets");
                    } else {
                        // Show profile page & send profile variable for EJS
                        // Sort tweets by date
                        allTweets.sort(function(a, b) { return (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0); });
                        res.render("user/profile.ejs", { profile: user, birthday: readableBday(user.user.birthday), tweets: allTweets});
                    }
                });
                
            } else {
                res.redirect("/tweets");
            }
        }
    });
});

// UPDATE route for user
router.put("/:username", isLoggedIn, function(req, res){
    if(res.locals.currentUser.username == req.params.username){
        // Current Logged In user is the same as the profile being edited
        User.findOne({username: req.params.username}, function(err, profile){
            if(err){
                console.log(err);
                res.redirect("/tweets");
            } else {
                profile.user.firstname      = req.body.firstname;
                profile.user.lastname       = req.body.lastname;
                profile.user.description    = req.body.description;
                profile.user.location       = req.body.location;
                profile.user.image          = req.body.image;
                profile.user.birthday       = req.body.birthday;

                profile.save(function(err){
                    if(err){
                        // Couldn't save the profile
                        console.log(err);
                        res.redirect("/tweets");
                    } else {
                        // Profile Updated & Saved successfully
                        res.redirect("/" + req.params.username);
                    }
                });
            }
        });
    } else {
        // Current Logged in user is not the same as the profile being edited
        // Add better error handling later
        console.log("ERROR: Current logged in user is NOT the same as the profile being edited!");
        res.redirect("/tweets");
    }
});


// Translate Birthday date into readable birthday
function readableBday(birthday){
    var myDate = new Date(birthday);
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"][myDate.getMonth()];
    var usersBirthday = month + " " + (myDate.getDate()+1) + ", " + myDate.getFullYear();
    return usersBirthday;
}


// Check if loggedin MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
} 

module.exports = router;