require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);

exports.popularName = async (plant) => {
  const completion = await openAi.createCompletion({
    model: 'text-davinci-003',
    prompt: 'me diga apenas o nome popular do ' + plant + ', mais nada ?',
    max_tokens: 1500,
    temperature: 0.9,
  });
  let answer = completion.data.choices[0].text;
  answer = answer.trim().replace(/[^\w\s]/gi, '');
  return answer;
};

exports.scientificName = async (plant) => {
  const completion = await openAi.createCompletion({
    model: 'text-davinci-003',
    prompt: 'me diga apenas o nome científico do ' + plant + ', mais nada ?',
    max_tokens: 1500,
    temperature: 0.9,
  });
  let answer = completion.data.choices[0].text;
  //regex to remove all special characters, except spaces
  answer = answer.trim().replace(/[^\w\s]/gi, '');
  return answer;
};

exports.howToCare = async (plant) => {
  const completion = await openAi.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Como cuidar de um ' + plant + '?',
    max_tokens: 1500,
    temperature: 0.9,
  });
  let answer = completion.data.choices[0].text;

  // eliminate também os \n por pular linha
  answer = answer.trim().replace(/[^\w\s]/gi, '');
  answer = answer.replace(/\n/g, '');
  answer = answer.replace(/(\r\n|\n|\r)/gm, '');
  return answer;
};
