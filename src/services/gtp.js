require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.popularName = async (plant) => {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'me diga apenas o nome popular do ' + plant + ', mais nada ?',
    max_tokens: 1500,
    temperature: 0.9,
  });
  let anwser = completion.data.choices[0].text;
  anwser = anwser.replace('.', '');
  return anwser;
};

exports.scientificName = async (plant) => {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'me diga apenas o nome científico do ' + plant + ', mais nada ?',
    max_tokens: 1500,
    temperature: 0.9,
  });
  var anwser = completion.data.choices[0].text;
  anwser = anwser.replace('.', '');
  return anwser;
};

exports.howToCare = async (plant) => {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Como cuidar de um ' + plant + '?',
    max_tokens: 1500,
    temperature: 0.9,
  });
  return completion.data.choices[0].text;
};
