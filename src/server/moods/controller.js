/**
 * Created by ishaan.puniani on 2016-11-12.
 */

var Mood = require('./model');
var async = require('async');

function bubbleUp(nodeName, cb) {
    var me = this;
    me.nodeName = nodeName;
    me.cb = cb;
    me.trigger = function () {
        var me = this;
        console.log("trigger", me.nodeName);
        Mood.find({children: me.nodeName}, function (err, mood) {
            if (err) {
                console.log(err);
                me.cb();
            }
            if (mood.length === 0) {
                me.cb();
            } else {
                var moodsToUpdate = mood;
                console.log("trig", mood);
                async.eachSeries(moodsToUpdate, function (item, callbackOfMoodUpdateFromChildren) {
                    updateMoodFromChildren(item, function () {
                        console.log("1");
                        callbackOfMoodUpdateFromChildren();
                    });
                }, function (bubbligError) {
                    // bubbled Up by one layer

                    async.eachSeries(moodsToUpdate, function (item, callbackOfBubbleUp) {
                        //console.log(item.name);
                        new bubbleUp(item.name, callbackOfBubbleUp)
                    }, function (errFromBubbleUp) {
                        console.log(errFromBubbleUp);
                        console.log("parent", me.nodeName);
                        me.cb();
                    });

                });
            }
        });
    }
    me.trigger();
}
function updateMoodFromChildren(item, callback) {
    var children = item.children;
    Mood.aggregate([
        {"$sort": {"createdAt": -1}},
        {$match: {name: {$in: children}}},
        {
            $group: {
                _id: "$name",
                mood: {$first: "$mood"}
            }
        }, {
            $group: {
                _id: "avgMoodOfChildren",
                avgMoodOfChildren: {$avg: "$mood"}
            }
        }
    ], function (err, data) {
        //console.log(data);
        item.mood = data[0].avgMoodOfChildren;
        item.save(function (saveErr, saved) {
            callback();
        });
    });
}


module.exports = {
    createDashboard: function (req, res) {
        var name = req.body.name, children = [], selections = req.body.selection;

        for (var idx = 0; idx < selections.length; idx++) {
            children.push(selections[idx].value);
        }

        var mood = new Mood({
            children: children,
            name: name,
            type: "dashboard"
        });

        mood.save(function (err, data) {
            if (err) {
                res.send({error: "Unable to save"});
            } else {
                res.send({success: true});
            }
        });
    },
    updateDashboard: function (req, res) {
        var name = req.body.name, children = [], selections = req.body.selection;

        for (var idx = 0; idx < selections.length; idx++) {
            children.push(selections[idx].value);
        }

        Mood.findOne({name: name}, function (err, data) {
            if (err || data === null) {
                res.send({error: "Unable to find dashboard with name " + name});
            } else {
                data.children = children;
                data.save(function (err, data) {
                    if (err) {
                        res.send({error: "Unable to update"});
                    } else {
                        res.send({success: true});
                    }
                });
            }
        });

    },

    getAllDashboards: function (req, res) {
        Mood.find({type: "dashboard"}, function (err, data) {
            if (err || data === null) {
                res.send({error: "Unable to find dashboards"});
            } else {
                res.send(data);
            }
        });
    },
    getDashboard: function (req, res) {
        var name = req.params.name;
        Mood.findOne({name: name, type: "dashboard"}, function (err, data) {
            if (err || data === null) {
                res.send({error: "Unable to find dashboard with name " + name});
            } else {
                res.send(data);
            }
        });
    },

    getMoods: function (req, res) {
        var selectedPeople = req.body;
        Mood.aggregate([
                {$match: {name: {$in: selectedPeople}}},
                {"$sort": {"createdAt": -1}},
                {
                    $group: {
                        _id: "$name",
                        mood: {$first: "$mood"},
                        at: {$first: "$createdAt"},
                        type: {$first: "$type"}
                    }
                }
            ], function (err, data) {
                var outcome = {}
                if (err) {
                    console.log(err, data);
                } else if (data && data.length > 0) {
                    outcome = data.reduce(function (moods, user) {
                        //console.log(moods,user);
                        moods[user._id] = user;
                        return moods;
                    }, {})
                }
                res.send(outcome);
            }
        );
    },
    addMood: function (req, res) {
        var name = req.params.user;
        console.log({name: name, mood: req.params.mood});
        new Mood({name: req.params.user, mood: req.params.mood}).save(function (err, data) {
            if (err) {
                res.send({error: "Error while saving Data"});
            } else {
                new bubbleUp(name, function () {
                    console.log("done");
                    res.send({success: true});
                });
            }
        });
    },
    getMoodDetailsOfUser:function(req,res){
        var name = req.params.user;
        console.log({name: name, mood: req.params.mood});
        Mood.find({name: req.params.user},function (err, data) {
            if (err) {
                res.send({error: "Error while geting user data"});
            } else {
                res.send(data);
            }
        });
    }
};
