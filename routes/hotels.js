var Promise = require('bluebird');
var router = require('express').Router();

var Hotel = require('../models').Hotel;

router.get('/', (req, res, next) => {
  Hotel.findAll({})
  .then(allHotels => res.send(allHotels));
});

module.exports = router;