const jsonwebtoken = require('jsonwebtoken');
const training = require("../models/training-data");
const Training = training.model;
const JWT_SECRET = process.env.JWT_SECRET;
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

module.exports = function(app) {
    app.get('/users/:username/training_session/history-steps', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                Training.find({ username: decodedJwt.username }, function (error, result) {
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = today.getMonth();
                    const initialReduce = [];
                    for (let i = 0; i <= month; i++) {
                        initialReduce.push({ month: monthNames[i], steps: 0 });
                    }
                    res.send(result
                        .filter(entry => entry.startTime.getFullYear() === year)
                        .map(entry => {
                            return {
                                month: entry.startTime.getMonth(),
                                steps: entry.steps
                            };
                        })
                        .reduce((obj, item) => {
                            obj[item.month].steps += item.steps;
                            return obj;
                        }, initialReduce
                        )
                    );
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
