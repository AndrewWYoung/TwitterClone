"use strict";

const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user.js");

router.use(require("body-parser").urlencoded({ extended: true }));

// SHOW /register - Show new user signup form
router.get("/register", function(req, res){
    res.render("user/signup");
});

// CREATE /signup - Create new user, Log user in, then redirect
router.post("/register", function(req, res){

    // Correct Birthday to format that is easy to read
    var mydate = new Date(req.body.birthday);
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"][mydate.getMonth()];
    var usersBirthday = month + " " + mydate.getDate() + ", " + mydate.getFullYear();

    var newUser = new User(
        {
            user: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                location: req.body.location,
                birthday: usersBirthday,
                email: req.body.email,
                description: "Hello World, I'm glad to be here."
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
            // Show profile page & send profile variable for EJS
            res.render("user/profile.ejs", { profile: user });
        }
    });
});

/*
// Check if loggedin MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
} */

module.exports = router;