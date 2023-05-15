const yup = require('yup');

module.exports = {
  nickName: yup.string(),
  dateOfPurchase: yup.date(),
  userId: yup.string().required('Obrigatório está logado'),
  plantId: yup.string().required('Obrigatório informar o id da planta'),
  diaryEntriesId: yup.array().of(yup.string()),
};
