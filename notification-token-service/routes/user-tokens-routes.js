const axios = require('axios');
const jsonwebtoken = require('jsonwebtoken');
const user = require("../models/user-tokens");
const User = user.model;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(app) {
    app.post('/users/:username/notification-token', (req, res) => {
        //controllo token
        //creo una nuova voce se l'utente non esiste altrimenti gli aggiungo il token
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

    app.delete('/users/:username/notification-token', (req, res) => {
        //dato username e token cancella quel token
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

    app.get('/users/:username/notification-token', (req, res) => {
        //dato username ritorna la lista dei suoi token
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

};
