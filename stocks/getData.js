const fetch = require('node-fetch');
const fs = require('fs');

const AVKEY1 = '9RUKGUEQ3Y8VOFG9';
const AVKEY2 = 'E6BKK6T99RPFV58P';

const getData = async (symbol) => {
  try {  
    const period = '20y';
    /*
    const period = '5y';
    const IEX = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/chart/${period}?token=Tpk_e36f440149aa454fb74b25a94c8f4294`, 
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());
    */

    const AV = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${AVKEY1}`, 
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(async res => {
      const data = await res.json();
      return 'Time Series (Daily)' in data ? data['Time Series (Daily)'] : [];
    });
    
    const AVSAR = await fetch(
      `https://www.alphavantage.co/query?function=SAR&symbol=${symbol}&interval=daily&acceleration=0.05&maximum=0.25&apikey=${AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVMACD = await fetch(
      `https://www.alphavantage.co/query?function=MACD&symbol=${symbol}&interval=daily&series_type=open&apikey=${AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVSMA100 = await fetch(
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=100&series_type=open&apikey=${AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVRSI = await fetch(
      `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=daily&time_period=10&series_type=open&apikey=${AVKEY2}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVAPO = await fetch(
      `https://www.alphavantage.co/query?function=APO&symbol=${symbol}&interval=daily&series_type=close&fastperiod=10&matype=1&apikey=${AVKEY2}`,
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

    let newData = Object.entries(AV).map((entry, i) => {
      const key = entry[0];
      const item = entry[1];

      item.open = Number(item['1. open']);
      item.high = Number(item['2. high']);
      item.low = Number(item['3. low']);
      item.close = Number(item['4. close']);
      item.closeAdj = Number(item['5. adjusted close']);
      item.volume = Number(item['6. volume']);
      item.dividend = Number(item['7. dividend amount']);
      item.coef = Number(item['8. split coefficient']);

      delete item['1. open'];
      delete item['2. high'];
      delete item['3. low'];
      delete item['4. close'];
      delete item['5. adjusted close'];
      delete item['6. volume'];
      delete item['7. dividend amount'];
      delete item['8. split coefficient'];

      if (AVSAR['Technical Analysis: SAR'] && AVSAR['Technical Analysis: SAR'][key]) item.sar = Number(AVSAR['Technical Analysis: SAR'][key]['SAR']);
      if (AVMACD['Technical Analysis: MACD'] && AVMACD['Technical Analysis: MACD'][key]) item.macd = Number(AVMACD['Technical Analysis: MACD'][key]['MACD']);
      if (AVSMA100['Technical Analysis: SMA'] && AVSMA100['Technical Analysis: SMA'][key]) item.sma100 = Number(AVSMA100['Technical Analysis: SMA'][key]['SMA']);
      if (AVRSI['Technical Analysis: RSI'] && AVRSI['Technical Analysis: RSI'][key]) item.rsi = Number(AVRSI['Technical Analysis: RSI'][key]['RSI']);
      if (AVAPO['Technical Analysis: APO'] && AVAPO['Technical Analysis: APO'][key]) item.apo = Number(AVAPO['Technical Analysis: APO'][key]['APO']);
      
      if (i < 5) console.log(key, item)

      return item;
    });

    console.log(typeof newData)

    /*
    const normData = newData.map(normalize);
    console.log(normData.length, typeof normData, normData[normData.length - 1]);
    console.log(symbol, 'done.');
    */

    console.log(
      newData.length,
      newData[0]
    )
    
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
  const haul = symbols.map((symbol) => getData(symbol));
}

dataMain()