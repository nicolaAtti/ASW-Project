const jsonwebtoken = require('jsonwebtoken');
const axios = require('axios');
const FatData = require("../models/fat-data");
const JWT_SECRET = process.env.JWT_SECRET

module.exports = function(app) {
    app.post('/users/:username/fat', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                const fatData = new FatData({
                    username: req.params.username,
                    timestamp: req.body.timestamp,
                    weight: req.body.weight
                });
                axios.get(process.env.USER_SERVICE_URL + decodedJwt.username, { 'headers': { 'Authorization': req.header('Authorization') } })
                    .then(userResult => {
                        if (userResult.data.height) {
                            fatData.bmi = (req.body.weight / (userResult.data.height * userResult.data.height)).toFixed(2);
                        }
                        fatData.save(function (error) {
                            if (error) {
                                if (error instanceof mongoose.Error.ValidationError) {
                                    res.status(400).send({
                                        success: false,
                                        message: 'Wrong parameters'
                                    })
                                } else {
                                    res.status(500).send({
                                        success: false,
                                        message: 'Failed to save fat data'
                                    })
                                }
                            } else {
                                res.status(201).send({
                                    success: true,
                                    message: 'Fat data successfully created'
                                })
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({
                            success: false,
                            message: 'Failed to save fat data'
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

    app.delete('/users/:username/fat', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                FatData.deleteMany({ username: decodedJwt.username }, function (error, result) {
                    if (error || result === null) {
                        res.status(404).send({
                            success: false,
                            message: 'Already deleted'
                        });
                    } else {
                        res.send({
                            success: true,
                            message: 'User fat data successfully deleted'
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

    app.get('/users/:username/fat', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                FatData.find({ username: decodedJwt.username }, { _id: 0, __v: 0 }, function (error, result) {
                    if (result === null) {
                        res.send({
                            success: true,
                            message: 'No fat data found'
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

    app.get('/users/:username/fat/latest', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                FatData.findOne({ username: decodedJwt.username }, { _id: 0, __v: 0 }, { sort: { 'timestamp' : -1 } }, function (error, result) {
                    if (result === null) {
                        res.send({
                            success: true,
                            message: 'No fat data found'
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
}