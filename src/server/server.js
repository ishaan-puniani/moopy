/**
 * This is just a dummy server to facilidate our React SPA examples.
 * For a more professional setup of Express, see...
 * http://expressjs.com/en/starter/generator.html
 */

var HOST = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined;
var PORT = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
var MONGO_URI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || "mongodb://localhost/moopy";


var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var synchronizer = require('./synchronizer')


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, function () {
    console.log("DB connected");
});


/**
 * Anything in dist can be accessed statically without
 * this express router getting involved
 */

app.use(express.static(path.join(__dirname, '../app'), {
    dotfiles: 'ignore',
    index: false
}));

require('./routes')(app);

/**
 * Always serve the same HTML file for all requests
 */

app.get('*', function (req, res, next) {
    console.log('Request: [GET]', req.originalUrl)
    res.sendFile(path.resolve(__dirname, 'index.html'));
});


/**
 * Error Handling
 */

app.use(function (req, res, next) {
    console.log('404')
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.sendStatus(err.status || 500);
});


/**
 * Start Server
 */


app.listen(PORT, HOST, function () {
    console.log('Serving: localhost:' + PORT);
});

setInterval(function () {
    console.log("Synchronizing...")
    synchronizer.sync();
}, 1000 * 60);