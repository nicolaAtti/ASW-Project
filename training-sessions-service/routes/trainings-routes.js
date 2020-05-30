const jsonwebtoken = require('jsonwebtoken');
const training = require("../models/training-data");
const Training = training.model;
const JWT_SECRET = process.env.JWT_SECRET;
const axios = require('axios');

module.exports = function(app) {
    app.post('/users/:username/training_sessions/:sessionId', (req, res) => {
        const training = new Training({
            username: req.params.username,
            sessionId: req.params.sessionId,
            startTime: new Date(),
            endTime: new Date(),
            caloriesBurned: req.body.caloriesBurned,
            avgHeartRate: req.body.avgHeartRate,
            kilometers: req.body.kilometers,
            steps: req.body.steps,
            avgAltitude: req.body.avgAltitude,
            avgSpeed: req.body.avgSpeed,
            maxSpeed: req.body.maxSpeed
        });

        training.save(function (error) {
            if (error) {
                if (error.code === 11000) {
                    res.status(409).send({
                        success: false,
                        message: 'SessionId already present'
                    })
                } else {
                    if (error.name === "ValidationError") {
                        res.status(400).send({
                            success: false,
                            message: 'Wrong parameters'
                        })
                    } else {
                        res.status(500).send({
                            success: false,
                            message: 'Failed to save training'
                        })
                    }
                }
            } else {
                res.status(201).send({
                    success: true,
                    message: 'Training successfully created'
                })
            }
        });
    });

    app.delete('/users/:username/training_sessions/:sessionId', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.sessionId === decodedJwt.sessionId) {
                Training.findOneAndDelete({ sessionId: decodedJwt.sessionId }, function (error, result) {
                    if (error || result === null) {
                        res.status(404).send({
                            success: false,
                            message: 'Already deleted'
                        });
                    } else {
                        res.send({
                            success: true,
                            message: 'Training successfully deleted'
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

    app.get('/users/:username/training_session', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                Training.find({ username: decodedJwt.username }, { _id: 0, __v: 0 }, function (error, result) {
                    if (result === null) {
                        res.send({
                            success: true,
                            message: 'No training data found'
                        });
                    } else {
                        res.send(result);
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

    app.get('/users/:username/training_session/latest', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                Training.findOne({ username: decodedJwt.username }, { _id: 0, __v: 0 }, { sort: { 'startTime' : -1 } }, function (error, result) {
                    if (result === null) {
                        res.send({
                            success: true,
                            message: 'No training data found'
                        });
                    } else {
                        res.send(result);
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

    app.get('/history-trainings', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (decodedJwt.username === 'Admin') {
                axios.get(process.env.USER_SERVICE_URL + '/users-ages', { 'headers': { 'Authorization': req.header('Authorization') } })
                    .then(usersAges => {
                        Training.find({}, 'username startTime', function (error, result) {
                            const today = new Date();
                            const year = today.getFullYear();
                            console.log(result.map(entry => {
                                return {
                                    month: entry.startTime <= new Date(year, 1) ? 1 : entry.startTime.getMonth() + 1,
                                    age: usersAges.data[entry.username]
                                };
                            }));
                            res.send({ "ciao": 5 });
                        })
                    });
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
}
