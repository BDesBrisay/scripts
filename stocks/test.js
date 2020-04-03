'use strict';

const msft20y = JSON.parse(MSFT20y);

const normalize = (obj, index) => {
  const tomorrow = msft20y[index + 1];
  if (tomorrow) {
    return { 
      input: {
        open: obj.open,
        close: obj.close,
        gain: obj.close > obj.open ? 1 : 0,
        macd: obj.macd,
        rsi: obj.rsi,
        sar: obj.sar,
        sma100: obj.sma100,
        diffSAR: Number((obj.open - obj.sar).toFixed(2)),
        diffSMA100: Number((obj.open - obj.sma100).toFixed(2)),
      },
      output: [ tomorrow.close > tomorrow.open ? 1 : 0 ]
    }
  }
}

const main = async () => {
  try {
    const period = 365;

    const allData = msft20y.map((item, i) => normalize(item, i));

    const net = new brain.NeuralNetwork({ hiddenLayers: [10] });

    const training = allData.slice(0, allData.length - period);

    let iter = 0;
    net.train(training, {
      iterations: 10000,
      callback: () => console.log(iter += 1000),
      callbackPeriod: 1000,
    });

    const testing = allData.slice((period * -1) + 1);
    console.log(testing)

    for (let i of testing) {
      console.log(i)
      let res = net.run(i.input);
      console.log(net.run(i.input), i.output)
    }
  }
  catch (e) {
    console.error(e);
  }
}

main();
