const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

async function main() {
  try {
    let links = [];

    await getDeal(links);

    links.forEach((link, i) => {
      const regex = /\?position=[0-9]/g;
      links[i] = link.replace(regex, '');
    });

    new Set(links).forEach((link) => {
      fs.appendFile('deals.txt', `${link},\n`, () => {});
    });
  }
  catch (e) {
    console.error(e);
  }
}

async function getDeal(links) {
  const res = await fetch(`https://weedmaps.com/deals`);
  const text = await res.text();
  const $ = cheerio.load(text);

  const deal = /\/deals\//g;
  const sort = /\/deals\/by\//g;

  $('a').each((i, elem) => {
    const url = $(elem).attr('href');

    const isDeal = url.match(deal);
    const isSort = url.match(sort);
    
    if (isDeal && !isSort) {
      links.push(url);
    }
  })
}

main();