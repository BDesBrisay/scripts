const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function main() {
  try {
    let links = [];

    for (let i = 1; i <= 56; i++) {
      await getRecipePage(i, links);
    }

    //add links to file
    console.log(links)
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