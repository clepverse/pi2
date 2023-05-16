require('dotenv').config();

const Queue = require('./lib/Queue');

Queue.process();

console.log('Fila online');
console.log('Dashboard: http://localhost:3333/admin/queues');
