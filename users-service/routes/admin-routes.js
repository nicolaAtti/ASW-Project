const jsonwebtoken = require('jsonwebtoken');
const User = require("../models/users");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(app) {
    app.get('/admin/total-users', (req, res) => {
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

    app.get('/admin/average-age', (req, res) => {
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
                        const averageAge = result.map(entry => {
                            const diff_ms = Date.now() - entry.birthday;
                            const age_dt = new Date(diff_ms);
                            return Math.abs(age_dt.getUTCFullYear() - 1970);
                        }).reduce((total, value) => { return total + value }) / result.length;

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