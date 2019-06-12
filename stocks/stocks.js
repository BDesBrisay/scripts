'use strict';

const formatTime = (s) => {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + 'hrs ' + mins + 'mins ' + secs + 'secs';
}

const AVKEY1 = '9RUKGUEQ3Y8VOFG9';
const AVKEY2 = 'E6BKK6T99RPFV58P';
const scale = 250;

const normalize = (obj, test = false) => {
  if (test) {
    return {
      aboveSAR: obj.open > obj.sar,
      diffSAR: Number((obj.open - obj.sar).toFixed(2)),
      macd: obj.macd,
      apo: obj.apo,
      rsi: Number((obj.rsi / 100).toFixed(2)),
      aboveSMA100: obj.open > obj.sma100,
      diffSMA100: Number((obj.open - obj.sma100).toFixed(2)),
    }
  }

  const gain = obj.close > obj.open ? 1 : 0;
  return { 
    input: { 
      aboveSAR: obj.open > obj.sar,
      diffSAR: Number((obj.open - obj.sar).toFixed(2)),
      macd: obj.macd,
      apo: obj.apo,
      rsi: Number((obj.rsi / 100).toFixed(2)),
      aboveSMA100: obj.open > obj.sma100,
      diffSMA100: Number((obj.open - obj.sma100).toFixed(2)),
      /*aboveSAR: obj.sar / (obj.open * 2),
      macd: obj.macd,
      apo: obj.apo,
      rsi: obj.rsi / 100,
      underSMA50: obj.open < obj.sma50,*/
      // belowSMA100: obj.open < obj.sma100,
      // belowSMA200: obj.open < obj.sma200,
      // mom: obj.mom,
      // open: obj.open / scale, // previous close? 
    }, 
    output: [ gain ]
  }
}

const main = async () => {
  const start = Date.now();
  try {
    const root = document.getElementById('root');
    let content = `
      <div>
        <h1>Predicting gain at close using psar, macd, rsi, apo, and moving averages</h1>
    `;

    const symbol = 'SPY';
    const aaplData = JSON.parse(AAPL5y);
    const googData = JSON.parse(GOOG5y);
    const msftData = JSON.parse(MSFT5y);
    const spyData = JSON.parse(SPY5y);
    const twtrData = JSON.parse(TWTR5y);

    const initData = [
      ...aaplData,
      ...googData,
      ...msftData,
      ...twtrData,
      ...spyData
    ]

    const allData = initData.map((item, i) => normalize(item, false));
    console.log(allData, formatTime(Date.now() - start));

    const net = new brain.NeuralNetwork({ hiddenLayers: [12] });

    let iter = 1000;
    content += '<p>Training...</p>';
    net.train(allData.slice(0, allData.length - 504), {
      iterations: 20000,
      callback: () => {
        console.log(iter, formatTime(Date.now() - start)); 
        iter += 1000;
      },
      callbackPeriod: 1000,
    });

    content += '<p>Backtesting over 1 year...</p><div style="display:flex; align-items: flex-end">';
    const results = [];
    let error = 0;
    let value = 10000;
    for (let i = allData.length - 504; i < allData.length; i++) {
      console.log(i - allData.length, '/', 504)
      const res = net.run(allData[i].input);
      const truth = Math.round(res) === allData[i].output[0];
      results.push(truth);
      const investment = value > 20000 ? value * 0.75 : value;

      if (truth) {
        value = (value - investment) + (investment * (1 + Math.abs(initData[i].changePercent / 100)));
        console.log(`Gain of ${(investment * Math.abs(initData[i].changePercent / 100)).toFixed(2)} -> ${value}`);
      }
      else {
        value = (value - investment) + (investment * (1 - Math.abs(initData[i].changePercent / 100)));
        console.log(`Loss of ${(investment * -1 * Math.abs(initData[i].changePercent / 100)).toFixed(2)} -> ${value}`);
      }
      content += `<div style="height: ${value / 500}px; flex: 1; background: ${truth ? 'green' : 'red'};"></div>`;

      if (Math.abs(allData[i].output[0] - res) > 0.05) {
        error += Math.abs(allData[i].output[0] - res);
      }
      if (i === allData.length - 1) {
        content += `</div><p>Prediction for ${symbol} to gain on ${initData[i].label}: ${Number(res)}</p>`;
        console.log(initData[i].label, ': ', allData[i].input);
      }
    }

    console.log(formatTime(Date.now() - start));

    const correct = results.filter(item => item === true).length;
    content += `<p>Accuracy: <strong>${(100 * correct / results.length).toFixed(0)}%</strong> (${correct} / ${results.length})</p>`;
    content += `<p>Avg. Error: <strong>${(error / results.length).toFixed(5)}%</strong> (${error.toFixed(5)} / ${results.length})</p>`;
    content += `<p>Starting Value of $10000 Over 1 year: <strong style="${value > 10000 ? 'color: green' : 'color: red'}">$${value.toFixed(2)}</strong></p>`;
    content += `<p>Percent Profit: <strong style="${value > 10000 ? 'color: green' : 'color: red'}">${((value / 100) - 100).toFixed(2)}%</strong>`;

    let inputs = {
      AAPL,
      GOOG,
      MSFT,
      SPY,
      TWTR
    }
    
    // Test Input
    Object.keys(inputs).map((item, i) => {
      console.log(i, item, inputs[item], normalize(inputs[item], true))
      content += `<p>Test Prediction Output for ${item}: ${net.run(normalize(inputs[item], true))}</p>`;
    });
    //content += `<p>Test Prediction Output for GOOG: ${net.run(goog)}</p>`;

    content += '</div>';
    root.insertAdjacentHTML('beforeend', content);
  }
  catch (e) {
    console.error(e);
  }
  const diff = Date.now() - start;
  console.log('Date: ', formatTime(diff));
}

/*
const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 5,
  hiddenLayers: [8, 8],
  outputSize: 5
});
*/

main();
