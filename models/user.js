var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    passport: String,
    email: String,
    userimage: String,
    description: String,
    date: {type: Date, default: Date.now},
    meta: {
        likes: {type: Number, default: 0},
        followers: {type: Number, default: 0},
        following: {type: Number, default: 0},
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);