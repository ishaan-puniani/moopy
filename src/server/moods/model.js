/**
 * Created by garima05 on 07-11-2016.
 */


var mongoose = require('mongoose');

var MoodItemSchema = new mongoose.Schema({
    name: String,
    mood: Number,
    type: { type: String, default: "user" },
    owner: String,
    createdAt: { type: Date },
    updatedAt: { type: Date },
    children:[]
}, {timestamps: true});

MoodItemSchema.pre('save', function(next){
    var now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
        this.createdAt = now;
    }
    next();
});



var MoodItem = mongoose.model('Mood', MoodItemSchema);

module.exports = MoodItem;
