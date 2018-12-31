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

const normalize = (obj) => {
  const gain = obj.close > obj.open ? 1 : 0;
  return { 
    input: { 
      aboveSAR: obj.sar / (obj.open * 2),
      macd: obj.macd,
      apo: obj.apo,
      rsi: obj.rsi / 100,
      underSMA50: obj.open < obj.sma50,
      // belowSMA100: obj.open < obj.sma100,
      // belowSMA200: obj.open < obj.sma200,
      // mom: obj.mom,
      // open: obj.open / scale, // previous close? 
    }, 
    output: [ gain ]
  }
}

const getData = async (symbol, first) => {
  try {  
    const IEX = await fetch(
      `https://api.iextrading.com/1.0/stock/${symbol}/chart/5y`, 
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());
    
    const AVSAR = await fetch(
      `https://www.alphavantage.co/query?function=SAR&symbol=${symbol}&interval=daily&acceleration=0.05&maximum=0.25&apikey=${first ? AVKEY1 : AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVMACD = await fetch(
      `https://www.alphavantage.co/query?function=MACD&symbol=${symbol}&interval=daily&series_type=open&apikey=${first ? AVKEY1 : AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVSMA50 = await fetch(
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=50&series_type=open&apikey=${first ? AVKEY1 : AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVRSI = await fetch(
      `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=daily&time_period=10&series_type=open&apikey=${first ? AVKEY1 : AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVAPO = await fetch(
      `https://www.alphavantage.co/query?function=APO&symbol=${symbol}&interval=daily&series_type=close&fastperiod=10&matype=1&apikey=${first ? AVKEY1 : AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());
/*
    const AVMOM = await fetch(
      `https://www.alphavantage.co/query?function=MOM&symbol=${symbol}&interval=daily&series_type=close&time_period=10&apikey=${AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());
    
    const AVSMA100 = await fetch(
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=100&series_type=open&apikey=${AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    
    Daily information from Alpha Vantage

    const daily = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=${AVKEY1}`, 
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    Other Indicator API Calls

    

    const AVSMA200 = await fetch(
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=200&series_type=open&apikey=${AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

      if (AVSMA200['Technical Analysis: SMA'] && AVSMA200['Technical Analysis: SMA'][item.date]) item.sma200 = Number(AVSMA200['Technical Analysis: SMA'][item.date]['SMA']);
      if (AVMOM['Technical Analysis: MOM'] && AVMOM['Technical Analysis: MOM'][item.date]) item.mom = Number(AVMOM['Technical Analysis: MOM'][item.date]['MOM']);
      if (AVSMA100['Technical Analysis: SMA'] && AVSMA100['Technical Analysis: SMA'][item.date]) item.sma100 = Number(AVSMA100['Technical Analysis: SMA'][item.date]['SMA']);

    */

    const newData = IEX.map((item, i) => {
      if (AVSAR['Technical Analysis: SAR'] && AVSAR['Technical Analysis: SAR'][item.date]) item.sar = Number(AVSAR['Technical Analysis: SAR'][item.date]['SAR']);
      if (AVMACD['Technical Analysis: MACD'] && AVMACD['Technical Analysis: MACD'][item.date]) item.macd = Number(AVMACD['Technical Analysis: MACD'][item.date]['MACD']);
      if (AVSMA50['Technical Analysis: SMA'] && AVSMA50['Technical Analysis: SMA'][item.date]) item.sma50 = Number(AVSMA50['Technical Analysis: SMA'][item.date]['SMA']);
      if (AVRSI['Technical Analysis: RSI'] && AVRSI['Technical Analysis: RSI'][item.date]) item.rsi = Number(AVRSI['Technical Analysis: RSI'][item.date]['RSI']);
      if (AVAPO['Technical Analysis: APO'] && AVAPO['Technical Analysis: APO'][item.date]) item.apo = Number(AVAPO['Technical Analysis: APO'][item.date]['APO']);
      return item;
    });

    return newData;
  }
  catch (e) {
    console.error(e);
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

    const symbol = 'NFLX';
    const rawData = await getData(symbol, true);
    let trainingData = rawData.map(normalize);
    /*
    const symbol2 = 'AAPL';
    const rawData2 = await getData(symbol2, false);
    let moreTraining = rawData2.map(normalize);
    const bigTrain = [...trainingData.slice(0, trainingData.length - 252), ...moreTraining];
    console.log(bigTrain)
    */

    const net = new brain.NeuralNetwork({ hiddenLayers: [14, 14] })

    content += '<p>Training...</p>';
    net.train(trainingData.slice(0, trainingData.length - 252), {
      iterations: 20000
    });

    content += '<p>Backtesting over 1 year...</p><div style="display:flex; align-items: flex-end">';
    const results = [];
    let error = 0;
    let value = 1000;
    for (let i = trainingData.length - 252; i < trainingData.length; i++) {
      const res = net.run(trainingData[i].input);
      const truth = Math.round(res) === trainingData[i].output[0];
      results.push(truth);
      const investment = value > 2000 ? value * 0.75 : value;

      if (truth) {
        value = (value - investment) + (investment * (1 + Math.abs(rawData[i].changePercent / 100)));
        console.log(`Gain of ${(investment * Math.abs(rawData[i].changePercent / 100)).toFixed(2)} -> ${value}`);
      }
      else {
        value = (value - investment) + (investment * (1 - Math.abs(rawData[i].changePercent / 100)));
        console.log(`Loss of ${(investment * -1 * Math.abs(rawData[i].changePercent / 100)).toFixed(2)} -> ${value}`);
      }
      content += `<div style="height: ${value / 100}px; flex: 1; background: ${truth ? 'green' : 'red'};"></div>`;

      if (Math.abs(trainingData[i].output[0] - res) > 0.05) {
        error += Math.abs(trainingData[i].output[0] - res);
      }
      if (i === trainingData.length - 1) {
        content += `</div><p>Prediction for ${symbol} to gain on ${rawData[i].label}: ${Number(res)}</p>`;
        console.log(trainingData[i].input);
      }
    }

    const correct = results.filter(item => item === true).length;
    content += `<p>Accuracy: <strong>${(100 * correct / results.length).toFixed(0)}%</strong> (${correct} / ${results.length})</p>`;
    content += `<p>Avg. Error: <strong>${(error / results.length).toFixed(5)}%</strong> (${error.toFixed(5)} / ${results.length})</p>`;
    content += `<p>Starting Value of $1000 Over 1 year: <strong style="${value > 0 ? 'color: green' : 'color: red'}">$${value.toFixed(2)}</strong></p>`;
    content += `<p>Percent Profit: <strong style="${value > 1000 ? 'color: green' : 'color: red'}">${((value / 10) - 100).toFixed(2)}%</strong>`;

    // Test Input
    // content += `<p>Test Prediction Output: ${net.run({ aboveSAR: true, rsi: 0.4, apo: -7, underSMA50: true })}</p>`

    content += '</div>'
    root.insertAdjacentHTML('beforeend', content);
  }
  catch (e) {
    console.error(e);
  }
  const diff = Date.now() - start;
  console.log('Date: ', formatTime(diff));
}

main()

/*
const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 5,
  hiddenLayers: [8, 8],
  outputSize: 5
});
*/