const letters = [
  '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'
];

function getLetter() {
  const rand = Math.floor(Math.random() * letters.length);
  return letters[rand];
};

function getColor() {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += getLetter();
  }
  return color;
};

function main() {
  const color = getColor();

  const root = document.querySelector('body');
  const p = document.querySelector('#color');

  root.style.backgroundColor = color;
  p.innerHTML = color;
};

main();
