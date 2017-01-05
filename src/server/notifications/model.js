/**
 * Created by ishaan.puniani on 2016-11-20.
 */

var mongoose = require('mongoose');

var NotificationItemSchema = new mongoose.Schema({
    user: String
}, {timestamps: true});

var NotificationItem = mongoose.model('Notification', NotificationItemSchema);

module.exports = NotificationItem;
