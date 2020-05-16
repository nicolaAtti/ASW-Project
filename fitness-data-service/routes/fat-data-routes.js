const jsonwebtoken = require('jsonwebtoken');
const FatData = require("../models/fat-data");
const JWT_SECRET = process.env.JWT_SECRET

module.exports = function(app) {
    app.post('/users/:username/fat', (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decodedJwt = jsonwebtoken.verify(token, JWT_SECRET);
            if (req.params.username === decodedJwt.username) {
                const fatData = new FatData({
                    username: req.params.username,
                    timestamp: req.body.timestamp,
                    weight: req.body.weight
                });
                // leggo l'altezza dell'utente, calcolo il bmi e lo salvo in fatData

                fatData.save(function (error) {
                    if (error) {
                        if (error instanceof mongoose.Error.ValidationError) {
                            res.status(400).send({
                                success: false,
                                message: 'Wrong parameters'
                            })
                        } else {
                            res.status(500).send({
                                success: false,
                                message: 'Failed to save fat data'
                            })
                        }
                    } else {
                        res.status(201).send({
                            success: true,
                            message: 'Fat data successfully created'
                        })
                    }
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