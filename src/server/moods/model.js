/**
 * Created by garima05 on 07-11-2016.
 */


var mongoose = require('mongoose');

var MoodItemSchema = new mongoose.Schema({
    name: String,
    mood: Number,
    type: { type: String, default: "user" },
    owner: String,
    children:[]
}, {timestamps: true});

var MoodItem = mongoose.model('Mood', MoodItemSchema);

module.exports = MoodItem;
