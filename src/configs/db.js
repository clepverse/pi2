require('dotenv').config({ path: './.env' });

const DB = 0;
// const DB = process.env.DATABASE_CONNECTION_STRING.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );

module.exports = DB;
