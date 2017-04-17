var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    user: {
        firstname: String,
        lastname: String,
        location: String,
        birthday: String,
        email: String,
        image: {type: String, default: "/images/blank-profile.png"},
        /* bgImage: type: String, 
        to be used on profile page eventually */
        description: String
    },
    username: String,
    passport: String,
    joinDate: {type: Date, default: Date.now},
    meta: {
        tweets: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        followers: {type: Number, default: 0},
        following: {type: Number, default: 0},
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);