const puppeteer = require('puppeteer');
const fs = require('fs');

const main = async () => {
    let links = [];

    for (let i = 1; i <= 2; i++) {
        await getLinks(i, links);
    }

    links = [].concat.apply([], links);
    console.log(links)
}

const getLinks = async (i, links) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.saveur.com/recipes-search?page=${i}`)
    console.log('loaded');

    const result = await page.evaluate(() => {
        let urls = [];
        let items = document.querySelectorAll('.result_title a');

        items.forEach((item) => {
            try {
                urls.push(`https://www.saveur.com${item.getAttribute('href')}`);
            }
            catch (e) {
                console.error(e);
            }
        });

        return urls;
    });

    links.push(result);
    browser.close();
}

main();