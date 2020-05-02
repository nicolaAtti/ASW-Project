var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    height: Number,
    email: {
        type: String,
        required: true,
        unique: true
    },
    _id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    publicAchievements: {
        type: Boolean,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true
    },
    achievements: [[String]]
});

var users = mongoose.model("users", usersSchema);
module.exports = users;