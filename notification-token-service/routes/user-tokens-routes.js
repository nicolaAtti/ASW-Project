const user = require("../models/user-tokens");
const User = user.model;

module.exports = function(app) {
    app.post('/users/:username/notification-token', (req, res) => {
        if (req.header('Authorization') === process.env.NOTIFICATION_TOKEN) {
            User.findOneAndUpdate({username: req.params.username, tokens: {$nin: [req.body.firebaseUserToken]}}, {$push: {tokens: req.body.firebaseUserToken}}, function (error,result) {
                if(result){
                    console.log(result);
                    res.status(200).send({
                        success: true,
                        message: 'Token added to user'
                    })
                }else{
                    var user = new User({
                        username: req.params.username,
                        tokens: [req.body.firebaseUserToken]
                    });
                    user.save(function (error){
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
                            res.status(200).send({
                                success: true,
                                message: 'User added to token databse'
                            })
                        }
                    });
                }
            })
        }
    });

    app.delete('/users/:username/notification-token', (req, res) => {
        //dato username e token cancella quel token
        if (req.header('Authorization') === process.env.NOTIFICATION_TOKEN) {
            User.findOneAndUpdate({ username: req.params.username }, { $pull: {tokens: [req.body.firebaseUserToken] }}, function (error, result) {
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
