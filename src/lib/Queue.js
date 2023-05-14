const Queue = require('bull');
const redisConfig = require('../config/redis');
const jobs = require('../jobs');

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

module.exports = {
  queues,
  add(name, data) {
    try {
      const queue = this.queues.find((queue) => queue.name === name);

      if (!queue) {
        throw new Error(`QUEUE ${name} NOT FOUND`);
      }

      return queue.bull.add(data, queue.options);
    } catch (err) {
      console.log('QUEUE ERROR [ADD]:', err?.message);
    }
  },
  process() {
    try {
      return Promise.all(
        this.queues.map((queue) => {
          queue.bull.on('failed', (job, result) => {
            console.log('Job failed', queue.key, job.data);
            console.log(result);
          });

          queue.bull.on('error', (job, result) => {
            console.log('Job error', queue.key, job.data);
            console.log(result);
          });

          return queue.bull.process(queue.handle).then(() => {});
        }),
      );
    } catch (err) {
      console.log('QUEUE ERROR [PROCESS]:', err?.message);
    }
  },
};
