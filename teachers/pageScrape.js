'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const { promisify } = require('util');

const appendFileAsync = promisify(fs.appendFile);
const writeFileAsync = promisify(fs.writeFile);


async function main(url, school) {
  try {
    const data = await grabPage(url, school);

    console.log(data.length);
    await writeFileAsync(`${school}.json`, JSON.stringify(data, null, 2));
  }
  catch (error) {
    console.error(error);
  }
}

async function grabPage(url, school) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const status = await page.goto(url, {
      waitUntil: ['domcontentloaded', 'load', 'networkidle0']
    });

    if (!status.ok) {
      console.error(`Cannot open ${url}`);
      throw new Error();
    }

    const data = await page.evaluate(async (school, timeout) => {
      function timeout(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

      let all = [];
      while (all.length < 400 && document.querySelector('.fsNextPageLink')) {
        const items = new Array(...document.querySelectorAll('.fsConstituentItem'))
          .map((el, i) => {
            const name = el.querySelector('.fsFullName').innerText;
            const title = el.querySelector('.fsTitles');
            const phone = el.querySelector('.fsPhone') || el.querySelector('.fsPhones');
            const email = el.querySelector('.fsEmail a');
            const location = el.querySelector('.fsLocation') || el.querySelector('.fsLocations');
            const image = el.querySelector('.fsThumbnail');
            const education = el.querySelector('.fsDegrees');
    
            const res = { name, school };
            if (title) res.title = title.innerText;
            if (phone) res.phone = phone.innerText;
            if (location) res.location = location.innerText;
            if (image) res.image = image.src;
            if (education) res.education = education.innerText.replace('\n', ', ');
            if (email) res.email = email.href;
            else res.email = name[0] + name.split(' ')[1]+ `@${school}.edu`;

            return res;
          });

        console.log(all.length, items.length);
        all = [...all, ...items];

        document.querySelector('.fsNextPageLink').click();
        await timeout(3000);
      }

      return all;
    }, school);

    // await page.close();
    // await browser.close();

    return data;
  }
  catch (error) {
    console.error(error);
  }
}

// nightingale
/* main(
  'https://www.nightingale.org/about/faculty-staff-directory',
  'nightingale',
); */

// winward
/* main(
  'https://www.thewindwardschool.org/community/faculty-staff/faculty-staff-directory-clone-clone',
  'winward',
); */

// packer
/* main(
  'https://www.packer.edu/about/faculty-staff',
  'packer',
); */

// horace
/* main(
  'https://www.horacemann.org/our-school/faculty-staff-directory',
  'horace'
); */

// chapin
main(
  'https://www.chapin.edu/about/chapin-community/professional-community-directory',
  'chapin'
);