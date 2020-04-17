const fetch = require('node-fetch');
const fs = require('fs');
const readline = require('readline');

function readFile(path, cb) {
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    crflDdelay: Infinity
  });

  const lines = [];

  rl.on('line', (line) => {
    lines.push(line.trim());
  });

  rl.on('close', () => {
    cb(lines);
  });
}

async function main(input) {
  try {
    const words = input.split(' ');
    let string = '';
    for (let w of words) {
      string += `${w}\t\t\t`;
    }
    console.log(string);

    const likeWords = [];
    for (let i in words) {
      const word = words[i];
      const rhymes = require(`./rhymes/${word}.json`);
      
      const likeWord = [];
      for (let j = 0; j < 10; j++) {
        const index = Math.floor(Math.random() * rhymes.length);
        likeWord.push(rhymes[index].word);
      }

      likeWords[i] = likeWord;
    }

    for (let k = 0; k < 10; k++) {
      let str = '';
      for (let c of likeWords) {
        str += `${c[k]}\t\t\t`;
      }
      console.log(str);
    }
  }
  catch (error) {
    console.error(error);
  }
}

main('I word you');