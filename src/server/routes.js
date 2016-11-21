/**
 * Created by ishaan.puniani on 2016-11-20.
 */

module.exports = function (app) {
    app.use('/api/moods', require('./moods'));

    app.use('/api/search', require('./search'));
    app.use('/api/users', require('./users'));
};