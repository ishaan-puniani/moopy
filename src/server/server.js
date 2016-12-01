/**
 * This is just a dummy server to facilidate our React SPA examples.
 * For a more professional setup of Express, see...
 * http://expressjs.com/en/starter/generator.html
 */

var PORT = "3000";
var DB_HOST = "localhost";
var DB_PORT = "27017";
var DB_NAME = "moopy";


var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME, function () {
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
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.sendStatus(err.status || 500);
});


/**
 * Start Server
 */


app.listen(PORT, function () {
    console.log('Serving: localhost:' + PORT);
});

