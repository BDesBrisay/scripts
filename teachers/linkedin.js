'user strict'

const puppeteer = require('puppeteer');
const { promisify } = require('util');
const fs = require('fs');

const teachers = require('./dalton.json');
const OUT_FILE = './daltonLinks.json';
const writeFileAsync = promisify(fs.writeFile);

const URL = 'https://www.google.com';

const getResult = async (name, school) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const query = `site:linkedin.com ${name}`; // ${school}`

    await page.goto(URL);
    await page.type('#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input', query, { delay: 10 });
    await page.keyboard.press(String.fromCharCode(13));

    console.log(name, school)
    const wait = (Math.random() * 1000).toFixed(0);
    await page.waitFor(wait);

    const link = await page.evaluate(() => {
      const result = document.querySelector('#rso > div > div > div:nth-child(1) > div > div > div.r > a');
      if (result) return result.href;
      else return false;
    });

    await page.waitFor(wait);

    await page.close();
    await browser.close();

    return link
  }
  catch (e) {
    console.error(e);
  }
}

async function main() {
  let data = [];
  for (let item of teachers) {
    const res = await getResult(item.name, item.school);
    if (res) item.link = res;

    data.push(item);
  }
  console.log(data.length);

  await writeFileAsync(OUT_FILE, JSON.stringify(data));

  /*
  getResult('bobby', 'brown')
  */
}

main();