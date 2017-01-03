/**
 * Created by ishaan.puniani on 2016-11-20.
 */
var User = require('./model');
var utils = require('../utils');
module.exports = {
    getAll: function (req, res) {
        User.find({}, {password: 0}, function (err, data) {
            if (err) {
                res.send({
                    success: false
                });
            } else {
                res.send({
                        success: true,
                        users: data
                    }
                );
            }
        })
    },
    getMyDhashboards: function (req, res) {
        console.log("hi");
    },
    register: function (req, res) {
        var user = new User({
            name: req.body.userId,
            password: req.body.password
        });
        user.save(function (err, usr) {
            if (err) {
                console.log("Error while saving user");
                res.send({success: false})
            } else {
                res.send({
                    success: true,
                    token: utils.tokenise(usr.id),
                    profile: usr
                });
            }
        });
    },
    update: function (req, res) {
        console.log("hi");
    },
    login: function (req, res) {
        console.log(req.body);

        User.findOne({
            name: req.body.userId,
            password: req.body.password
        }, function (err, usr) {
            if (err) {
                console.log("Error while user login");
                res.send({success: false})
            } else {
                // if user is found and password is right
                // create a token

                res.send({
                    success: true,
                    token: utils.tokenise(usr.id),
                    profile: usr
                });


            }
        })
    },
    getProfile: function (req, res) {
        if (req.query && req.query.id) {
            User.findOne({name:req.query.id}, function (err, user) {
                if (err) {
                    res.send({success: false});
                } else {
                    res.send({success: true, profile: user});
                }
            });
        } else {
            res.send({success: true, profile: req.user});
        }

    },
    validate: function (req, res) {
        console.log("hi");
    }

};
