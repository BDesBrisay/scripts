'use strict'

const fs = require('fs');
const readline = require('readline');
const { promisify } = require('util');

const appendFileAsync = promisify(fs.appendFile);

const FILENAME_IN = 'allFormEmails-3letters.txt';
const FILENAME_OUT = 'uniqueEmails-3letters.txt';

const rl = readline.createInterface({
  input: fs.createReadStream(FILENAME_IN),
  crflDdelay: Infinity
});

const lines = [];

rl.on('line', (line) => lines.push(JSON.parse(line)));

rl.on('close', () => main());

async function main() {
  console.log(lines.length);

  const set = [...new Set(lines)];

  console.log(set.length);

  for (let item of set) {
    await appendFileAsync(FILENAME_OUT, `${item}\n`)
  }
}