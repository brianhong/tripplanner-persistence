var Promise = require('bluebird');
var router = require('express').Router();
const Day = require('../models').Day;
var Restaurant = require('../models').Restaurant;

router.get('/', (req, res, next) => {
  Restaurant.findAll({})
  .then(allRestaurants => res.send(allRestaurants));
});

// Use JOIN TABLE
router.get('/:dayNum', (req, res, next) => {
  Day.findOne({
    where: {number: req.params.dayNum}
  })
  .then(day => {
    return day.getRestaurants()
  })
  .then(restaurants => {
    res.send(restaurants);
  });
});

module.exports = router;