const database = require('./connect/database');
const express = require('express');

const { ExpressAdapter } = require('@bull-board/express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');

const Queue = require('./lib/Queue');

const routes = require('./routes');
const cors = require('cors');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: Queue.queues.map((queue) => new BullAdapter(queue.bull)),
  serverAdapter: serverAdapter,
});

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use('/admin/queues', serverAdapter.getRouter());

const port = process.env.PORT || 3333;

database.once('open', () => {
  app.listen(port, () => {
    console.log(`Servidor está rodando na porta: ${port}`);
  });
});

database.on('error', (error) => {
  console.error('Erro ao conectar a DB', error);
});
