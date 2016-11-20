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
    getMoods: function (req, res) {
        console.log("hi");
    },

    setMood: function (req, res) {
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


    }
};
