const Promise = require('bluebird');
const router = require('express').Router();

const Hotel = require('../models').Hotel;

router.get('/', (req, res, next) => {
  Hotel.findAll({})
  .then(allHotels => res.send(allHotels));
});

router.get('/:hotelId', (req, res, next) => {
  Hotel.findOne({
    where: { id: req.params.hotelId }
  })
  .then(hotel => {
    res.send(hotel);
  });
});
module.exports = router;
