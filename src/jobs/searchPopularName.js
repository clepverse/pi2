const { popularName } = require('../services/gtp');

module.exports = {
  key: 'SearchPopularName',
  options: {
    delay: 500,
    attempts: 5,
  },
  async handle({ data }) {
    const { namePlant } = data;
    try {
      const howToCareResult = await popularName(namePlant);

      return howToCareResult;
    } catch (err) {
      console.log('QUEUE ERROR [GPT]:', err?.message);
    }
  },
};
