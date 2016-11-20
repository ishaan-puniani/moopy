/**
 * Created by ishaan.puniani on 2016-11-20.
 */

var CrawledItems = require('./model');

module.exports = {
    getSuggestions: function (req, res) {
        res.send(["ishaan","ylva"]);
    },
    crawl: function (req, res) {

    }
};
