'user strict'

const puppeteer = require('puppeteer');
const { twitterCreds } = require('../../.secret.js');

const URL = 'https://twitter.com/CUBoulder/followers';
const { username, pass } = twitterCreds;
const regex = /.*\s*\n/g;

function extractItem() {
  const items = document.querySelectorAll('main > div > div > div > div > div section > div > div > div > div');
  let texts = [];

  for(item of items) {
    console.log(item)
    texts.push(item.innerText);
  }

  console.log(items)
  console.log(texts)
  return texts;
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
      count++;
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitFor(scrollDelay);
    }
    items = await page.evaluate(extractItem);
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

  await page.waitFor(3000);
  await page.type('input.js-password-field', pass, { delay: 10 });

  console.log('2')

  await page.waitFor(5000);

  console.log("Logged in")

  const items = await scrollToBottom(page, extractItem, 10);

  console.log(items)

  let results = items.map((item) => item.match(regex)[0])
  results = results.map((item) => item.trim())

  console.log(results.length)

  await page.waitFor(3000);
  // await browser.close();
})()