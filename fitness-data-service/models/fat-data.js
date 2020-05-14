const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fatDataSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    bmi: Number
});

const fatData = mongoose.model("fat-data", fatDataSchema);
module.exports = fatData;