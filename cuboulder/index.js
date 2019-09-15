'user strict'

const fs = require('fs');
const puppeteer = require('puppeteer');
const { twitterCreds } = require('../.secret.js');

const URL = 'https://twitter.com/CUBoulder/followers';
const { username, pass } = twitterCreds;
const regex = /.*\s*\n/g;

function extractItem() {
  const items = document.querySelectorAll('main > div > div > div > div > div section > div > div > div > div');
  let texts = [];

  for(item of items) {
    texts.push(item.innerText);
  }

  return texts;
}

function formatItems(items) {
  let results = items.map((item) => item.match(regex) ? item.match(regex)[0] : '')
  results = results.map((item) => item.trim());
  return new Set(results);
}

async function scrollToBottom(
  page,
  extractItem,
  itemTargetCount,
  scrollDelay = 1000,
) {
  let items = [];
  try {
    let previousHeight;
    let count = 0;
    while (count < itemTargetCount) {
      const newItems = await page.evaluate(extractItem);
      const fileItems = formatItems(newItems);
      items = [...items, ...fileItems];
      const set = new Set(items)
      
      // add individual "new" items to end of file
      for (item of fileItems) {
        fs.appendFile('results.txt', `${item}\n`, (e) => {
          if (e) throw e;
        });
      }

      // record all items up to this point
      fs.writeFile('set.txt', JSON.stringify(Array.from(set)), (e) => {
        if (e) throw e;
      });

      console.log(count, set.size)

      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitFor(scrollDelay);
      count++;
    }
  } catch(e) { }
  return items;
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL);

  await page.waitFor(3000);
  await page.type('input.js-username-field', username, { delay: 10 });

  console.log('1')

  await page.waitFor(1000);
  await page.type('input.js-password-field', pass, { delay: 10 });

  console.log('2')

  await page.waitFor(5000);

  console.log("Logged in")

  const items = await scrollToBottom(page, extractItem, 4000);

  console.log("RESULTS: ", items.length)

  await page.waitFor(3000);
  await browser.close();
})()