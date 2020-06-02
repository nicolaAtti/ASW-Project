const jsonwebtoken = require('jsonwebtoken');
const training = require("../models/training-data");
const Training = training.model;
const JWT_SECRET = process.env.JWT_SECRET;
const axios = require('axios');

module.exports = function(app) {
    app.post('/users/:username/training_sessions', (req, res) => {
        const training = new Training({
            username: req.params.username,
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
            } else {
                checkTotalCalories(req.params.username,req.body.firebaseUserToken);
                checkTrainingCalories(req.params.username,req.body.firebaseUserToken,req.body.caloriesBurned);

                res.status(201).send({
                    success: true,
                    message: 'Training successfully created'
                })
            }
        });
    });

    app.delete('/users/:username/training_sessions', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                Training.deleteMany({ username: decodedJwt.username }, function (error, result) {
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
}


async function checkTotalCalories(username,firebaseToken) {
    const result = await Training.aggregate([{
        $match: {username: username},
    }, {
        $group: {
            _id: null,
            total: {
                $sum: "$caloriesBurned"
            }
        }
    }]);
    if(result[0].total >= 20000){
        const notificationBody = {
            "achievementFileName": "ItsGettingHotInHere",
            "achievementTitle": "It's getting hot in here",
            "firebaseUserToken": firebaseToken
        };
        axios.patch(process.env.USER_SERVICE_URL+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
    if(result[0].total >= 50000){
        const notificationBody = {
            "achievementFileName": "HotStuff",
            "achievementTitle": "Hot Stuff",
            "firebaseUserToken": firebaseToken
        };
        axios.patch(process.env.USER_SERVICE_URL+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
    if(result[0].total >= 100000){
        const notificationBody = {
            "achievementFileName": "GrosslyIncandescent",
            "achievementTitle": "Grossly Incandescent",
            "firebaseUserToken": firebaseToken
        };
        axios.patch(process.env.USER_SERVICE_URL+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
}

function checkTrainingCalories(username,firebaseToken,calories) {
    if(calories >= 200){
        const notificationBody = {
            "achievementFileName": "OnLowFlame",
            "achievementTitle": "On low flame",
            "firebaseUserToken": firebaseToken
        };
        axios.patch(process.env.USER_SERVICE_URL+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
    if(calories >= 500){
        const notificationBody = {
            "achievementFileName": "BurnItBaby",
            "achievementTitle": "Burn it baby",
            "firebaseUserToken": firebaseToken
        };
        axios.patch(process.env.USER_SERVICE_URL+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
    if(calories >= 1000){
        const notificationBody = {
            "achievementFileName": "Flambe",
            "achievementTitle": "Flambé",
            "firebaseUserToken": firebaseToken
        };
        axios.patch(process.env.USER_SERVICE_URL+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }

}
