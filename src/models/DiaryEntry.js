const mongoose = require('mongoose');

const DiaryEntrySchema = require('../schemas/DiarySchema');

DiaryEntrySchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { $set: { updatedAt: new Date() } });

  next();
});

DiaryEntrySchema.post('save', function ({ name, code }, _, next) {
  if (name === 'MongoServerError' && code === 11000) {
    next(new Error('Entrada de diário já cadastrada'));
  }
  next();
});

// DiaryEntrySchema.statics.upsertMany = async function (plantSaveId, entries) {
//   const promises = entries.map(async (entry) => {
//     const doc = await this.findOneAndUpdate(
//       {
//         plantSaveId,
//         day: entry.day,
//         month: entry.month,
//         year: entry.year,
//       },
//       {
//         day: entry.day,
//         month: entry.month,
//         year: entry.year,
//         description: entry.description,
//       },
//       { new: true, upsert: true },
//     );

//     if (doc) {
//       const { _id } = doc;
//       return _id;
//     }

//     return null;
//   });

//   const results = await Promise.all(promises);

//   return results.filter((result) => result !== null);
// };

DiaryEntrySchema.statics.upsertOne = async function (plantSaveId, entry) {
  const date = new Date(entry.date);
  const dateString =
    date.getFullYear() +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + date.getDate()).slice(-2);

  const doc = await this.findOneAndUpdate(
    {
      plantSaveId,
      date: dateString,
    },
    {
      title: entry.title,
      date: dateString,
    },
    { new: true, upsert: true },
  );

  if (doc) {
    const { _id } = doc;
    return _id;
  }

  return null;
};

const DiaryEntry = mongoose.model(
  'DiaryEntry',
  DiaryEntrySchema,
  'diaryentries',
);

module.exports = DiaryEntry;
