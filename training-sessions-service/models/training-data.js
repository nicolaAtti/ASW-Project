const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainingsSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    caloriesBurned: Number,
    avgHeartRate: Number,
    kilometers: Number,
    steps: Number,
    avgAltitude: Number,
    avgSpeed: Number,
    maxSpeed: Number
});

const trainingData = mongoose.model("training-data", trainingsSchema);
module.exports.model = trainingData;