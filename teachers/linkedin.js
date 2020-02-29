'user strict'

const puppeteer = require('puppeteer');
const google = require('google');
const { promisify } = require('util');
const fs = require('fs');

const teachers = require('./ny-schools.json');
const OUT_FILE = './nyWithLinks.json';
const FULL_OUT_FILE = './ALL-nyWithLinks.json';

const writeFileAsync = promisify(fs.writeFile);
const appendFileAsync = promisify(fs.appendFile);

/* GOOGLE
const URL = 'https://www.google.com';
const searchSelector = '#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input';
const linkSelector = '#rso > div:nth-child(1) > div > div:nth-child(1) > div > div > div.r > a';
*/

const URL = 'https://www.duckduckgo.com';
const searchSelector = '#search_form_input_homepage';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getResult = async (i, name, school) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const query = `site:linkedin.com ${name}`; // ${school}`

    await page.goto(URL);
    await page.type(searchSelector, query, { delay: 10 });
    await page.keyboard.press(String.fromCharCode(13));

    const wait = Math.ceil(Math.random() * 5000);
    await page.waitFor(wait);

    const link = await page.evaluate(() => {
      const linkSelector = '#r1-0 > div > h2 > a.result__a';
      const result = document.querySelector(linkSelector);
      if (result) return result.href;
      else return false;
    });

    console.log(i, name, school, link)

    await page.waitFor(wait);

    await page.close();
    await browser.close();

    return link;
  }
  catch (e) {
    console.error(e);
  }
}

async function googleResult(i, name, school) {
  try {
    console.log(i, name, school)
    const query = `site:linkedin.com ${name}`;

    let link = await google(query, (err, res) => {
      if (err) console.error(err);
      if (res && res.links) return res.links[0];
    });

    console.log(link)

    return link;
  }
  catch (e) {
    console.error(e);
  }
}

const debug = async (i, name, school) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const query = `site:linkedin.com ${name}`; // ${school}`

    await page.goto(URL);
    await page.type('#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input', query, { delay: 10 });
    await page.keyboard.press(String.fromCharCode(13));

    const wait = Math.ceil(Math.random() * 20000);
    await page.waitFor(wait);

    const link = await page.evaluate(() => {
      const result = document.querySelector('#rso > div:nth-child(1) > div > div:nth-child(1) > div > div > div.r > a');
      if (result) return result.href;
      else return false;
    });

    console.log(i, name, school)

    return link;
  }
  catch (e) {
    console.error(e);
  }
}

async function main() {
  await appendFileAsync(OUT_FILE, '[\n');

  let data = [];
  let place = 821;

  console.log(place, ' / ', teachers.length);
  const arr = teachers.slice(place);

  for (let i in arr) {
    const item = arr[i];

    // const res = await googleResult(i, item.name, item.school);
    const res = await getResult(i, item.name, item.school);
    if (res) item.link = res;

    data.push(item);
    await appendFileAsync(OUT_FILE, `\t${JSON.stringify(item)},\n`);

    console.log('DONE:', (i + place))
    await sleep(5000);
  }

  await appendFileAsync(OUT_FILE, ']');

  console.log(data.length);
  await writeFileAsync(FULL_OUT_FILE, JSON.stringify(data));
}

main();
// debug(1, 'bobby', 'brown');