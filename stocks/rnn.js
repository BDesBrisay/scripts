'use strict';


/*
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
*/

function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}

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
      sar: obj.sar / (obj.open * 2),
      macd: obj.macd,
      apo: obj.apo,
      rsi: obj.rsi / 100,
      sma100: obj.sma100 / (obj.open * 2),
    }
  }

  const gain = obj.close > obj.open ? 1 : 0;
  return { 
    input: [{ 
      sar: obj.open - obj.sar,
      macd: obj.macd,
      apo: obj.apo,
      rsi: obj.rsi / 100,
      sma100: obj.open - obj.sma100,
      /*aboveSAR: obj.sar / (obj.open * 2),
      macd: obj.macd,
      apo: obj.apo,
      rsi: obj.rsi / 100,
      underSMA50: obj.open < obj.sma50,*/
      // belowSMA100: obj.open < obj.sma100,
      // belowSMA200: obj.open < obj.sma200,
      // mom: obj.mom,
    }], 
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

    const symbol = 'AAPL';
    const aaplData = JSON.parse(AAPL2y);
    // const googData = JSON.parse(GOOG2y);

    const initData = [
      // ...googData,
      ...aaplData
    ]

    const allData = initData.map((item, i) => normalize(item, false));

    const net = new brain.recurrent.RNN({ hiddenLayers: [10] });

    content += '<p>Training...</p>';
    net.train(allData.slice(0, allData.length - 252), {
      iterations: 10000
    });

    content += '<p>Backtesting over 1 year...</p><div style="display:flex; align-items: flex-end">';
    const results = [];
    let error = 0;
    let value = 1000;
    for (let i = allData.length - 252; i < allData.length; i++) {
      const res = net.run(allData[i].input);
      const truth = Math.round(res) === allData[i].output[0];
      results.push(truth);
      const investment = value > 2000 ? value * 0.75 : value;

      if (truth) {
        value = (value - investment) + (investment * (1 + Math.abs(initData[i].changePercent / 100)));
        console.log(`Gain of ${(investment * Math.abs(initData[i].changePercent / 100)).toFixed(2)} -> ${value}`);
      }
      else {
        value = (value - investment) + (investment * (1 - Math.abs(initData[i].changePercent / 100)));
        console.log(`Loss of ${(investment * -1 * Math.abs(initData[i].changePercent / 100)).toFixed(2)} -> ${value}`);
      }
      content += `<div style="height: ${value / 100}px; flex: 1; background: ${truth ? 'green' : 'red'};"></div>`;

      if (Math.abs(allData[i].output[0] - res) > 0.05) {
        error += Math.abs(allData[i].output[0] - res);
      }
      if (i === allData.length - 1) {
        content += `</div><p>Prediction for ${symbol} to gain on ${initData[i].label}: ${Number(res)}</p>`;
        console.log(initData[i].label, ': ', allData[i].input);
      }
    }

    const correct = results.filter(item => item === true).length;
    content += `<p>Accuracy: <strong>${(100 * correct / results.length).toFixed(0)}%</strong> (${correct} / ${results.length})</p>`;
    content += `<p>Avg. Error: <strong>${(error / results.length).toFixed(5)}%</strong> (${error.toFixed(5)} / ${results.length})</p>`;
    content += `<p>Starting Value of $1000 Over 1 year: <strong style="${value > 0 ? 'color: green' : 'color: red'}">$${value.toFixed(2)}</strong></p>`;
    content += `<p>Percent Profit: <strong style="${value > 1000 ? 'color: green' : 'color: red'}">${((value / 10) - 100).toFixed(2)}%</strong>`;

    let aapl = normalize(AAPL, true);
    //let goog = normalize(GOOG, true);
    let msft, twtr, spy;
    console.log('AAPL: ', aapl);
    
    // Test Input
    content += `<p>Test Prediction Output for AAPL: ${net.run(aapl)}</p>`;
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

main();
