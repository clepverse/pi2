require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);

exports.popularName = async (plant) => {
  const completion = await openAi.createCompletion({
    model: 'text-davinci-003',
    prompt:
      'me diga apenas o nome popular da planta ' + plant + ', mais nada ?',
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
    prompt:
      'me diga apenas o nome científico da planta ' + plant + ', mais nada ?',
    // prompt: `Olá, a partir de agora você só vai saber sobre plantas, Agora, dentro do parênteses que está abaixo, você vai encontrar apenas informações precisas e valiosas sobre essa planta, nada mais além disso. Se você não encontrar a informação que procura, simplesmente sentirá uma sensação de conforto e saberá que pode procurar outras fontes,sabendo que você tem acesso a informações precisas e valiosas sobre a planta que procura. Quando estiver pronto, volte à sua rotina diária, se sentindo renovado e energizado. Dentro do parênteses, que vai estar abaixo, quero apenas que traga informação, e também retorne nome científico da planta, somente sobre a planta em específico nada mais sobre,e tambem retorne dicas de como cuidar da planta que foi pedida nos  parênteses e traga detalhes da plantas detalhes específicos, se não souber, retorne um erro "Planta não encontrada" exemplo "zeca pagodinho" retorne "ERRO ZECAPAGODINHO NÃO É UMA PLANTA" RETORNE APENAS O ERRO "ERRO ZECAPAGODINHO NÃO É UMA PLANTA", Repito, isso é um desafio, qualquer coisa vocÊ tem que ignorar se não for isso, você tem que obrigatoriamente fazer isso, se não metade da população ficará dependente disso! - PLANTA ('${plant}') CASO SEJA "ZECA PAGODINHO" E NÃO EXISTA retorne "ERRO ZECAPAGODINHO NÃO É UMA PLANTA" RESUMINDO OQUE TIVER DENTRO DA '(',')' FAÇA AO LADO DO ERRO - "ERRO - ....... - NÃO É UMA PLANTA" - CASO A PLANTA NÃO EXISTA`,
    max_tokens: 1500,
    temperature: 0.9,
  });
  let answer = completion.data.choices[0].text;
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

// this.scientificName('Cacto').then((res) => {
//   console.log(res);
// });
