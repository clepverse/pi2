require('dotenv').config();

// const Redis = require('ioredis');

// const redis = new Redis({
//   port: process.env.REDIS_PORT,
//   host: process.env.REDIS_HOST,
//   password: process.env.REDIS_PASSWORD,
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// module.exports = redis;

module.exports = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
};
