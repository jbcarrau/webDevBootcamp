var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
    username: String, 
    password: String
});

UserSchema.plugin(passportLocalMongoose); //It will add a bunch of methods that come with that package to our user schema.

module.exports = mongoose.model("user", UserSchema);