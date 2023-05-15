const yup = require('yup');

module.exports = {
  email: yup
    .string()
    .email('Formato de email inválido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
};
