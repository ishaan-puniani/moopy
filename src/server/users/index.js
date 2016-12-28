/**
 * Created by ishaan.puniani on 2016-11-20.
 */


var express = require('express');

var ctrl = require('./controller');

var router = express.Router();


router.get('/', ctrl.getAll);
router.post('/create', ctrl.register);
router.post('/update', ctrl.update);
router.post('/login', ctrl.login);


module.exports = router;
