const DB = require('../config/db');

const mongoose = require('mongoose');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database conectado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar com a database', error);
  });

module.exports = mongoose.connection;
