/**
 * Created by ishaan.puniani on 2016-11-20.
 */


var express = require('express');

var ctrl = require('./controller');

var router = express.Router();


//router.get('/', ctrl.getMood);
router.post('/', ctrl.getMoods);
router.get('/create', ctrl.addMood);

module.exports = router;
