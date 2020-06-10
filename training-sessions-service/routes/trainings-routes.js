const jsonwebtoken = require('jsonwebtoken');
const training = require("../models/training-data");
const Training = training.model;
const JWT_SECRET = process.env.JWT_SECRET;
const axios = require('axios');

module.exports = function(app) {
    app.post('/users/:username/training_sessions', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                const training = new Training({
                    username: req.params.username,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
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
                        res.status(201).send({
                            success: true,
                            message: 'Training successfully created'
                        });
                        const notificationBody = {
                            "achievementFileName": "WayToGo",
                            "achievementTitle": "Way to go",
                        };
                        axios.patch(process.env.USER_SERVICE_URL + '/users/' + req.params.username + '/achievement', notificationBody, {headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
                            console.log("Achievement awarded " + response)
                        }).catch(error => {
                            console.log("Achievement not awarded " + error)
                        });
                        checkContinuity(req.params.username);
                        checkTotalCalories(req.params.username);
                        checkTrainingCalories(req.params.username, req.body.caloriesBurned);
                        checkTotalSteps(req.params.username);
                    }
                });
            }
        } catch (e) {
            res.status(401).send({
                success: false,
                message: 'Invalid token'
            });
        }
    });

    app.delete('/users/:username/training_sessions', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                Training.deleteMany({ username: decodedJwt.username }, function (error, result) {
                    if (error) {
                        res.status(500).send({
                            success: false,
                            message: 'Internal server error'
                        });
                    } else {
                        if (result === null) {
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
                    if (error) {
                        res.status(500).send({
                            success: false,
                            message: 'Internal server error'
                        });
                    } else {
                        if (result === null || result === []) {
                            res.status(404).send({
                                success: false,
                                message: 'No training data found'
                            });
                        } else {
                            res.send(result);
                        }
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
                    if (error) {
                        res.status(500).send({
                            success: false,
                            message: 'Internal server error'
                        });
                    } else {
                        if (result === null) {
                            res.status(404).send({
                                success: false,
                                message: 'No training data found'
                            });
                        } else {
                            res.send(result);
                        }
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
};


async function checkTotalCalories(username) {
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
        };
        axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
    if(result[0].total >= 50000){
        const notificationBody = {
            "achievementFileName": "HotStuff",
            "achievementTitle": "Hot Stuff",
        };
        axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
    if(result[0].total >= 100000){
        const notificationBody = {
            "achievementFileName": "GrosslyIncandescent",
            "achievementTitle": "Grossly Incandescent"
        };
        axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
}

function checkTrainingCalories(username,calories) {
    if(calories >= 200){
        const notificationBody = {
            "achievementFileName": "OnLowFlame",
            "achievementTitle": "On low flame"
        };
        axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
    if(calories >= 500){
        const notificationBody = {
            "achievementFileName": "BurnItBaby",
            "achievementTitle": "Burn it baby"
        };
        axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
    if(calories >= 1000){
        const notificationBody = {
            "achievementFileName": "Flambe",
            "achievementTitle": "Flambé"
        };
        axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }

}

async function checkTotalSteps(username) {
    const result = await Training.aggregate([{
        $match: {username: username},
    }, {
        $group: {
            _id: null,
            total: {
                $sum: "$steps"
            }
        }
    }]);
    if(result[0].total >= 50000){
        const notificationBody = {
            "achievementFileName": "ASmallStepForMan",
            "achievementTitle": "A small step for man..."
        };
        axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
    if(result[0].total >= 100000){
        const notificationBody = {
            "achievementFileName": "WalkItOff",
            "achievementTitle": "Walk it off"
        };
        axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
    if(result[0].total >= 500000){
        const notificationBody = {
            "achievementFileName": "MarathonReady",
            "achievementTitle": "Marathon Ready"
        };
        axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
            console.log("Achievement awarded "+response)
        }).catch(error => {
            console.log("Achievement not awarded "+error)
        });
    }
}

function checkContinuity(username) {
    Training.find({ username: username }, { _id: 0, __v: 0 }, function (error, result) {
        if (result === null || result === []) {
            console.log("No training data found")
        } else {
            const trainingDateList = result.map(entry => { return entry.startTime});
            let counter = 0;
            if(trainingDateList.length > 1){
                for(let i=0; i<trainingDateList.length-2;i++) {
                    var examined = new Date();
                    examined.setDate(trainingDateList[i].getDate()+1);
                    var examined2 = new Date();
                    examined2.setDate(trainingDateList[i].getDate()+2);
                    var next = new Date(trainingDateList[i+1]);
                    if (examined.getDay() === next.getDay() || examined2.getDay() === next.getDay()) {
                        counter++;
                        if(counter > 5 && counter < 10){
                            const notificationBody = {
                                "achievementFileName": "SlowAndSteady",
                                "achievementTitle": "Slow and steady"
                            };
                            axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
                                console.log("Achievement awarded "+response)
                            }).catch(error => {
                                console.log("Achievement not awarded "+error)
                            });
                        }
                        if(counter > 10 && counter < 22){
                            const notificationBody = {
                                "achievementFileName": "KickIntoGear",
                                "achievementTitle": "Kick into gear"
                            };
                            axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
                                console.log("Achievement awarded "+response)
                            }).catch(error => {
                                console.log("Achievement not awarded "+error)
                            });
                        }
                        if(counter > 22){
                            const notificationBody = {
                                "achievementFileName": "ForceOfHabit",
                                "achievementTitle": "Force of habit"
                            };
                            axios.patch(process.env.USER_SERVICE_URL+'/users/'+username+'/achievement',notificationBody,{headers: {Authorization: process.env.ACHIEVEMENT_TOKEN}}).then(response => {
                                console.log("Achievement awarded "+response)
                            }).catch(error => {
                                console.log("Achievement not awarded "+error)
                            });
                        }
                    }else{
                        counter = 0;
                    }
                }
            }
        }
    }).limit(30);
}

