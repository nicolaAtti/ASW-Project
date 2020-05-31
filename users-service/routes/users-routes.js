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
                        message: 'User successfully created'
                    })
                }).catch(error => {
                    console.log("Error in reaching firebase server");
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: 'Error in assigning achievement'
                    })
                });
            }
        });
    });


    /**
     * Header of request:
     * Authorization = ACHIEVEMENT_TOKEN --> sarà dentro l'env di ogni servizio
     *
     * Body of request:
     * achievementFileName = NewBlood
     * achievementTitle = New Blood
     * firebaseUserToken = token (deve essere mandato dall'utente durante le altre richieste)
     *
     */
    app.patch('/users/:username/achievement', (req, res) => {
        if (req.header('Authorization') === process.env.ACHIEVEMENT_TOKEN) {
            const achievementFileName = req.body.achievementFileName;
            const achievementTitle = req.body.achievementTitle
            const username = req.params.username;
            User.findOneAndUpdate({username: username}, {$push: {achievements: achievementFileName}}, function (error, result) {
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
                            res.status(500).send({
                                success: false,
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
}
