/**
 * Created by ishaan.puniani on 2016-12-28.
 */
var jwt = require('jsonwebtoken');
var secret = "MoopyServer";
var userModel = require('./users/model');
module.exports = {
    tokenise: function (strData) {
        return jwt.sign({data: strData}, secret, {
            expiresIn: 600 // expires in 1 hours
        });
    },
    loggedInUser: function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        console.log("token", token);
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    console.log("token", err)
                    req.loggedIn = false;
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    console.log("token", decoded)
                    req.token = decoded.data;
                    console.log("find user by id");
                    userModel.findById(req.token, function (err, user) {
                        if (err) {
                            return res.json({success: false, message: 'Failed to authenticate token.'});
                        } else {
                            req.loggedIn = true;
                            req.user = user;
                            next();
                        }

                    })

                }
            });
        } else {
            console.log("token", "no token")
            return res.json({success: false, message: 'Failed to authenticate token.'});
        }

    }
};

