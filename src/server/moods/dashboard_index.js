/**
 * Created by ishaan.puniani on 2016-11-29.
 */



var express = require('express');

var ctrl = require('./controller');

var router = express.Router();


router.post('/create', ctrl.createDashboard);
router.post('/update', ctrl.updateDashboard);
router.get('/', ctrl.getAllDashboards);
router.get('/ask/:name', ctrl.askFromUsers);
router.get('/:name', ctrl.getDashboard);

module.exports = router;
