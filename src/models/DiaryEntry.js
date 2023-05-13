const mongoose = require('mongoose');

const DiaryEntrySchema = require('../schemas/DiarySchema');

DiaryEntrySchema.pre(['findOneAndUpdate', 'save'], function (next) {
  this.updatedAt = new Date();
  next();
});

DiaryEntrySchema.post('save', function ({ name, code }, _, next) {
  if (name === 'MongoServerError' && code === 11000) {
    next(new Error('Entrada de diário já cadastrada'));
  }
  next();
});

DiaryEntrySchema.pre('save', async function (next) {
  const diaryEntry = this;

  const existingDiaryEntry = await DiaryEntry.findOne({
    day: diaryEntry.day,
    month: diaryEntry.month,
    year: diaryEntry.year,
  });

  if (existingDiaryEntry) {
    const error = new Error('Já existe uma entrada de diário com esta data');
    return next(error);
  }

  return next();
});

DiaryEntrySchema.statics.upsertMany = async function (entries) {
  const promises = entries.map((entry) =>
    this.findOneAndUpdate(
      { day: entry.day, month: entry.month, year: entry.year },
      { description: entry.description },
      { new: true, upsert: true },
    ).then(({ _id }) => _id),
  );

  return await Promise.all(promises);
};

const DiaryEntry = mongoose.model(
  'DiaryEntry',
  DiaryEntrySchema,
  'diaryentries',
);

module.exports = DiaryEntry;
