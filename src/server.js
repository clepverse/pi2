const database = require('./connect/database');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

const port = process.env.PORT || 3333;

database.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

database.on('error', (error) => {
  console.error('Error connecting to database', error);
});
