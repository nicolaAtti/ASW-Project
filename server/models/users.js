var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    name: String,
    surname: String,
    birthday: Date,
    gender: String,
    height: Number,
    email: String,
    _id: String,
    password: String,
    publicAchievements: Boolean,
    registrationDate: Date,
    achievements: []
});

var users = mongoose.model("users", usersSchema);
module.exports = users;