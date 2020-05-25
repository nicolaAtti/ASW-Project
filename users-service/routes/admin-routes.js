const jsonwebtoken = require('jsonwebtoken');
const user = require("../models/users");
const User = user.model;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(app) {
    app.get('/total-users', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (decodedJwt.username === 'Admin') {
                User.estimatedDocumentCount(function (error, result) {
                    if (error) {
                        res.status(500).send({
                            success: false,
                            message: 'Internal server error'
                        });
                    } else {
                        res.send({ 'totalUsers': result - 1 });
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

    app.get('/average-age', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (decodedJwt.username === 'Admin') {
                User.find({}, 'birthday', function (error, result) {
                    if (error) {
                        res.status(500).send({
                            success: false,
                            message: 'Internal server error'
                        });
                    } else {
                        const averageAge = result.map(entry => user.age(entry.birthday))
                                                .reduce((total, value) => { return total + value }) / result.length;
                        res.send({ 'averageAge': Math.round(averageAge) });
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