var mongoose    = require("mongoose");

var userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
});


module.exports = mongoose.model("user", userSchema);