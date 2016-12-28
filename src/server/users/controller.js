/**
 * Created by ishaan.puniani on 2016-11-20.
 */
var User = require('./model');
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
        console.log("hi");
    },
    update: function (req, res) {
        console.log("hi");
    },
    login: function (req, res) {
        console.log(req.body);
        var user = new User({
            name: req.body.userId,
            password: req.body.password
        });
        user.save(function (err, usr) {
            if (err) {
                console.log("Error while saving user");
                res.send({success: false})
            } else {
                res.send({success: true, token: usr.id, profile: usr});
            }
        });
    },
    validate: function (req, res) {
        console.log("hi");
    }

};
