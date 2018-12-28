'use strict';

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
  const gain = obj.close > obj.open ? 1 : 0;
  return { input: [obj.open / scale, obj.open - obj.vwap], output: [gain] }
}

const main = async () => {
  const raw = await fetch('https://api.iextrading.com/1.0/stock/aapl/chart/2y', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json());

  const trainingData = raw.map(normalize);

  const net = new brain.NeuralNetwork({ hiddenLayers: [15] })

  console.log('Training...');
  net.train(trainingData);

  console.log('Backtesting...');
  const results = [];
  for (let i = 0; i < trainingData.length; i++) {
    const res = net.run(trainingData[i].input)
    results.push(Math.round(res) === trainingData[i].output[0]);
  }
  
  const correct = results.filter(item => item === true).length;
  console.log('Accuracy: ' + (100 * correct / results.length).toFixed(0) + '% (' + correct + ' / ' + results.length + ')');
}

main()

/*
const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 5,
  hiddenLayers: [8, 8],
  outputSize: 5
});
*/