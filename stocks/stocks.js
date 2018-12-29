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

const scale = 250;

const normalize = (obj) => {
  const gain = obj.close > obj.open ? 1 : 0;
  return { 
    input: { 
      // date: obj.date,
      // open: obj.open / scale, 
      // vwapDiff: obj.open - obj.vwap, 
      aboveSAR: obj.open > obj.sar,
      macd: obj.macd,
      apo: obj.apo,
      rsi: obj.rsi / 100,
      // mom: obj.mom,
      underSMA50: obj.open < obj.sma50,
      //belowSMA100: obj.open < obj.sma100,
      //belowSMA200: obj.open < obj.sma200
    }, 
    output: [ gain ]
  }
}

const getData = async (symbol) => {
  try {  
    const IEX = await fetch(
      `https://api.iextrading.com/1.0/stock/${symbol}/chart/1y`, 
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());
    
    /*const daily = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=9RUKGUEQ3Y8VOFG9`, 
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());*/

    const AVSAR = await fetch(
      `https://www.alphavantage.co/query?function=SAR&symbol=${symbol}&interval=daily&acceleration=0.05&maximum=0.25&apikey=9RUKGUEQ3Y8VOFG9`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVMACD = await fetch(
      `https://www.alphavantage.co/query?function=MACD&symbol=${symbol}&interval=daily&series_type=open&apikey=9RUKGUEQ3Y8VOFG9`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVSMA50 = await fetch(
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=50&series_type=open&apikey=9RUKGUEQ3Y8VOFG9`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVRSI = await fetch(
      `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=daily&time_period=10&series_type=open&apikey=9RUKGUEQ3Y8VOFG9`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVAPO = await fetch(
      `https://www.alphavantage.co/query?function=APO&symbol=${symbol}&interval=daily&series_type=close&fastperiod=10&matype=1&apikey=9RUKGUEQ3Y8VOFG9`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    /*
    Other Indicator API Calls

    const AVSMA100 = await fetch(
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=100&series_type=open&apikey=9RUKGUEQ3Y8VOFG9`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVSMA200 = await fetch(
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=200&series_type=open&apikey=9RUKGUEQ3Y8VOFG9`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVMOM = await fetch(
      `https://www.alphavantage.co/query?function=MOM&symbol=${symbol}&interval=daily&series_type=close&time_period=10&apikey=9RUKGUEQ3Y8VOFG9`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());
    */

    
    /*
    if (AVSMA100['Technical Analysis: SMA'] && AVSMA100['Technical Analysis: SMA'][item.date]) item.sma100 = Number(AVSMA100['Technical Analysis: SMA'][item.date]['SMA']);
    if (AVSMA200['Technical Analysis: SMA'] && AVSMA200['Technical Analysis: SMA'][item.date]) item.sma200 = Number(AVSMA200['Technical Analysis: SMA'][item.date]['SMA']);
    // if (AVMOM['Technical Analysis: MOM'] && AVMOM['Technical Analysis: MOM'][item.date]) item.mom = Number(AVMOM['Technical Analysis: MOM'][item.date]['MOM']);
    */

    const newData = IEX.map((item, i) => {
      if (AVSAR['Technical Analysis: SAR'] && AVSAR['Technical Analysis: SAR'][item.date]) item.sar = Number(AVSAR['Technical Analysis: SAR'][item.date]['SAR']);
      if (AVMACD['Technical Analysis: MACD'] && AVMACD['Technical Analysis: MACD'][item.date]) item.macd = Number(AVMACD['Technical Analysis: MACD'][item.date]['MACD']);
      if (AVSMA50['Technical Analysis: SMA'] && AVSMA50['Technical Analysis: SMA'][item.date]) item.sma50 = Number(AVSMA50['Technical Analysis: SMA'][item.date]['SMA']);
      if (AVRSI['Technical Analysis: RSI'] && AVRSI['Technical Analysis: RSI'][item.date]) item.rsi = Number(AVRSI['Technical Analysis: RSI'][item.date]['RSI']);
      if (AVAPO['Technical Analysis: APO'] && AVAPO['Technical Analysis: APO'][item.date]) item.apo = Number(AVAPO['Technical Analysis: APO'][item.date]['APO']);
      return item;
    });

    console.log(newData)

    return newData;
  }
  catch (e) {
    console.error(e);
  }
}

const main = async () => {
  try {
    const root = document.getElementById('root');
    let content = `
      <div>
        <h1>Predicting gain at close using psar, macd, rsi, apo, and moving averages</h1>
    `;

    const symbol = 'SPY';
    const rawData = await getData(symbol);

    const trainingData = rawData.map(normalize);
    const net = new brain.NeuralNetwork({ hiddenLayers: [15] })

    content += '<p>Training...</p>';
    net.train(trainingData);

    content += '<p>Backtesting over 1 year...</p><div style="display:flex">';
    const results = [];
    for (let i = 0; i < trainingData.length; i++) {
      const res = net.run(trainingData[i].input);
      const truth = Math.round(res) === trainingData[i].output[0];
      results.push(truth);
      content += `<div style="height:20px;flex:1;background:${truth ? 'green' : 'red'}"></div>`;
      if (i === trainingData.length - 1) content += `</div><p>Prediction for ${symbol} to gain today: ${console.log(trainingData[i].input),Number(res)}</p>`;
    }

    const correct = results.filter(item => item === true).length;
    content += `<p>Accuracy: <strong>${(100 * correct / results.length).toFixed(0)}%</strong> (${correct} / ${results.length})`;
    
    content += `<p>${net.run({ aboveSAR: true, rsi: 0.4, apo: -7, underSMA50: true })}</p>`

    content += '</div>'
    root.insertAdjacentHTML('beforeend', content);
  }
  catch (e) {
    console.error(e);
  }
}

main()

/*
const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 5,
  hiddenLayers: [8, 8],
  outputSize: 5
});
*/