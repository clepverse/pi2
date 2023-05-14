require('dotenv').config();

const Queue = require('./lib/Queue');

Queue.process();

console.log('Queue is running...');
console.log('Queue: http://localhost:3333/admin/queues');
