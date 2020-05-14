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
        altitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    trainingSessionId: String
});

const fitnessData = mongoose.model("fitness-data", fitnessDataSchema);
module.exports = fitnessData;