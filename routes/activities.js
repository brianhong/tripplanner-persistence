var Promise = require('bluebird');
var router = require('express').Router();
const Day = require('../models').Day;
var Activity = require('../models').Activity;

router.get('/', (req, res, next) => {
  Activity.findAll({})
  .then(allActivities => res.send(allActivities));
});

router.get('/:dayNum', (req, res, next) => {
  Day.findOne({
    where: {number: req.params.dayNum}
  })
  .then(day => {
    return day.getActivities();
  })
  .then(activities => {
    res.send(activities);
  });
});

module.exports = router;