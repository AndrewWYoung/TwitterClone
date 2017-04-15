"use strict";

const router = require("express").Router();

// SHOW /signup - Show new user signup form
router.get("/signup", function(req, res){
    res.render("user/signup");
});

// CREATE /signup - Create new user, Log user in, then redirect
router.post("/signup", function(req, res){
    // Needs Auth & DB model made before page can work
    res.send("Signup form under construction");

});

module.exports = router;