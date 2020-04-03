const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

async function main() {
  try {
    for (let i in letters) {
      let arr = [];

      await getLinks(arr, i);

      new Set(arr).forEach((link) => {
        fs.appendFile(`terms-${letters[i]}.txt`, `${link},\n`, () => {});
      });
    }
  }
  catch (e) {
    console.error(e);
  }
}

async function getLinks(links, i) {
  const letter = letters[i];
  const index = 50 + parseInt(i);
  console.log(letter, index)

  const res = await fetch(`https://www.investopedia.com/terms-beginning-with-${letter}-47693${index}`);
  const text = await res.text();
  const $ = cheerio.load(text);

  $('.dictionary-top300-list__list').each((i, elem) => {
    const url = $(elem).attr('href');
    links.push(url);
  })
}

main();