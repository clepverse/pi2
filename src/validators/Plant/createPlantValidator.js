const yup = require('yup');

module.exports = {
  namePlant: yup.string().required('Obrigatório informar o nome da planta'),
  nickName: yup.string(),
  dateOfPurchase: yup.date(),
};
