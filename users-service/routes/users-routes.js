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
                const notificationPayload = {
                    notification: {
                        title: "Achievement Earned!",
                        body: "Congratulations! You earned the achievement New Blood!",
                        icon: "party_icon.png"
                    },
                    to: req.body.firebaseUserToken
                };
                axios.post("https://fcm.googleapis.com/fcm/send", notificationPayload,{headers: { Authorization: "key="+process.env.FIREBASE_SENDER_TOKEN, 'Content-Type': "application/json"}}).then(response => {
                    console.log("Achievement request executed successfully");
                    res.status(201).send({
                        success: true,
                        message: 'User successfully created and notification sent'
                    })
                }).catch(error => {
                    console.log("Error in reaching firebase server");
                    console.log(error);
                    res.status(201).send({
                        success: true,
                        message: 'User successfully created, but notification not sent'
                    })
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
                        const notificationPayload = {
                            notification: {
                                title: "Achievement Earned!",
                                body: "Congratulations! You earned the achievement "+achievementTitle+" !",
                                icon: "party_icon.png"
                            },
                            to: req.body.firebaseUserToken
                        };
                        axios.post("https://fcm.googleapis.com/fcm/send", notificationPayload,{headers: { Authorization: "key="+process.env.FIREBASE_SENDER_TOKEN, 'Content-Type': "application/json"}}).then(response => {
                            res.send({
                                success: true,
                                message: 'Achievement successfully assigned'
                            });
                        }).catch(error => {
                            res.send({
                                success: true,
                                message: 'Failed to award achievement:'+error
                            })
                        })
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
                    if (error || result === null) {
                        res.status(404).send({
                            success: false,
                            message: 'Already deleted'
                        });
                    } else {
                        res.send({
                            success: true,
                            message: 'User successfully deleted'
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
                res.status(404).send({
                    success: false,
                    message: 'Resource not found'
                });
            } else {
                if (req.body.password === result.password) {
                    const token = jsonwebtoken.sign({ username: req.params.username }, JWT_SECRET);
                    const registrationDate = result.registrationDate;
                    const today = new Date();
                    const daysDiff = Math.ceil(Math.abs(today - registrationDate) / (1000*60*60*24));
                    if(daysDiff >= 180 && daysDiff < 365){
                        const achievementFileName = "AToastToUs";
                        const achievementTitle = "A toast to us";
                        User.findOneAndUpdate({username: req.params.username, achievements: {$nin: [achievementFileName]}}, {$push: {achievements: achievementFileName}}, function(error,result){
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
                                            body: "Congratulations! You earned the achievement "+achievementTitle+" !",
                                            icon: "party_icon.png"
                                        },
                                        to: req.body.firebaseUserToken
                                    };
                                    axios.post("https://fcm.googleapis.com/fcm/send", notificationPayload,{headers: { Authorization: "key="+process.env.FIREBASE_SENDER_TOKEN, 'Content-Type': "application/json"}}).then(response => {
                                        console.log("Notification Sent" + response)
                                    }).catch(error => {
                                        console.log("Notification not sent" +error)
                                    })
                                }
                            }
                        });
                    }
                    if(daysDiff >= 365){
                        const achievementFileName = "AYearWithUs";
                        const achievementTitle = "A year with us";
                        User.findOneAndUpdate({username: req.params.username, achievements: {$nin: [achievementFileName]}}, {$push: {achievements: achievementFileName}}, function(error,result){
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
                                            body: "Congratulations! You earned the achievement "+achievementTitle+" !",
                                            icon: "party_icon.png"
                                        },
                                        to: req.body.firebaseUserToken
                                    };
                                    axios.post("https://fcm.googleapis.com/fcm/send", notificationPayload,{headers: { Authorization: "key="+process.env.FIREBASE_SENDER_TOKEN, 'Content-Type': "application/json"}}).then(response => {
                                        console.log("Notification Sent" + response)
                                    }).catch(error => {
                                        console.log("Notification not Sent" + error)
                                    })
                                }
                            }
                        });
                    }
                    res.status(201).send({
                        success: true,
                        token: token
                    })
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
};
