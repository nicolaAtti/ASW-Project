const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
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
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        unique: true,
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
    achievements: [[String]],
    avatar: {
        data: Buffer,
        contentType: String
    }
});

const users = mongoose.model("users", usersSchema);
module.exports = users;