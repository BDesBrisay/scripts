'user strict'

const puppeteer = require('puppeteer');
const { promisify } = require('util');
const fs = require('fs')

const appendFileAsync = promisify(fs.appendFile);

const { instagramCreds } = require('../.secret.js');
const { username, pass } = instagramCreds;
const URL = 'https://www.instagram.com/accounts/login/?next=%2Fcuboulder%2Ffollowers%2F&source=followed_by_list';
const DATA_FILE_PATH = './followers.txt';

async function scrollDiv() {
  const container = document.querySelector('div[role="dialog"] > .isgrP');

  const height = container.scrollHeight;

  container.scrollTo({
    top: height,
    left: 0,
    behavior: 'smooth'
  })

  return height;
}

async function scrollFollowers(page) {
  count = 0;

  // 78031 total follower / 12 items each time = 6502

  while (count < 6502) {
    const scrolled = await page.evaluate(scrollDiv);
    console.log('Scrolled: ', count, scrolled)

    const scrollDelay = Math.floor(Math.random() * 3000) + 1000;
    await page.waitFor(scrollDelay);
    count++;
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL);

  await page.waitFor(1000);
  await page.type('input[name="username"]', username, { delay: 10 });

  console.log('1')

  await page.waitFor(2000);
  await page.type('input[name="password"]', pass, { delay: 10 });

  console.log('2')

  await page.waitFor(6000);

  console.log("Logged in")

  await page.click('a[href="/cuboulder/followers/"]');

  console.log('Clicked')
  await page.waitFor(1000);

  page.on('response', async (res) => {
    try {
      const url = await res.url();
      if (url.match(/https:\/\/www.instagram.com\/graphql\/query\/\?query_hash=*/g)) {
        const json = await res.json();
        const { data: { user: { edge_followed_by } } } = json;
        if (edge_followed_by) {
          const edges = edge_followed_by.edges;
          console.log(edges.length)
          for (item of edges) {
            await appendFileAsync(DATA_FILE_PATH, `${JSON.stringify(item.node)}\n`);
          }
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  });

  console.log('Scrolling in 5s...')
  await page.waitFor(5000)
  console.log('Scrolling now')

  await scrollFollowers(page)

  // await page.waitFor(3000);
  // await browser.close();
})()