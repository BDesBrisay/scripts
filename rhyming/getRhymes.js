const fetch = require('node-fetch');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream(`commonWords.txt`),
  crflDdelay: Infinity
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  main(lines);
});

async function main(lines) {
  try {
    lines.slice(8, 9).map(async (line, i) => {
      console.log(i, line);
      const res = await getRhyme(line);
      if (res) {
        await fs.writeFile(
          `rhymes/${line}.json`,
          `${JSON.stringify(res)}`,
          (e) => {if (e) throw e}
        );
      }

      setTimeout(() => console.log(i, 'Waited'), 1000);
    });
  }
  catch (error) {
    console.error(error);
  }
}

const getRhyme = async (term) => {
  try {
    const res = await fetch(`https://rhymebrain.com/talk?function=getRhymes&word=${term}`);
    const text = await res.text();
    const json = JSON.parse(text);

    const obj = json.filter((word) => (
      word.score === 300 || (word.flags.includes('bc') && word.score > 100)
    ));
    return obj;
  }
  catch (e) {
    console.error(e);
    return false;
  }
}