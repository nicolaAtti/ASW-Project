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
    achievements: [String],
    avatar: {
        data: Buffer,
        contentType: String
    }
});

const users = mongoose.model("users", usersSchema);
module.exports.model = users;

module.exports.age = function(birthday) {
    const diff_ms = Date.now() - birthday;
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
