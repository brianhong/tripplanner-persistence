/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');


var Day = db.define('day', {
  number: Sequelize.INTEGER,
  previous: {
    type: Sequelize.INTEGER,
    get: function() {
      return this.getDataValue('number') - 1;
    }
  }
});

module.exports = Day