const fetch = require('node-fetch');
const fs = require('fs');

const AVKEY1 = '9RUKGUEQ3Y8VOFG9';
const AVKEY2 = 'E6BKK6T99RPFV58P';

const getData = async (symbol) => {
  try {  
    const period = '5y';
    const IEX = await fetch(
      `https://api.iextrading.com/1.0/stock/${symbol}/chart/${period}`, 
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());
    
    const AVSAR = await fetch(
      `https://www.alphavantage.co/query?function=SAR&symbol=${symbol}&interval=daily&acceleration=0.05&maximum=0.25&apikey=${AVKEY1}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVMACD = await fetch(
      `https://www.alphavantage.co/query?function=MACD&symbol=${symbol}&interval=daily&series_type=open&apikey=${AVKEY1}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVSMA100 = await fetch(
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=100&series_type=open&apikey=${AVKEY1}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVRSI = await fetch(
      `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=daily&time_period=10&series_type=open&apikey=${AVKEY1}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVAPO = await fetch(
      `https://www.alphavantage.co/query?function=APO&symbol=${symbol}&interval=daily&series_type=close&fastperiod=10&matype=1&apikey=${AVKEY1}`,
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
      if (AVSMA50['Technical Analysis: SMA'] && AVSMA50['Technical Analysis: SMA'][item.date]) item.sma50 = Number(AVSMA50['Technical Analysis: SMA'][item.date]['SMA']);

    */

    let newData = IEX.map((item, i) => {
      if (AVSAR['Technical Analysis: SAR'] && AVSAR['Technical Analysis: SAR'][item.date]) item.sar = Number(AVSAR['Technical Analysis: SAR'][item.date]['SAR']);
      if (AVMACD['Technical Analysis: MACD'] && AVMACD['Technical Analysis: MACD'][item.date]) item.macd = Number(AVMACD['Technical Analysis: MACD'][item.date]['MACD']);
      if (AVSMA100['Technical Analysis: SMA'] && AVSMA100['Technical Analysis: SMA'][item.date]) item.sma100 = Number(AVSMA100['Technical Analysis: SMA'][item.date]['SMA']);
      if (AVRSI['Technical Analysis: RSI'] && AVRSI['Technical Analysis: RSI'][item.date]) item.rsi = Number(AVRSI['Technical Analysis: RSI'][item.date]['RSI']);
      if (AVAPO['Technical Analysis: APO'] && AVAPO['Technical Analysis: APO'][item.date]) item.apo = Number(AVAPO['Technical Analysis: APO'][item.date]['APO']);
      return item;
    });

    /*
    const normData = newData.map(normalize);
    console.log(normData.length, typeof normData, normData[normData.length - 1]);
    console.log(symbol, 'done.');
    */

    console.log(newData[newData.length - 1])
    
    if (newData.length > 0) {
      fs.writeFile(
        `historicalData/${symbol}/${symbol + '_' + period}.js`, 
        `const ${symbol}${period} = '${JSON.stringify(newData)}';`, 
        (e) => { if (e) throw e }
      )
    }
    else {
      console.log("File write failed due to lack of data")
    }

    return newData;
  }
  catch (e) { 
    console.error(e);
  }
}

const dataMain = () => {
  const symbols = [
    'AAPL',
    'GOOG',
    'TWTR',
    'SPY',
    'MSFT'
  ]
  const haul = setTimeout(() => getData(symbols[1]), 3000);
}

dataMain()