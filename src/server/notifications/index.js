/**
 * Created by ishaan.puniani on 2016-11-20.
 */


var express = require('express');

var ctrl = require('./controller');

var utils = require('../utils');


var router = express.Router();


router.get('/:name', ctrl.get);


module.exports = router;
