const NodePoolScraper = require('node-pool-scraper');
const password = require('../.secret.js').password;

const scraper = new NodePoolScraper({
  max: 1, 
  min: 1,
  idleTimeoutMillis: 100000,
  headless: false
});

const searches = [
  "Aardvark",
  "Albatross",
  "Alligator",
  "Alpaca",
  "Ant",
  "Anteater",
  "Antelope",
  "Ape",
  "Armadillo",
  "Donkey",
  "Baboon",
  "Badger",
  "Barracuda",
  "Bat",
  "Bear",
  "Beaver",
  "Bee",
  "Bison",
  "Boar",
  "Buffalo",
  "Butterfly",
  "Camel",
  "Capybara",
  "Caribou",
  "Cassowary",
  "Cat",
  "Caterpillar",
  "Chamois",
  "Cheetah",
  "Chicken",
  "Chimpanzee",
  "Chinchilla",
  "Chough",
  "Clam",
  "Cobra",
  "Cockroach",
  "Cormorant",
  "Coyote",
  "Crab",
  "Crane",
  "Crocodile",
  "Curlew",
  "Deer",
  "Dinosaur",
  "Dog",
  "Dogfish",
  "Dolphin",
  "Dotterel",
  "Dove",
  "Dragonfly",
  "Duck",
  "Dugong",
  "Eagle",
  "Eel",
  "Eland",
  "Elephant",
  "Elk",
  "Emu",
  "Falcon",
  "Ferret",
  "Finch",
  "Fish",
  "Flamingo",
  "Fly",
  "Fox",
  "Frog",
  "Gaur",
  "Gazelle",
  "Gerbil",
  "Giraffe",
  "Gnat",
  "Gnu",
  "Goat",
  "Goldfinch",
  "Goldfish",
  "Goose",
  "Gorilla",
  "Goshawk",
  "Grasshopper",
  "Grouse",
  "Guanaco",
  "Gull",
  "Hamster",
  "Hare",
  "Hawk"
];

async function runSearches({ url, browser }) {
  try {
    const page = await browser.newPage();
    let searchCount = 0;

    while (searchCount < 32) {
      const status = await page.goto(url, {
        waitUntil: 'domcontentloaded'
      });

      if (!status.ok) {
        console.error(`Cannot open ${url}`);
        throw new Error();
      }

      const search = searches[Math.round(Math.random() * searches.length)];
      console.log(search);

      const needsLogin = await page.evaluate(() => {
        return document.querySelector('input[name=email]');
      })

      if (needsLogin) {
        await page.type('input[name=email]', 'bryce@desbrisay.com', {
          delay: 10
        })
          
        await page.type('input[name=password]', password, {
          delay: 10
        })
        
        await page.click('#login-form button', {
          delay: 100
        })
        
        await page.waitFor(1000);
      }

      await page.type('#search', search, {
        delay: 10
      })

      await page.waitFor(500);

      await page.click('button[type=submit]', {
        delay: 100
      })

      let rand = Math.round(Math.random() * 8000) + Math.round(Math.random() * 8000) + 8000;
      console.log(rand);
      await page.waitFor(rand);

      searchCount++;
    }

    scraper.clear();
  }
  catch (e) {
    console.error(e);
  }
}

scraper.addTarget({
  url: 'https://www.presearch.org',
  func: runSearches
})