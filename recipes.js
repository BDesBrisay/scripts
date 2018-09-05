const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

async function main() {
  try {
    let links = [];

    for (let i = 1; i <= 56; i++) {
      await getRecipePage(i, links);
    }

    fs.writeFile('recipeLinks.txt', links, (e) => {
      if (e) throw e;
      console.log('Saved!');
    });
  }
  catch (e) {
    console.error(e);
  }
}

async function getRecipePage(i, links) {
  const res = await fetch(`https://pinchofyum.com/recipes?fwp_paged=${i}`);
  const text = await res.text();
  const $ = cheerio.load(text);

  $('.block-link').each((i, elem) => {
    links.push($(elem).attr('href'));
  })
}

main();