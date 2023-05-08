const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE_CONNECTION_STRING.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {}).then((con) => {
  // console.log(con.connections);
  console.log('DB connection successful!');
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
