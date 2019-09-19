'user strict'

const puppeteer = require('puppeteer');
const { instagramCreds } = require('../.secret.js');

const URL = 'https://www.instagram.com/accounts/login/?next=%2Fcuboulder%2Ffollowers%2F&source=followed_by_list';
const { username, pass } = instagramCreds;
const regex = /.*\s*\n/g;


const waitMs = (ms) => {
  const start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > ms){
      break;
    }
  }
}

const promisify = (f) => {
  return function (...args) { // return a wrapper-function
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
    });
  };
};

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

async function scrollDiv() {
  const container = document.querySelector('div[role="dialog"] > .isgrP');

  const height = container.scrollHeight;

  console.log(height)

  container.scrollTo({
    top: height,
    left: 0,
    behavior: 'smooth'
  })
  /*
  if (count === 0) {
    container.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
  */
  return height;
}

async function scrollFollowers(page) {
  count = 0;

  while (count < 5) {
    const scrolled = await page.evaluate(scrollDiv);
    console.log('SCrolled: ', count, scrolled)

    await page.waitFor(2000);
    count++;
  }
}

async function interceptFollowers(page) {
  console.log('asdf')
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
        console.log('MATCHED')
        const json = await res.json();
        // const output = generateOutput({ url, rid, data: json });
        console.log(json);
        const { data: { user: { edge_followed_by } } } = json;
        console.log(JSON.stringify(edge_followed_by, null, 2))
        // await appendFileAsync(DATA_FILE_PATH, `${JSON.stringify(output)}\n`);
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

  // const items = await interceptFollowers(page);
  
  // await page.evaluate(scrollFollowers);
  
  /*
  const items = await scrollToBottom(page, extractItem, 1);

  console.log(items)

  let results = items.map((item) => item.match(regex)[0])
  results = results.map((item) => item.trim())

  console.log(results.length)

  await page.waitFor(3000);
  // await browser.close();
  */
})()