require('dotenv').config({ path: './.env' });

const DB = '';
// const DB = process.env.DATABASE_CONNECTION_STRING.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );

module.exports = DB;
