/**
 * Created by ishaan.puniani on 2016-11-20.
 */

var mongoose = require('mongoose');

var UserItemSchema = new mongoose.Schema({
    name: String,
    password: String,
    displayName: String,
    subscriptions: [],
    permissions: ["read"]
}, {timestamps: true});

var UserItem = mongoose.model('User', UserItemSchema);

module.exports = UserItem;
