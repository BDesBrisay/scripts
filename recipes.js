const cheerio = require('cheerio');
const fetch = require('node-fetch');



async function main() {
  try {
    let res = await fetch('https://github.com/');
    let text = await res.text();

    const $ = cheerio.load(text);
    console.log($.html());
    console.log('hello')
  }
  catch (e) {
    console.error(e);
  }
}

main();