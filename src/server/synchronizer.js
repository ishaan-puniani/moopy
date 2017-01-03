/**
 * Created by ishaan.puniani on 2017-01-03.
 */
var MoodModel = require('./moods/model');
var UsersModel = require('./users/model');
var SearchModel = require('./search/model');

module.exports = {
    sync: function () {
        SearchModel.remove({}, function (err, result) {


            console.log("Synchronizing Moods")
            MoodModel.distinct('name', function (err, data) {
                if (err) {
                    console.log(err)
                }
                if (data) {
                    for (var idx = 0; idx < data.length; idx++) {
                        var searchModel = new SearchModel({
                            name: data[idx],
                            displayName: data[idx],
                            type: "mood",
                            model: "mood"
                        });
                        searchModel.save();
                    }
                }
            });
           /* console.log("Synchronizing Users")
            UsersModel.distinct('name', function (err, data) {
                if (err) {
                    console.log(err)
                }
                if (data) {
                    for (var idx = 0; idx < data.length; idx++) {
                        var searchModel = new SearchModel({
                            name: data[idx],
                            displayName: data[idx],
                            type: "user",
                            model: "user"
                        });
                        searchModel.save();
                    }
                }
            });*/
        });
    }
}