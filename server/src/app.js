const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require("../models/users");
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
                message: 'User successfully created'
            })
        }
    });
});

app.patch('/users/:username', (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
        if (req.params.username === decodedJwt.username) {
            User.findByIdAndUpdate(decodedJwt.username, req.body,function (error, result) {
                if (error || result === null) {
                    res.status(404).send({
                        success: false,
                        message: 'Resource not found'
                    });
                } else {
                    res.send({
                        success: true,
                        message: 'User successfully updated'
                    });
                }
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Wrong token'
            });
        }
    } catch (e) {
        console.log(e);
        res.status(401).send({
            success: false,
            message: 'Invalid token'
        });
    }
});

app.get('/users/:username/authentication', (req, res) => {
    User.findById(req.params.username,function (error, result) {
        if (error || result === null) {
            res.status(404).send({
                success: false,
                message: 'Resource not found'
            });
        } else {
            if (req.body.password === result.password) {
                const token = jsonwebtoken.sign({ username: req.params.username, email: result.email }, JWT_SECRET);
                res.send({
                    success: true,
                    token: token
                });
            } else {
                res.status(401).send({
                    success: false,
                    message: 'Wrong password'
                });
            }
        }
    })
});

app.get('/users/:username', (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
        if (req.params.username === decodedJwt.username) {
            User.findById(decodedJwt.username, function (error, result) {
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
                        registrationDate: result.registrationDate
                    });
                }
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Wrong token'
            });
        }
    } catch (e) {
        res.status(401).send({
            success: false,
            message: 'Invalid token'
        });
    }
});

app.get('/users/:username/achievements', (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
        if (req.params.username === decodedJwt.username) {
            User.findById(decodedJwt.username, function (error, result) {
                if (error || result === null) {
                    res.status(404).send({
                        success: false,
                        message: 'Resource not found'
                    });
                } else {
                    res.send({
                        achievements: result.achievements
                    });
                }
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Wrong token'
            });
        }
    } catch (e) {
        res.status(401).send({
            success: false,
            message: 'Invalid token'
        });
    }
});

app.use(function (err, req, res, next) {
    res.status(404).send({
        success: false,
        message: 'Resource not found'
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
});