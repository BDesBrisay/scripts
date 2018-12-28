(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let password = 'h1ghl4nd12345';
let AlphaVantageAPI = '9RUKGUEQ3Y8VOFG9';
module.exports = { 
  password,
  AlphaVantageAPI
};
},{}],2:[function(require,module,exports){
'use strict';
const AlphaVantageAPI = require('../.secret.js');

const getData = () => {
  const IEX = fetch(
    'https://api.iextrading.com/1.0/stock/aapl/chart/3m', 
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  ).then(res => res.json());

  const AVSAR = fetch(
    `https://www.alphavantage.co/query?function=SAR&symbol=AAPL&interval=weekly&acceleration=0.05&maximum=0.25&apikey=${AlphaVantageAPI}`,
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  )

  console.log(IEX, AVSAR);
  return { IEX, AVSAR };
}

module.exports = { getData };
},{"../.secret.js":1}],3:[function(require,module,exports){
'use strict';
const { getData } = require('./getData.js');

const { IEX, AVSAR } = getData;

const scale = 165;

const scaleUp = (obj) => ({
  vwap: obj.vwap,
  open: obj.open * scale,
  close: obj.close * scale
});

const scaleDown = (obj) => ({
  vwap: obj.vwap,
  open: obj.open / scale,
  close: obj.close / scale
});

const normalize = (obj) => {
  // console.log(obj)
  // const gain = obj.close > obj.open ? 1 : 0;
  return { input: { open: obj.open, vwap: obj.open - obj.vwap }, output: { gain: obj.open - obj.close } }
}

const main = async () => {
  const root = document.getElementById('root');
  let content = `
    <div>
      <h1>Predicting close with vwap difference</h1>
  `;

  const raw = await fetch('https://api.iextrading.com/1.0/stock/aapl/chart/3m', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json());

  const trainingData = raw.map(normalize);

  const net = new brain.NeuralNetwork({ hiddenLayers: [15] })

  content += '<p>Training...</p>';
  net.train(trainingData);

  content += '<p>Backtesting...</p>';
  const results = [];
  for (let i = 0; i < trainingData.length; i++) {
    const res = net.run(trainingData[i].input)
    results.push(Math.round(res) === trainingData[i].output[0]);
    if (i === trainingData.length - 1) content += `<p>${res}</p>`;
  }

  const correct = results.filter(item => item === true).length;
  content += `<p>Accuracy: ${(100 * correct / results.length).toFixed(0)}% (${correct} / ${results.length})`;

  content += '</div>'
  root.insertAdjacentHTML('beforeend', content);
}

main()

/*
const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 5,
  hiddenLayers: [8, 8],
  outputSize: 5
});
*/
},{"./getData.js":2}]},{},[3]);
