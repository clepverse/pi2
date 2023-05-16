const DB = require('../configs/db');

const mongoose = require('mongoose');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB conectado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar com a DB', error);
  });

module.exports = mongoose.connection;
