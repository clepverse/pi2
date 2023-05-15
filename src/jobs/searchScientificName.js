const { scientificName } = require('../services/gtp');

module.exports = {
  key: 'SearchScientificName',
  options: {
    delay: 500,
    attempts: 5,
  },
  async handle({ data }) {
    const { namePlant } = data;
    try {
      const scientificNameResult = await scientificName(namePlant);

      return scientificNameResult;
    } catch (err) {
      console.log('QUEUE ERROR [GPT]:', err?.message);
    }
  },
};
