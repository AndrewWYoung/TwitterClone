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
app.use("/", routes);

// setup server for localhost on port 3001
app.listen(PORT, "localhost", function() {
    console.log(`Twitter Clone Server Started on port ${PORT}`);
});