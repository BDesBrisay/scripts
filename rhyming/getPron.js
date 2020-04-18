const fetch = require('node-fetch');
const fs = require('fs');
const readline = require('readline');
const cheerio = require('cheerio');

const rl = readline.createInterface({
  input: fs.createReadStream(`commonWords.txt`),
  crflDdelay: Infinity
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  main(lines);
});

async function main(lines) {
  try {
    lines.slice(800, 1000).map(async (line, i) => {
      console.log(i, line);
      const res = await getPron(line);
      if (res) {
        await fs.appendFile(
          `commonProns.txt`,
          `${JSON.stringify(res)}\n`,
          (e) => {if (e) throw e}
        );
      }
    });
  }
  catch (error) {
    console.error(error);
  }
}

const getPron = async (term) => {
  try {
    const res = await fetch(`http://www.speech.cs.cmu.edu/cgi-bin/cmudict?in=${term}&stress=-s#phones`);
    const text = await res.text();
    const $ = cheerio.load(text);
    const obj = { 
      word: term,
      pron: '',
      syllables: [0, 1, 0],
    };

    const pron = $('body > div > tt:nth-child(5)').text();
    if (pron.length) {
      console.log(pron);
      obj.pron = pron;
      const syllables = pron.match(/\d/g);
      if (syllables.length) obj.syllables = syllables.map((item) => parseInt(item));

      console.log(syllables)
      return obj;
    }
    console.log('NO PRON')
    return false;
  }
  catch (e) {
    console.error(e);
    return false;
  }
}