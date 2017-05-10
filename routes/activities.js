var Promise = require('bluebird');
var router = require('express').Router();

var Activity = require('../models').Activity;

router.get('/', (req, res, next) => {
  Activity.findAll({})
  .then(allActivities => res.send(allActivities));
});

module.exports = router;