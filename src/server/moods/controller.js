/**
 * Created by ishaan.puniani on 2016-11-12.
 */

var Mood = require('./model');
var async = require('async');
var ctrlNotifications = require('../notifications/controller')

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

//http://stackoverflow.com/questions/15685588/javascript-how-to-control-flow-with-async-recursive-tree-traversal
function drillDown(rootNode, onComplete) {

    // Count of outstanding requests.
    // Upon a return of any request,
    // if this count is zero, we know we're done.
    var outstandingRequests = 0;

    // A list of processed nodes,
    // which is used to handle artifacts
    // of non-tree graphs (cycles, etc).
    // Technically, since we're processing a "tree",
    // this logic isn't needed, and could be
    // completely removed.
    //
    // ... but this also gives us something to inspect
    // in the sample test code. :)
    var processedNodes = [];

    function markRequestStart() {
        outstandingRequests++;
    }

    function markRequestComplete() {
        outstandingRequests--;
        // We're done, let's execute the overall callback
        if (outstandingRequests < 1) {
            onComplete(processedNodes);
        }
    }

    function processNode(node) {
        // Kickoff request for this node
        markRequestStart();
        // (We use a regular HTTP GET request as a
        // stand-in for any asynchronous action)
        console.log("finding " + node);
        processedNodes.push(node);
        Mood.findOne({name: node}, function (err, nodeData) {
            if (nodeData) {

                if (nodeData.type === 'dashboard') {
                    processedNodes.splice(processedNodes.indexOf(nodeData.name), 1); // remove dashboards
                    //processedNodes.concat(node.children);
                    nodeData.children.forEach(function (childNode) {
                        // Only process nodes not already processed
                        // (only happens for non-tree graphs,
                        // which could include cycles or multi-parent nodes)
                        //  console.log("processedNodes", processedNodes)
                        if (processedNodes.indexOf(childNode) < 0) {
                            processNode(childNode);
                        }
                    });
                }
            }
            markRequestComplete();
        });
        /*jQuery.get("/?uid=" + node.uid, function (data) {
         processedNodes[node.uid] = data;
         }).fail(function () {
         console.log("Request failed!");
         }).always(function () {
         // When the request returns:
         // 1) Mark it as complete in the ref count
         // 2) Execute the overall callback if the ref count hits zero
         markRequestComplete();
         });*/

        // Recursively process all child nodes (kicking off requests for each)


    }

    processNode(rootNode);
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
        console.log(data);
        item.mood = data[0].avgMoodOfChildren;
        console.log("Updated Mood", item.mood);
        item.save(function (saveErr, saved) {
            console.log("Mood Updated");
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
            children.push(selections[idx]);
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
        var query = {type: "dashboard"};
        if (req.query && req.query.q) {
            console.log(req.query.q);
            query.name = new RegExp(req.query.q, "i");
        }
        Mood.find(query, function (err, data) {
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
        var name = req.query.user, mood = req.query.mood;
        console.log({name: name, mood: mood});
        new Mood({name: name, mood: mood}).save(function (err, data) {
            if (err) {
                res.send({error: "Error while saving Data"});
            } else {
                ctrlNotifications.remove(name, function () {
                    console.log("Notification Removed for user " + name);
                })
                new bubbleUp(name, function () {
                    console.log("done");
                    res.send({success: true});
                });
            }
        });
    },
    getMoodDetailsOfUser: function (req, res) {
        var name = req.params.user, start = req.body.start, end = req.body.end, old = parseInt(req.body.old);
        console.log({name: name, start: start, end: end, old: old});
        var cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - old);
        Mood.find({
            name: req.params.user,
            createdAt: {
                $gte: cutoff
            }
        }, null, {sort: {createdAt: -1}}, function (err, data) {
            if (err) {
                res.send({error: "Error while geting user data"});
            } else {
                res.send({success: true, moods: data});
            }
        });
    },
    askFromUsers: function (req, res) {
        // get all users of Dashboard
        var dashboardName = req.params.name;
        if (dashboardName && dashboardName.length > 0) {
            drillDown(dashboardName, function (members) {
                console.log(members);
                ctrlNotifications.add(members, function () {
                    res.send({success: true});
                });
            });
        } else {
            res.send({success: false});
        }
    },
    getDashboardMoodDetails: function (req, res) {
        var name = req.params.user, start = req.body.start, end = req.body.end, old = parseInt(req.body.old);
        console.log({name: name, start: start, end: end, old: old});

        var dashboardName = req.params.name;
        if (dashboardName && dashboardName.length > 0) {
            drillDown(dashboardName, function (members) {
                console.log(members);
                var cutoff = new Date();
                cutoff.setDate(cutoff.getDate() - old);


                Mood.aggregate([
                    {"$sort": {"createdAt": -1}}
                    ,
                    {
                        "$match": {
                            "$and": [
                                {"name": {"$in": members}},
                                {"createdAt": {"$gte": cutoff}}
                            ]
                        }
                    }
                    ,
                    {
                        "$group": {
                            "_id": "$name",
                            "mood": {
                                "$push": {
                                    "mood": "$mood",
                                    "createdAt": "$createdAt"
                                }
                            }
                        }
                    }
                    ,
                    {
                        "$project": {
                            "name": "$_id",
                            "moods": "$mood"
                        }
                    }
                ], function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send({success: true, moods: data});
                    }
                });


            });
        } else {
            res.send({success: false});
        }
    }
};
