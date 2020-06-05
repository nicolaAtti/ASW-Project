const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTokensSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    tokens: [String]
});

const userTokens = mongoose.model("users-tokens", userTokensSchema);
module.exports = userTokens;
