const DB = require('../configs/db');

const mongoose = require('mongoose');

const mongoURL = `mongodb://localhost:${process.env.MONGO_CONTAINER_PORT}/${process.env.MONGO_DATABASE_NAME}`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB conectado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar com a DB', error);
  });

module.exports = mongoose.connection;
