var Promise = require('bluebird');
var router = require('express').Router();

var Day = require('../models').Day;


router.get('/', (req, res, next) => {
  Day.findAll({})
  .then(allDays => res.send(allDays));
});

router.post('/', (req, res, next) => {
  res.send('You created a day!');
});

router.delete('/', (req, res, next) => {

});

module.exports = router;