const mongoose = require('mongoose');

const CalendarSchema = require('../schemas/CalendarSchema');

CalendarSchema.pre(['findOneAndUpdate'], function (next) {
  this.findeOneAndUpdate({}, { updatedAt: new Date() }).exec(() => {
    next();
  });
});

const Calendar = mongoose.model('Calendar', CalendarSchema, 'calendars');

module.exports = Calendar;
