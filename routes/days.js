var Promise = require('bluebird');
var router = require('express').Router();


var Day = require('../models').Day;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;

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
    where: {number: req.params.dayNum}
  })
  .then(() => {
    Day.findAll({
      where: {number: {$gt: req.params.dayNum}}
    })
    .then(days => {
      days.forEach(day => {
        const updatedNumber = day.number - 1;
        day.update({
          number: updatedNumber
        })
        .then(updatedDay => {
          console.log("AFTER:", updatedDay.number, updatedDay.previous);
        })
      })
    })
  })
  .then(() => {
    res.status(200).send('you destroyed it!!!');
  });
});

router.delete('/:dayNum/hotel/:hotelId', (req, res, next) => {
  Day.findOne({
    where: {number: req.params.dayNum}
  })
  .then((day) => {
    return day.update({
      hotelId: null
    })
  })
  .then(() => {
    console.log('Successfully removed hotel from day ' , req.params.dayNum);
    res.end();
  })
});

router.delete('/:dayNum/restaurant/:restaurantId', (req, res, next) => {
  Day.findOne({
    where: {number: req.params.dayNum}
  })
  .then((day) => {
    return Restaurant.findOne({
      where: {id: req.params.restaurantId}
    })
    .then((restaurant) => {
      day.removeRestaurant(restaurant);
    })
  })
  .then(() => {
    console.log('Successfully removed restaurant from day ' , req.params.dayNum);
    res.end();
  })
});

router.delete('/:dayNum/activity/:activityId', (req, res, next) => {
  Day.findOne({
    where: {number: req.params.dayNum}
  })
  .then((day) => {
    return Activity.findOne({
      where: {id: req.params.activityId}
    })
    .then((activity) => {
      day.removeActivity(activity);
    })
  })
  .then(() => {
    console.log('Successfully removed restaurant from day ' , req.params.dayNum);
    res.end();
  })
});

module.exports = router;