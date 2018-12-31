const CronJob = require('cron').CronJob;
const fetch = require('node-fetch');
const fs = require('fs');

const dataHaul = async (symbol) => {
  const AVKEY1 = '9RUKGUEQ3Y8VOFG9';
  const now = new Date();
  const shortStr = now.getFullYear() + '' + (now.getMonth() + 1) + '' + now.getDate();
  const dashStr = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  const dateStr = dashStr + ' 09:31';
  const minutes = '09:30';

  const daily = await fetch(
    `https://api.iextrading.com/1.0/stock/${symbol}/chart/date/${shortStr}`, 
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

  if (open) {
    item = {...open[0]}
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

  console.log(item)

  if (item !== {}) {
    fs.writeFile(
      `openingData/${dashStr}.json`, 
      JSON.stringify(item), 
      (e) => { if (e) throw e }
    )
  }
}

const startHaul = () => {
  const symbols = [
    'AAPL',
    'GOOG',
    'TWTR',
    'SPY',
    'MSFT'
  ]
  for (let i = 0; i < 5; i++) {
    setTimeout(dataHaul(symbols[i]), 30000)
  }
}

const job = new CronJob(
  '31 6 * * 1-5',
  startHaul(),
  null,
  true,
  'America/Los_Angeles'
);

job.start()


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