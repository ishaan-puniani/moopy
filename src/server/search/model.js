/**
 * Created by ishaan.puniani on 2016-11-20.
 */

var mongoose = require('mongoose');

var CrawledItemSchema = new mongoose.Schema({
    name: String,
    displayName: String,
    type: String,
    model: String,
    id: String,
    img: String
}, {timestamps: true});

var CrawledItem = mongoose.model('CrawledItem', CrawledItemSchema);

module.exports = CrawledItem;
