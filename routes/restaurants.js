var Promise = require('bluebird');
var router = require('express').Router();

var Restaurant = require('../models').Restaurant;

router.get('/', (req, res, next) => {
  Restaurant.findAll({})
  .then(allRestaurants => res.send(allRestaurants));
});

module.exports = router;