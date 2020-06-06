const User = require("../models/user-tokens");

module.exports = function(app) {
    app.post('/users/:username/notification-token', (req, res) => {
        if (req.header('Authorization') === process.env.NOTIFICATION_TOKEN) {
            User.findOneAndUpdate({username: req.params.username, tokens: {$nin: [req.body.firebaseUserToken]}}, {$push: {tokens: req.body.firebaseUserToken}},{upsert: true},function (error, result) {
                if (error) {
                    if (error.code === 11000) {
                        res.status(409).send({
                            success: false,
                            message: 'Username or token already present'
                        })
                    }else{
                        res.status(500).send({
                            success: false,
                            message: 'Failed to update token list'
                        })
                    }
                } else {
                    res.status(200).send({
                        success: true,
                        message: 'Token added to user'
                    });
                }
            });
        }else{
            res.status(401).send({
                success: false,
                message: 'Wrong token'
            });
        }
    });

    app.delete('/users/:username/notification-token', (req, res) => {
        if (req.header('Authorization') === process.env.NOTIFICATION_TOKEN) {
            User.findOneAndUpdate({ username: req.params.username }, { $pullAll: {tokens: [req.body.firebaseUserToken] }}, function (error, result) {
                if (error || result === null) {
                    res.status(404).send({
                        success: false,
                        message: 'Token not present'
                    });
                } else {
                    res.send({
                        success: true,
                        message: 'Token successfully deleted'
                    });
                }
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Invalid token'
            });
        }
    });

    app.delete('/users/:username/notification-token/all', (req, res) => {
        if (req.header('Authorization') === process.env.NOTIFICATION_TOKEN) {
            User.deleteOne({ username: req.params.username }, function (error, result) {
                if (error || result === null) {
                    res.status(404).send({
                        success: false,
                        message: 'User not present'
                    });
                } else {
                    res.send({
                        success: true,
                        message: 'Tokens successfully deleted'
                    });
                }
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Invalid token'
            });
        }
    });

    app.get('/users/:username/notification-token', (req, res) => {
        //dato username ritorna la lista dei suoi token
        if (req.header('Authorization') === process.env.NOTIFICATION_TOKEN) {
            User.findOne({ username: req.params.username }, { _id: 0, __v: 0 }, function (error, result) {
                if (error || result === null) {
                    res.status(404).send({
                        success: false,
                        message: 'Resource not found'
                    });
                } else {
                    const response = JSON.parse(JSON.stringify(result));
                    res.send(response);
                }
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Wrong token'
            });
        }
    });

};
