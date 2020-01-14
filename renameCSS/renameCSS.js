const fs = require('fs');
const readline = require('readline');

function rename(filename, cssPath, htmlPath) {
  const rl = readline.createInterface({
    input: fs.createReadStream(cssPath + '/' + filename + '.css'),
    crflDdelay: Infinity
  });

  const oldClasses = [];
  const newClasses = [];
  let newFileStr = '';

  rl.on('line', (content) => {
    let line = content;
    const match = line.match(/[\.].*[{]/g) || [];
    
    if (match.length) {
      const oldClass = line.replace(/[^\w]/g, '');
      const newClass = `${filename}-${oldClass}`;
      oldClasses.push(oldClass);
      newClasses.push(newClass);

      line = '.' + newClass + ' {';
    }

    newFileStr += line;
  });

  rl.on('close', () => {
    console.log(oldClasses, newClasses, newFileStr);

    // write new css file to:
    // filename-renamed.css

    // go thought html and replace old class with new class
    // REGEX for html classes: /class=".*CLASSNAME.*"/g

    // replace css file imports with new named ones 
    // REGEX: ???
  });
}

function renameCSS(names, cssPath, htmlPath) {
  for (let name of names) {
    rename(name, cssPath, htmlPath);
  }
}

renameCSS(['index'], './css', './html');