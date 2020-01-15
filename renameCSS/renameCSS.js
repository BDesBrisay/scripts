const fs = require('fs');
const readline = require('readline');

function rename(filename, cssPath, htmlPath, htmlExt) {
  const css = readline.createInterface({
    input: fs.createReadStream(cssPath + '/' + filename + '.css'),
    crflDdelay: Infinity
  });

  const oldClasses = [];
  const newClasses = [];
  let newCSS = '';

  css.on('line', (content) => {
    let line = content;
    const match = line.match(/[\.].*[{]/g) || [];
    
    if (match.length) {
      const subClass = line.match(/[\.]\w+/g, '')[0];
      const oldClass = subClass.substr(1);
      const newClass = `${filename}-${oldClass}`;

      if (!oldClasses.includes(oldClass)) {
        oldClasses.push(oldClass);
        newClasses.push(newClass);
      }

      line = line.replace(oldClass, newClass);
    }

    newCSS += line + '\n';
  });

  css.on('close', async () => {
    // write new css file to:
    await fs.writeFile(`${cssPath}/${filename}-RENAMED.css`, newCSS, (e) => {if (e) throw(e)});

    // go through html and replace old class with new class
    // REGEX: /class=".*CLASSNAME.*"/g
    const html = readline.createInterface({
      input: fs.createReadStream(htmlPath + '/' + filename + htmlExt),
      crflDdelay: Infinity
    });
  
    let newHTML = '';
  
    html.on('line', (content) => {
      let line = content;

      console.log(oldClasses)

      // replace classes
      // check for class="className"
      for (let item of oldClasses) {
        const classRegex = new RegExp('class=".*' + item + '.*"');
        const classMatch = line.match(classRegex) || [];

        if (classMatch.length) {          
          const newClass = `${filename}-${item}`;
          line = line.replace(item, newClass);
        }
      }

      // replace imports
      // check for type="text/css"
      const cssFileRegex = new RegExp(filename + '.css');
      const cssFileMatch = line.match(cssFileRegex) || [];
      if (cssFileMatch.length) {
        line = line.replace('.css', '-RENAMED.css');
      }
  
      newHTML += line + '\n';
    });
  
    html.on('close', async () => {
      console.log(newHTML)
      // create new html file
      await fs.writeFile(`${htmlPath}/${filename}-RENAMED${htmlExt}`, newHTML, (e) => {if (e) throw(e)});
    });
  });

  console.log('FINISHED')
}

function renameCSS(names, cssPath, htmlPath, htmlExt = '.html') {
  for (let name of names) {
    rename(name, cssPath, htmlPath, htmlExt);
  }
}

let names = [
  'Landing',
  'SignIn',
  'Streams',
  'Roulette',
  'Buddies',
  'Stream'
];

const cssPath = '../../blazebuddies/web/css';
const htmlPath = '../../blazebuddies/web/components';
const htmlExt = '.js';

renameCSS(names, cssPath, htmlPath, htmlExt);