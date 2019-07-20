const vowel = [
  'a','e','i','o','u','y'
];

const consta = [
  'b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','z'
];

function getVowel() {
  const rand = Math.floor(Math.random() * vowel.length);
  return vowel[rand];
};

function getConsta() {
  const rand = Math.floor(Math.random() * consta.length);
  return consta[rand];
};

function getName() {
  let name = '';
  for (let i = 0; i < 6; i++) {
    if (i % 2) {
      name += getVowel();
    }
    else {
      name += getConsta();
    }
  }
  return name;
};

function main() {
  const name = getName();
  const p = document.querySelector('#name');
  p.textContent = name;
};

main();