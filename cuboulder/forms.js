'user strict'

const puppeteer = require('puppeteer');
const { promisify } = require('util');
const fs = require('fs')

const appendFileAsync = promisify(fs.appendFile);

const { googleCreds } = require('../.secret.js');
const { username, pass } = googleCreds;

const URL = 'https://docs.google.com/spreadsheets/d/1dxpVhV6n1bBxkwyh7_8drnENiH2sqIKhYGBBhpF0Fbs/edit#gid=0';
const DATA_FILE_PATH = './formEmails.txt';
const LETTERS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

async function getAutocomplete() {
  const frame = document.querySelector('iframe[title="Share with others"');
  const doc = frame.contentDocument;

  const acRows = doc.querySelectorAll('div[class=ac-row]');
  let results = [];

  for (let res of acRows) {
    results.push(res.textContent);
  }

  return results; 
}

async function typeLetters(page) {
  await page.waitFor(3000);
  let results = [];

  for (let l1 of LETTERS) {
    for (let l2 of LETTERS) {
      await page.waitFor(1000);
      await page.keyboard.type(l1 + l2);
      
      await page.waitFor(3000);
      const ac = await page.evaluate(getAutocomplete);
      
      results = [...results, ...ac];
      console.log(results.length);

      await page.keyboard.press('Backspace');
      await page.keyboard.press('Backspace');
    }
  }
  
  for (let item of results) {
    await appendFileAsync(DATA_FILE_PATH, `${JSON.stringify(item)}\n`);
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL);

  // EMAIL
  await page.waitFor(1000);
  await page.type('input[autocomplete=username]', username, { delay: 10 });

  await page.waitFor(1000);
  await page.keyboard.press(String.fromCharCode(13));

  // PASSWORD
  await page.waitFor(1000);
  await page.type('input[autocomplete=current-password]', pass, { delay: 10 });

  await page.waitFor(1000);
  await page.keyboard.press(String.fromCharCode(13));

  console.log('BEFORE');

  // CLICK SHARE
  await page.waitFor(5000);
  await page.click('#docs-titlebar-share-client-button > div');

  console.log('AFTER');

  await typeLetters(page);
})()