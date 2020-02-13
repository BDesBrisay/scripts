'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const { promisify } = require('util');

const appendFileAsync = promisify(fs.appendFile);
const writeFileAsync = promisify(fs.writeFile);

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

function timeout(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function main(url, school) {
  try {
    let data = [];
    for (let i of letters) {
      const newData = await grabPage(`${url}${i}`, school);
      data = [...data, ...newData];
      console.log(i, data.length);
      
      // console.log(i, newData.length);
      // await appendFileAsync(`${school}.json`, JSON.stringify(newData, null, 2));

      await timeout(Math.random * 5000);
    }

    console.log(data.length);
    await writeFileAsync(`${school}.json`, JSON.stringify(data, null, 2));
  }
  catch (error) {
    conslele.error(error);
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

    const data = await page.evaluate((school) => {
      const results = new Array(...document.querySelectorAll('.faculty-staff-list > ul > li'))
        .map((el) => {
          const name = el.querySelector('.first-name').innerText + ' ' + el.querySelector('.last-name').innerText;
          const title = el.querySelector('.job-title');
          const phone = el.querySelector('.bus-phone');
          const email = el.querySelector('.email > a');
          const education = el.querySelector('.education');
          const appointed = el.querySelector('.appointed');
          const image = el.querySelector('div > img');
  
          const res = { name, school };
          if (title) res.title = title.innerText;
          if (phone) res.phone = phone.innerText;
          if (email) res.email = email.dataset.username + '@' + email.dataset.domain;
          if (education) res.education = education.innerText.replace(/\n/g, ', ');
          if (appointed) res.appointed = appointed.innerText;
          if (image) res.image = image.src;
  
          return res;
        });
  
      return results;
    }, school);

    await page.close();
    await browser.close();

    return data;
  }
  catch (error) {
    console.error(error);
  }
}

// brunswick 
/* main(
  'https://my.brunswickschool.org/directory?letter=', 
  'brunswick'
); */

// buckley
/* main(
  'https://www.buckleyschool.org/about/faculty--staff?letter=', 
  'buckley'
); */

// collegiate
/* main(
  'https://www.collegiateschool.org/about-us/directory?letter=', 
  'collegiate'
); */

// dalton
/* main(
  'https://www.dalton.org/contact/faculty--staff-directory?letter=',
  'dalton',
); */

// grace
main(
  'https://www.gcschool.org/about-gcs/faculty--staff?letter=',
  'grace',
); /*/

// lrei
/* main(
  'https://www.lrei.org/our-program/faculty--staff?letter=',
  'lrei',
); */

// marymount
/* main(
  'https://www.marymountnyc.org/about/faculty/facultystaff-directory?letter=',
  'maymount',
); */

// poly
/* main(
  'https://www.polyprep.org/about-poly/faculty--staff?letter=',
  'poly',
); */

// spence
/* main(
  'https://www.spenceschool.org/about-spence/contact-us?letter=',
  'spence',
); */



/*
// grace
main(
  'https://www.marymountnyc.org/about/faculty/facultystaff-directory?letter=',
  'grace',
); */
/*
// grace
main(
  'https://www.marymountnyc.org/about/faculty/facultystaff-directory?letter=',
  'grace',
); */
/*
// grace
main(
  'https://www.marymountnyc.org/about/faculty/facultystaff-directory?letter=',
  'grace',
); */
