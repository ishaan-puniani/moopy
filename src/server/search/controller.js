/**
 * Created by ishaan.puniani on 2016-11-20.
 */

var CrawledItems = require('./model');

module.exports = {
    getSuggestions: function (req, res) {
        var text = req.params.txt;
        var respons= [];
        for(var idx = 0; idx<5;idx++){
            respons.push({value:text + idx});
        }
        /*res.send([
            {value: 'Good', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f607.png'},
            {value: 'Evil', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f608.png'},
            {value: 'Confused', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f615.png'},
            {value: 'Ugly', img: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/assets/png/1f4a9.png'}
        ]);*/
        res.send(respons);
    },
    crawl: function (req, res) {

    }
};
