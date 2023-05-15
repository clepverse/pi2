const yup = require('yup');

module.exports = {
  nickName: yup.string(),
  dateOfPurchase: yup.date(),
};
