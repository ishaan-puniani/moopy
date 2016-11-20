/**
 * Created by ishaan.puniani on 2016-11-20.
 */

var mongoose = require('mongoose');

var UserItemSchema = new mongoose.Schema({
    name: String,
    displayName: String,
    subscriptions:[]
}, {timestamps: true});

var UserItem = mongoose.model('User', UserItemSchema);

module.exports = UserItem;
