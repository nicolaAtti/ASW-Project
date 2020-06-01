const jsonwebtoken = require('jsonwebtoken');
const training = require("../models/training-data");
const Training = training.model;
const JWT_SECRET = process.env.JWT_SECRET;
const axios = require('axios');

module.exports = function(app) {
    app.get('/history-trainings', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (decodedJwt.username === 'Admin') {
                axios.get(process.env.USER_SERVICE_URL + '/users-ages', { 'headers': { 'Authorization': req.header('Authorization') } })
                    .then(usersAges => {
                        Training.find({}, 'username startTime', function (error, result) {
                            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                                'September', 'October', 'November', 'December'];
                            const today = new Date();
                            const year = today.getFullYear();
                            const month = today.getMonth();
                            const initialReduce = [];
                            for (let i = 0; i <= month; i++) {
                                initialReduce.push({ month: monthNames[i], under30: 0, under60: 0, over60:0 });
                            }
                            res.send(result
                                .filter(entry => entry.startTime.getFullYear() === year)
                                .map(entry => {
                                    return {
                                        month: entry.startTime.getMonth(),
                                        age: usersAges.data[entry.username]
                                    };
                                })
                                .reduce((obj, item) => {
                                    if (item.age < 30) {
                                        obj[item.month].under30++;
                                    } else {
                                        if (item.age < 60) {
                                            obj[item.month].under60++;
                                        } else {
                                            obj[item.month].over60++;
                                        }
                                    }
                                    return obj;
                                    }, initialReduce
                                )
                            );
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

    app.get('/history-trainings-duration', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (decodedJwt.username === 'Admin') {
                axios.get(process.env.USER_SERVICE_URL + '/users-ages', { 'headers': { 'Authorization': req.header('Authorization') } })
                    .then(usersAges => {
                        Training.find({}, 'username startTime endTime', function (error, result) {
                            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                                'September', 'October', 'November', 'December'];
                            const today = new Date();
                            const year = today.getFullYear();
                            const month = today.getMonth();
                            const initialReduce = [];
                            for (let i = 0; i <= month; i++) {
                                initialReduce.push({
                                    month: monthNames[i],
                                    under30: 0,
                                    under60: 0,
                                    over60:0,
                                    under30counter: 0,
                                    under60counter: 0,
                                    over60counter:0 });
                            }
                            res.send(result
                                .filter(entry => entry.startTime.getFullYear() === year)
                                .map(entry => {
                                    return {
                                        month: entry.startTime.getMonth(),
                                        duration: (entry.endTime - entry.startTime) / 60000,
                                        age: usersAges.data[entry.username]
                                    };
                                })
                                .reduce((obj, item) => {
                                        if (item.age < 30) {
                                            obj[item.month].under30 += item.duration;
                                            obj[item.month].under30counter++;
                                        } else {
                                            if (item.age < 60) {
                                                obj[item.month].under60 += item.duration;
                                                obj[item.month].under60counter++;
                                            } else {
                                                obj[item.month].over60 += item.duration;
                                                obj[item.month].over60counter++;
                                            }
                                        }
                                        return obj;
                                    }, initialReduce
                                )
                                .map(entry => {
                                    if (entry.under30counter !== 0) {
                                        entry.under30 = Math.round(entry.under30 /entry.under30counter);
                                    }
                                    if (entry.under60counter !== 0) {
                                        entry.under60 = Math.round(entry.under60 / entry.under60counter);
                                    }
                                    if (entry.over60counter !== 0) {
                                        entry.over60 = Math.round(entry.over60 / entry.over60counter);
                                    }
                                    delete entry.under30counter;
                                    delete entry.under60counter;
                                    delete entry.over60counter;
                                    return entry;
                                })
                            );
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
