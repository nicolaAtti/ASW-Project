const axios = require('axios');
const jsonwebtoken = require('jsonwebtoken');
const user = require("../models/users");
const User = user.model;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(app) {
    app.post('/users/:username', (req, res) => {

        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            birthday: req.body.birthday,
            gender: req.body.gender,
            height: req.body.height,
            email: req.body.email,
            username: req.params.username,
            password: req.body.password,
            publicAchievements: req.body.publicAchievements,
            registrationDate: new Date(),
            achievements: ['NewBlood']
        });

        user.save(function (error) {
            if (error) {
                if (error.code === 11000) {
                    res.status(409).send({
                        success: false,
                        message: 'Username or email already present'
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
                            message: 'Failed to save user'
                        })
                    }
                }
            } else {
                res.status(201).send({
                    success: true,
                    message: 'User successfully created'
                })
                const notificationPayload = {
                    notification: {
                        title: "Achievement Earned!",
                        body: "Congratulations! You earned the achievement New Blood!",
                        icon: "party_icon.png"
                    },
                    to: req.body.firebaseUserToken
                };
                axios.post("https://fcm.googleapis.com/fcm/send", notificationPayload, {
                    headers: {
                        Authorization: "key=" + process.env.FIREBASE_SENDER_TOKEN,
                        'Content-Type': "application/json"
                    }
                }).then(() => {
                    console.log("Achievement request executed successfully");
                }).catch(error => {
                    console.log("Error in reaching firebase server. " + error);
                });
            }
        });
    });

    app.patch('/users/:username/achievement', (req, res) => {
        if (req.header('Authorization') === process.env.ACHIEVEMENT_TOKEN) {
            const achievementFileName = req.body.achievementFileName;
            const achievementTitle = req.body.achievementTitle;
            const username = req.params.username;

            User.findOneAndUpdate({username: username, achievements: {$nin: [achievementFileName]}}, {$push: {achievements: achievementFileName}}, function (error,result) {
                if (error) {
                    if (error.code === 11000) {
                        res.status(409).send({
                            success: false,
                            message: 'Achievement already present'
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
                                message: 'Failed to save achievement'
                            })
                        }
                    }
                } else {
                    if (result === null) {
                        res.status(404).send({
                            success: false,
                            message: 'Username not found'
                        });
                    } else {
                        res.send({
                            success: true,
                            message: 'Achievement successfully assigned'
                        });
                        axios.get(process.env.NOTIFICATION_SERVICE_URL+username+'/notification-token',{headers: { Authorization: process.env.NOTIFICATION_TOKEN}}).then(response => {
                            response.data.tokens.forEach(token => {
                                const notificationPayload = {
                                    notification: {
                                        title: "Achievement Earned!",
                                        body: "Congratulations! You earned the achievement "+achievementTitle+" !",
                                        icon: "party_icon.png"
                                    },
                                    to: token
                                };
                                axios.post("https://fcm.googleapis.com/fcm/send", notificationPayload,{headers: { Authorization: "key="+process.env.FIREBASE_SENDER_TOKEN, 'Content-Type': "application/json"}}).then(() => {
                                    console.log("Notification successfully sent");
                                }).catch(error => {
                                    console.log("Error in sending notification. " + error);
                                })
                            })
                        }).catch(error => {
                            console.log("Error in getting tokens " + error);
                        });
                    }
                }
            });
        } else {
            res.status(401).send({
                success: false,
                message: 'Wrong token'
            });
        }
    });

    app.patch('/users/:username', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                User.findOneAndUpdate({ username: decodedJwt.username }, req.body, function (error, result) {
                    if (error) {
                        if (error.code === 11000) {
                            res.status(409).send({
                                success: false,
                                message: 'Username or email already present'
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
                                    message: 'Failed to save user'
                                })
                            }
                        }
                    } else {
                        if (result === null) {
                            res.status(404).send({
                                success: false,
                                message: 'Username not found'
                            });
                        } else {
                            if (req.body.username) {
                                const token = jsonwebtoken.sign({ username: req.body.username }, JWT_SECRET);
                                res.send({
                                    success: true,
                                    newToken: token
                                });
                            } else {
                                res.send({
                                    success: true,
                                    message: 'User successfully updated'
                                });
                            }
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

    app.delete('/users/:username', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                User.findOneAndDelete({ username: decodedJwt.username }, function (error, result) {
                    if (error) {
                        if (result === null) {
                            res.status(404).send({
                                success: false,
                                message: 'Already deleted'
                            });
                        } else {
                            res.status(500).send({
                                success: false,
                                message: 'Internal server error'
                            });
                        }
                    } else {
                        res.send({
                            success: true,
                            message: 'User successfully deleted'
                        });
                        axios.delete(process.env.NOTIFICATION_SERVICE_URL + req.params.username + '/notification-token/all', {headers: {Authorization: process.env.NOTIFICATION_TOKEN}}).then(response => {
                            console.log("All tokens successfully removed")
                        }).catch(error => {
                            console.log("Error in deleting tokens "+error)
                        });
                        //remove training datas
                        axios.delete(process.env.TRAINING_SERVICE_URL + req.params.username + '/training_sessions', {headers: {Authorization: req.header('Authorization')}}).then(response => {
                            console.log("All training sessions successfully removed")
                        }).catch(error => {
                            console.log("Error in deleting training sessions "+error)
                        });
                        //fitness
                        axios.delete(process.env.FITNESS_SERVICE_URL + req.params.username + '/fitness', {headers: {Authorization: req.header('Authorization')}}).then(response => {
                            console.log("All fitness data successfully removed")
                        }).catch(error => {
                            console.log("Error in deleting  "+error)
                        });
                        //fat
                        axios.delete(process.env.FITNESS_SERVICE_URL + req.params.username + '/fat', {headers: {Authorization: req.header('Authorization')}}).then(response => {
                            console.log("All fat datas successfully removed")
                        }).catch(error => {
                            console.log("Error in deleting fat datas "+error)
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

    app.post('/users/:username/authentication', (req, res) => {
        User.findOne({ username: req.params.username }, function (error, result) {
            if (error || result === null) {
                if (result === null) {
                    res.status(404).send({
                        success: false,
                        message: 'Already deleted'
                    });
                } else {
                    res.status(500).send({
                        success: false,
                        message: 'Internal server error'
                    });
                }
            } else {
                if (req.body.password === result.password) {
                    const token = jsonwebtoken.sign({ username: req.params.username }, JWT_SECRET);

                    res.status(201).send({
                        success: true,
                        token: token
                    })

                    const registrationDate = result.registrationDate;
                    const today = new Date();
                    const daysDiff = Math.ceil(Math.abs(today - registrationDate) / (1000*60*60*24));
                    var achievementFileName;
                    var achievementTitle;

                    //Post firebaseToken
                    console.log("Firebase    "+req.body.firebaseUserToken);
                    axios.post(process.env.NOTIFICATION_SERVICE_URL+req.params.username+'/notification-token', {firebaseUserToken: req.body.firebaseUserToken},{headers: { Authorization: process.env.NOTIFICATION_TOKEN}}).then(response => {
                        console.log("New token added")
                        if(daysDiff >= 180 && daysDiff < 365){
                            achievementFileName = "AToastToUs";
                            achievementTitle = "A toast to us";
                        }
                        if(daysDiff >= 365) {
                            achievementFileName = "AYearWithUs";
                            achievementTitle = "A year with us";
                        }
                        if(achievementFileName !== undefined && achievementTitle !== undefined) {
                            User.findOneAndUpdate({
                                username: req.params.username,
                                achievements: {$nin: [achievementFileName]}
                            }, {$push: {achievements: achievementFileName}}, function (error, result) {
                                if (error) {
                                    if (error.code === 11000) {
                                        console.log("Failed to add achievement")
                                    } else {
                                        if (error.name === "ValidationError") {
                                            console.log("Failed to add achievement")
                                        } else {
                                            console.log("Failed to add achievement")
                                        }
                                    }
                                } else {
                                    if (result === null) {
                                        console.log("Achievement already awarded")
                                    } else {
                                        const notificationPayload = {
                                            notification: {
                                                title: "Achievement Earned!",
                                                body: "Congratulations! You earned the achievement " + achievementTitle + " !",
                                                icon: "party_icon.png"
                                            },
                                            to: req.body.firebaseUserToken
                                        };
                                        axios.post("https://fcm.googleapis.com/fcm/send", notificationPayload, {
                                            headers: {
                                                Authorization: "key=" + process.env.FIREBASE_SENDER_TOKEN,
                                                'Content-Type': "application/json"
                                            }
                                        }).then(response => {
                                            console.log("Notification Sent" + response)
                                        }).catch(error => {
                                            console.log("Notification not Sent" + error)
                                        })
                                    }
                                }
                            });
                        }
                    }).catch(() => {
                        console.log("Token already present")
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
                User.findOne({ username: decodedJwt.username }, { _id: 0, __v: 0 }, function (error, result) {
                    if (error || result === null) {
                        res.status(404).send({
                            success: false,
                            message: 'Resource not found'
                        });
                    } else {
                        const response = JSON.parse(JSON.stringify(result));
                        response.age = user.age(result.birthday);
                        res.send(response);
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

    app.get('/users/find/:username', (req,res) => {
        User.findOne({ username: req.params.username, publicAchievements: true }, { _id: 0, __v: 0 }, function (error, result) {
            if (error || result === null) {
                res.status(404).send({
                    success: false,
                    message: 'Resource not found or profile not public'
                });
            } else {
                const response = JSON.parse(JSON.stringify(result));
                response.age = user.age(result.birthday);
                console.log(response);
                res.send(response);
            }
        })
    });

    app.get('/users/:username/achievements', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                User.findOne({ username: decodedJwt.username }, function (error, result) {
                    if (error || result === null) {
                        res.status(404).send({
                            success: false,
                            message: 'Resource not found'
                        });
                    } else {
                        res.send(result.achievements);
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

    app.delete('/users/:username/delete/notification-token', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                axios.delete(process.env.NOTIFICATION_SERVICE_URL + req.params.username + '/notification-token', {data : {firebaseUserToken: req.body.firebaseUserToken}, headers: {Authorization: process.env.NOTIFICATION_TOKEN}}).then(response => {
                    console.log(response.data.message)
                    res.send({
                        success: true,
                        message: 'Token successfully removed'
                    })

                }).catch(error => {
                    console.log(error.data.message);
                    res.status(500).send({
                        success: false,
                        message: 'Failed to delete token'
                    })
                });
            }else{
                res.status(401).send({
                    success: false,
                    message: 'Wrong token'
                });
            }
        }catch (e) {
            res.status(401).send({
                success: false,
                message: 'Invalid token'
            });
        }
    });
};
