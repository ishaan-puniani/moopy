/**
 * Created by ishaan.puniani on 2016-11-20.
 */
var Notification = require('./model');
var async = require('async');
module.exports = {
    get: function (req, res) {
        console.log(req.params.name);
        Notification.findOne({user: req.params.name}, function (err, notificationData) {
            if (notificationData) {
                res.send({
                    success: true,
                    notification: notificationData
                });
            } else {
                res.send({
                    success: false
                });
            }
        })
    },
    /*************************** Internal ***********************************/
    add: function (users, callback) {
        if (users && users.length > 0) {
            async.eachSeries(users, function (user, cb) {
                var notification = new Notification({user: user});
                notification.save(function (err, saved) {
                    if (err) {
                        console.log("error while saving notification for user " + user);
                    }
                    cb();
                });
            }, callback);
        }
    },
    remove: function (user, callback) {
        if (user && user.length > 0) {
            Notification.remove({user: user}, function (err, removed) {
                if (err) {
                    console.log("error while saving notification for user " + user);
                }
                callback();
            });
        }
    }
};
