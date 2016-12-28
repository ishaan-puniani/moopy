/**
 * Created by ishaan.puniani on 2016-11-20.
 */
var User = require('./model');
var utils = require('../utils');
module.exports = {
    getAll: function (req, res) {
        res.send([
                {
                    "id": 1,
                    "name": "Michael Jackson",
                    "github": "mjackson",
                    "twitter": "mjackson",
                    "worksOn": "React Router"
                },
                {
                    "id": 2,
                    "name": "Ryan Florence",
                    "github": "ryanflorence",
                    "twitter": "ryanflorence",
                    "worksOn": "React Router"
                },
                {
                    "id": 3,
                    "name": "Dan Abramov",
                    "github": "gaearon",
                    "twitter": "dan_abramov",
                    "worksOn": "Redux"
                },
                {
                    "id": 4,
                    "name": "Matt Zabriskie",
                    "github": "mzabriskie",
                    "twitter": "mzabriskie",
                    "worksOn": "Axios"
                },
                {
                    "id": 5,
                    "name": "Tobias Koppers",
                    "github": "sokra",
                    "worksOn": "Webpack"
                },
                {
                    "id": 6,
                    "name": "Sebastian McKenzie",
                    "github": "kittens",
                    "twitter": "sebmck",
                    "worksOn": "Babel"
                }
            ]
        );

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
            User.findById(req.query.id, function (err, user) {
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
