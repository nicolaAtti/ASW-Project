const jsonwebtoken = require('jsonwebtoken');
const FitnessData = require("../models/fitness-data");
const JWT_SECRET = process.env.JWT_SECRET

module.exports = function(app) {
    app.post('/users/:username/fitness', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                const fitnessData = new FitnessData({
                    username: req.params.username,
                    timestamp: req.body.timestamp,
                    hearthRate: req.body.hearthRate,
                    steps: req.body.steps,
                    caloriesBurned: req.body.caloriesBurned,
                    position: req.body.position,
                    trainingSessionId: req.body.trainingSessionId
                });
                fitnessData.save(function (error) {
                    if (error) {
                        if (error instanceof mongoose.Error.ValidationError) {
                            res.status(400).send({
                                success: false,
                                message: 'Wrong parameters'
                            })
                        } else {
                            res.status(500).send({
                                success: false,
                                message: 'Failed to save fitness data'
                            })
                        }
                    } else {
                        res.status(201).send({
                            success: true,
                            message: 'Fitness data successfully created'
                        })
                    }
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

    app.delete('/users/:username/fitness', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                FitnessData.deleteMany({ username: decodedJwt.username }, function (error, result) {
                    if (error || result === null) {
                        res.status(404).send({
                            success: false,
                            message: 'Already deleted'
                        });
                    } else {
                        res.send({
                            success: true,
                            message: 'User fitness data successfully deleted'
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

    app.get('/users/:username/fitness', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                FitnessData.find({ username: decodedJwt.username }, { _id: 0, __v: 0 }, function (error, result) {
                    if (result === null) {
                        res.send({
                            success: true,
                            message: 'No fitness data found'
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