const yup = require('yup');

module.exports = {
  plantSaveId: yup.string(),
  title: yup.string().required('Título é obrigatório'),
  date: yup.date().required('Data é obrigatória'),
};
