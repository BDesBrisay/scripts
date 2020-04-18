const { prons } = require('./commonProns.js');

console.log(prons.length);

const one = prons.filter(obj => obj.syllables.length === 1);
const two = prons.filter(obj => obj.syllables.length === 2);
const three = prons.filter(obj => obj.syllables.length === 3);
const four = prons.filter(obj => obj.syllables.length === 4);

console.log(one.length, two.length, three.length, four.length);

async function main(input) {
  try {
    let str = '';
    for (let i in input) {
      const val = input[i];
      const matches = one.filter(item => item.syllables[0] === val);


      const index = Math.floor(Math.random() * matches.length);
      const word = matches[index];
      str += word.word + ' '
    }

    console.log(str);
  }
  catch (error) {
    console.error(error);
  }
}

main([1,0,1,0,1,0,1,0]);