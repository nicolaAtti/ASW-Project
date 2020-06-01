const jsonwebtoken = require('jsonwebtoken');
const training = require("../models/training-data");
const Training = training.model;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(app) {
    app.get('/users/:username/training_session/history-steps', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                Training.find({ username: decodedJwt.username }, function (error, result) {
                    res.send(result);
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
