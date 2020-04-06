const crypto = require('crypto');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const readline = require('readline');

// const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const letters = 'xyz'.split('');

for (let i in letters) {
  const letter = letters[i];

  const rl = readline.createInterface({
    input: fs.createReadStream(`terms-${letter}.txt`),
    crflDdelay: Infinity
  });

  const lines = [];

  rl.on('line', (line) => {
    line = line.replace(/,\s*$/, '');
    lines.push(line);
  });

  rl.on('close', () => {
    main(lines, i);
  });

  console.log('finished');
}

async function main(lines, i) {
  try {
    const promises = lines.map(line => getTerm(line));
    const results = await Promise.all(promises);
    // console.log(results);

    if (i === 0) {
      fs.appendFile(
        `terms.js`, 
        'const terms = [\n', 
        (e) => {if (e) throw e}
      );
    }

    for (let i in results) {
      const term = results[i];
      console.log(i, term.title);
      if (term !== undefined) {
        await fs.appendFile(
          `terms.js`, 
          `\t${JSON.stringify(term)},\n`, 
          (e) => {if (e) throw e}
        );
      }
    }
    /*
    fs.appendFile(
      `terms.js`, 
      '];', 
      (e) => {if (e) throw e}
    );
    */
  }
  catch (error) {
    console.error(error);
  }
}

const getTerm = async (url) => {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const $ = cheerio.load(text);
    let term = { 
      url,
      takeaways: []
    };

    // term title
    let title = $('#article-heading_2-0').text();
    term.title = title.trim();

    // quick description
    let description = $('#mntl-sc-block_1-0-1').text();
    if (description === '') {
      description = $('#mntl-sc-block_1-0').text();
    }
    term.description = description.trim();

    // video
    // const video = $('.inline-video video').attr('src');
    // term.video = video;

    // takeaways
    $('.theme-whatyouneedtoknow li').each((i, item) => {
      term.takeaways[i] = $(item).text();
    })

    return term;
  }
  catch (e) {
    console.error(e);
  }
}