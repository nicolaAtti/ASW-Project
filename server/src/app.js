const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require("../models/users");

dotenv.config();
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", function(callback){
    console.log("Connection Succeeded");
});

app.post('/users/:username', (req, res) => {
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        birthday: req.body.birthday,
        gender: req.body.gender,
        height: req.body.height,
        email: req.body.email,
        _id: req.params.username,
        password: req.body.password,
        publicAchievements: req.body.publicAchievements,
        registrationDate: new Date(),
        achievements: []
    });

    user.save(function (error) {
        if (error) {
            if (error.code === 11000) {
                res.status(409).send({
                    success: false,
                    message: 'Username or email already present'
                })
            } else {
                if (error instanceof mongoose.Error.ValidationError) {
                    res.status(400).send({
                        success: false,
                        message: 'Wrong parameters'
                    })
                } else {
                    console.log(error)
                    res.status(500).send({
                        success: false,
                        message: 'Failed to save user'
                    })
                }
            }
        } else {
            res.status(201).send({
                success: true,
                message: 'User creation successfully done'
            })
        }
    });
});

app.get('/users/:username', (req, res) => {
    User.findById(req.params.username,function (error, result) {
        if (error || result === null) {
            res.status(404).send({
                success: false,
                message: 'Resource not found'
            });
        } else {
            res.send({
                username: result.id,
                name: result.name,
                surname: result.surname,
                birthday: result.birthday,
                gender: result.gender,
                height: result.height,
                email: result.email,
                publicAchievements: result.publicAchievements,
                registrationDate: result.registrationDate,
                achievements: result.achievements
            });
        }
    })
});

app.use(function (req, res, next) {
    res.status(404).send({
        success: false,
        message: 'Resource not found'
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
});