const CronJob = require('cron').CronJob;
const fetch = require('node-fetch');
const fs = require('fs');

const fixDate = (val) => {
  if (val <= 9) val = '0' + val;
  return val;
};

const dataHaul = async (symbol) => {
  try {
    const AVKEY1 = '9RUKGUEQ3Y8VOFG9';
    const now = new Date(2019, 00, 03);
    const shortStr = now.getFullYear() + '' + fixDate(now.getMonth() + 1) + '' + fixDate(now.getDate());
    const dashStr = now.getFullYear() + '-' + fixDate(now.getMonth() + 1) + '-' + fixDate(now.getDate());
    const dateStr = dashStr + ' 09:31';
    const minutes = '09:30';
    const closeMin = '15:59';

    const daily = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/chart/date/${dashStr}?token=Tpk_e36f440149aa454fb74b25a94c8f4294`, 
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVSAR = await fetch(
      `https://www.alphavantage.co/query?function=SAR&symbol=${symbol}&interval=1min&acceleration=0.05&maximum=0.25&apikey=${AVKEY1}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVMACD = await fetch(
      `https://www.alphavantage.co/query?function=MACD&symbol=${symbol}&interval=1min&series_type=open&outputsize=full&apikey=${AVKEY1}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVRSI = await fetch(
      `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=1min&time_period=10&series_type=open&outputsize=full&apikey=${AVKEY1}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());

    const AVAPO = await fetch(
      `https://www.alphavantage.co/query?function=APO&symbol=${symbol}&interval=1min&series_type=close&fastperiod=10&outputsize=full&matype=1&apikey=${AVKEY1}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());
    
    const AVSMA100 = await fetch(
      `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=1min&time_period=100&series_type=open&outputsize=full&apikey=${AVKEY1}`,
      { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then(res => res.json());
    

    let item = {};
    let open = daily.filter(item => item.minute == minutes);
    let close = daily.filter(item => item.minute == closeMin);

    if (open) {
      item = {
        ...open[0],
        close: close[0].close
      }
    }
    if (AVSAR['Technical Analysis: SAR'] && AVSAR['Technical Analysis: SAR'][dateStr]) {
      item.sar = Number(AVSAR['Technical Analysis: SAR'][dateStr]['SAR']);
    }
    if (AVMACD['Technical Analysis: MACD'] && AVMACD['Technical Analysis: MACD'][dateStr]) {
      item.macd = Number(AVMACD['Technical Analysis: MACD'][dateStr]['MACD']);
    }
    if (AVRSI['Technical Analysis: RSI'] && AVRSI['Technical Analysis: RSI'][dateStr]) {
      item.rsi = Number(AVRSI['Technical Analysis: RSI'][dateStr]['RSI']);
    }
    if (AVAPO['Technical Analysis: APO'] && AVAPO['Technical Analysis: APO'][dateStr]) {
      item.apo = Number(AVAPO['Technical Analysis: APO'][dateStr]['APO']);
    } 
    if (AVSMA100['Technical Analysis: SMA'] && AVSMA100['Technical Analysis: SMA'][dateStr]) {
      item.sma100 = Number(AVSMA100['Technical Analysis: SMA'][dateStr]['SMA'])
    }

    console.log(item, shortStr)

    if (Object.keys(item).length > 0) {
      fs.writeFile(
        `openingData/${symbol}/${dashStr}.js`, 
        `const ${symbol} = ${JSON.stringify(item)};`, 
        (e) => { if (e) throw e }
      )
    }
    else {
      console.log("File write failed due to lack of data")
    }
  }
  catch (e) { 
    console.error(e);
  }
}

const startHaul = () => {
  const symbols = [
    'AAPL',
    'GOOG',
    'TWTR',
    'SPY',
    'MSFT'
  ];
  symbols.map((symbol) => dataHaul(symbol));
}

startHaul();

/*
const job = new CronJob(
  '31 6 * * 1-5',
  startHaul(),
  null,
  true,
  'America/Los_Angeles'
);

job.start();
*/



/*
if (AVMOM['Technical Analysis: MOM'] && AVMOM['Technical Analysis: MOM'][dateStr]) {
  console.log(2);
  item.mom = Number(AVMOM['Technical Analysis: MOM'][dateStr]['MOM']);
} 
if (AVSMA50['Technical Analysis: SMA'] && AVSMA50['Technical Analysis: SMA'][dateStr]) {
  console.log(3);
  item.sma50 = Number(AVSMA50['Technical Analysis: SMA'][dateStr]['SMA'])
}
if (AVSMA200['Technical Analysis: SMA'] && AVSMA200['Technical Analysis: SMA'][dateStr]) {
  console.log(2);
  item.sma200 = Number(AVSMA200['Technical Analysis: SMA'][dateStr]['SMA'])
}
*/

/*
  const daily = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${AVKEY1}`, 
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  ).then(res => res.json());

  first = false;
  console.log(first, " Check")

  const AVMOM = await fetch(
    `https://www.alphavantage.co/query?function=MOM&symbol=${symbol}&interval=1min&series_type=close&time_period=10&outputsize=full&apikey=${AVKEY1}`,
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  ).then(res => res.json());
  console.log(AVMOM);

  const AVSMA50 = await fetch(
    `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=1min&time_period=50&series_type=open&outputsize=full&apikey=${AVKEY1}`,
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  ).then(res => res.json());
  console.log(AVSMA50);

  const AVSMA200 = await fetch(
    `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=1min&time_period=200&series_type=open&outputsize=full&apikey=${AVKEY1}`,
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  ).then(res => res.json());
  console.log(AVSMA200);
  */