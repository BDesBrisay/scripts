'use strict';
const AlphaVantageAPI = require('../.secret.js');

const getData = () => {
  const IEX = fetch(
    'https://api.iextrading.com/1.0/stock/aapl/chart/3m', 
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  ).then(res => res.json());

  const AVSAR = fetch(
    `https://www.alphavantage.co/query?function=SAR&symbol=AAPL&interval=weekly&acceleration=0.05&maximum=0.25&apikey=${AlphaVantageAPI}`,
    { method: 'get', headers: { 'Content-Type': 'application/json' } }
  )

  console.log(IEX, AVSAR);
  return { IEX, AVSAR };
}

module.exports = { getData };