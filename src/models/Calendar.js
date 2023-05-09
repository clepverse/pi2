const mongoose = require('mongoose');

const CalendarSchema = require('../schemas/CalendarSchema');

CalendarSchema.pre(['save', 'findOneAndUpdate'], function (next) {
  this.updatedAt = Date.now();
  return next();
});

const Calendar = mongoose.model('Calendar', CalendarSchema, 'calendars');

module.exports = Calendar;
