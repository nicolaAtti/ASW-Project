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
                
            }
        });
    });

    //Given the username/token pair  and the achievement insert it into the array inside the DB
    app.patch('/users/:username/achievement', (res, req) => {
        const achievement = req.body.achievements;
        const username = req.params.username;
        console.log(achievement);
        console.log(username);
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
        console.log(decodedJwt.username);
        if (req.params.username === decodedJwt.username) {
            User.findOneAndUpdate({username: decodedJwt.username}, req.body, function (error, result) {
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
                        res.send({
                            success: true,
                            message: 'User successfully updated'
                        });
                    }
                }
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
