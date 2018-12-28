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

const scale = 1000;

const normalize = (obj) => {
  const gain = obj.close > obj.open ? 1 : 0;
  return { 
    input: { 
      open: obj.open / scale, 
      vwapDiff: obj.open - obj.vwap, 
      belowSAR: obj.open > obj.sar,
      macd: obj.macd,
      aboveSMA: obj.open > obj.sma
    }, 
    output: [ gain ]
  }
}

const getData = async (symbol) => {
  const IEX = await fetch(
    `https://api.iextrading.com/1.0/stock/${symbol}/chart/1y`, 
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  ).then(res => res.json());

  const AVSAR = await fetch(
    `https://www.alphavantage.co/query?function=SAR&symbol=${symbol}&interval=weekly&acceleration=0.05&maximum=0.25&apikey=9RUKGUEQ3Y8VOFG9`,
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  ).then(res => res.json());

  const AVMACD = await fetch(
    `https://www.alphavantage.co/query?function=MACD&symbol=${symbol}&interval=daily&series_type=open&apikey=9RUKGUEQ3Y8VOFG9`,
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  ).then(res => res.json());

  const AVSMA = await fetch(
    `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=100&series_type=open&apikey=9RUKGUEQ3Y8VOFG9`,
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  ).then(res => res.json());

  const newData = IEX.map((item, i) => {
    if (!!AVSAR['Technical Analysis: SAR'][item.date]) item.sar = Number(AVSAR['Technical Analysis: SAR'][item.date]['SAR']);
    if (!!AVMACD['Technical Analysis: MACD'][item.date]) item.macd = Number(AVMACD['Technical Analysis: MACD'][item.date]['MACD']);
    if (!!AVSMA['Technical Analysis: SMA'][item.date]) item.sma = Number(AVSMA['Technical Analysis: SMA'][item.date]['SMA']);
    return item;
  });

  return newData;
}

const main = async () => {
  const root = document.getElementById('root');
  let content = `
    <div>
      <h1>Predicting close gain with psar position and vwap diff</h1>
  `;

  const rawData = await getData('GOOG');

  const trainingData = rawData.map(normalize);
  const net = new brain.NeuralNetwork({ hiddenLayers: [12] })

  content += '<p>Training...</p>';
  net.train(trainingData);

  content += '<p>Backtesting...</p>';
  const results = [];
  for (let i = 0; i < trainingData.length; i++) {
    const res = net.run(trainingData[i].input)
    results.push(Math.round(res) === trainingData[i].output[0]);
    if (i === trainingData.length - 1) content += `<p>Prediction for a gain today: ${console.log(trainingData[i].input),Number(res)}</p>`;
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