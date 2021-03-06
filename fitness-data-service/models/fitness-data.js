const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fitnessDataSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    hearthRate: Number,
    steps: Number,
    caloriesBurned: Number,
    position: {
        type: Map,
        altitude: Number,
        latitude: Number,
        longitude: Number
    }
});

const fitnessData = mongoose.model("fitness-data", fitnessDataSchema);
module.exports = fitnessData;