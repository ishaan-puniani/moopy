/**
 * Created by ishaan.puniani on 2016-11-20.
 */

module.exports = function (app) {
    app.use('/api/moods', require('./moods'));

    app.use('/api/dashboard', require('./moods/dashboard_index'));

    app.use('/api/search', require('./search'));
    app.use('/api/notifications', require('./notifications'));

    app.use('/api/users', require('./users'));
};