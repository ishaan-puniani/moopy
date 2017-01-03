/**
 * Created by ishaan.puniani on 2016-11-20.
 */

var CrawledItems = require('./model');

module.exports = {
    getSuggestions: function (req, res) {
        var text = req.params.txt;


        CrawledItems.find({name: new RegExp(text, "i")}, function (err, docs) {
            if (err) {
                res.send({success: false, message: "No data found"});
            } else {
                res.send({success: true, results: docs, message: docs.length + " items matched"});
            }
        });


/*
        var respons = [];
        for (var idx = 0; idx < 5; idx++) {
            respons.push({value: text + idx});
        }
*/
        /*res.send([
         {value: 'Good', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f607.png'},
         {value: 'Evil', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f608.png'},
         {value: 'Confused', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f615.png'},
         {value: 'Ugly', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f4a9.png'}
         ]);*/

    },
    crawl: function (req, res) {

    }
};
