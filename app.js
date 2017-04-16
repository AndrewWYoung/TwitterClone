const express               = require("express"),
    LocalStrategy           = require("passport-local"),
    //passportLocalMongoose   = require("passport-local-mongoose"),
    passport                = require("passport"),
    methodOverride          = require("method-override"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    routes                  = require("./routes"),
    User                    = require("./models/user"),
    PORT                    = 3001,
    seedDB                  = require("./seeds"),
    app                     = express();

/* configure server */
mongoose.connect("mongodb://localhost/twitter_clone_v3");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); // Must use _method to use alternative routes such as DELETE & PUT

app.use(require("express-session")({
    secret: "Twitter Clone Secret Login Strategy",
    resave: false,
    saveUnitialized: false
}));

// Setup Passportjs Auth
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to include user information
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

/* seed database with sample tweets */
seedDB();

/* add our routes */
app.use("/", routes);

// setup server for localhost on port 3001
app.listen(PORT, "localhost", function() {
    console.log(`Twitter Clone Server Started on port ${PORT}`);
});