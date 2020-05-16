const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", function() {
    console.log("Connection Succeeded");
});

require('../routes/fat-data-routes')(app);

app.use(function (err, req, res, next) {
    res.status(404).send({
        success: false,
        message: 'Resource not found'
    });
});

const port = process.env.PORT || 3001;
app.listen(port, function() {
    console.log('Listening on port ' + port);
});
