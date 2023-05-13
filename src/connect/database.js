const dotenv = require('dotenv');

const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE_CONNECTION_STRING.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

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
