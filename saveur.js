const puppeteer = require('puppeteer');
const fs = require('fs');

const main = async () => {
    getLinks(1, []);
}

const getLinks = async (i, links) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 600 });
    await page.goto(`https://www.saveur.com/recipes-search?page=2`)
}

main();