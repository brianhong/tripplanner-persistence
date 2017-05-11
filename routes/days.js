var Promise = require('bluebird');
var router = require('express').Router();


var Day = require('../models').Day;


router.get('/', (req, res, next) => {
  Day.findAll({

  })
  .then(allDays => res.send(allDays));
});

router.post('/:dayNum', (req, res, next) => {
  Day.create({
    number: req.params.dayNum
  })
  .then(createdDay => {
    res.send('You created a day!');
  });
});

router.put('/:dayNum/hotel/:hotelId', (req, res, next) => {
  const number = req.params.dayNum;
  const hotelId = req.params.hotelId;

  Day.findOne({
    where: {number}
  })
  .then(day => {
    return day.update({
      hotelId
    });
  })
  .then(() => {
    res.status(200).send(`Hotel with ID : ${hotelId} added to day ${number}`);
  });
});

router.put('/:dayNum/restaurant/:restId', (req, res, next) => {
  const number = req.params.dayNum;
  const restId = req.params.restId;

  Day.findOne({
    where: {number}
  })
  .then(day => {
    return day.addRestaurant(restId);
  })
  .then(() => {
    res.status(200).send(`Restaurant with ID ${restId} added to day ${number}`);
  });
});

router.put('/:dayNum/activity/:activityId', (req, res, next) => {
  const number = req.params.dayNum;
  const activityId = req.params.activityId;

  Day.findOne({
    where: {number}
  })
  .then(day => {
    return day.addActivity(activityId);
  })
  .then(() => {
    res.status(200).send(`Restaurant with ID ${activityId} added to day ${number}`);
  });
});

router.delete('/:dayNum', (req, res, next) => {
  
  Day.destroy({
    where: {id: req.params.dayNum}
  })
  .then(() => {
    console.log('right before finding');
    Day.findAll({
      where: {number: {$gt: req.params.dayNum}}
    })
    .then(days => {
      days.forEach(day => {
        console.log(day.number, day.previous);
        day.update({
          number: day.previous
        })
      })
    })
  })
  .then(() => {
    res.status(200).send('you destroyed it!!!');
  });
});

module.exports = router;