/**
 * Created by ishaan.puniani on 2016-11-20.
 */


var express = require('express');

var ctrl = require('./controller');

var utils = require('../utils');


var router = express.Router();


router.get('/', utils.loggedInUser, ctrl.getAll);
router.get('/profile', utils.loggedInUser, ctrl.getProfile);
router.get('/details', ctrl.getProfile);
router.post('/create', ctrl.register);
router.post('/update', ctrl.update);
router.post('/login', ctrl.login);


module.exports = router;
