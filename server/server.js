'use strict';

const express = require('express');
const axios = require('axios');

const PORT = 8082;
const HOST = 'localhost';

const app = express();
app.get('/data', async (req, res) => {
  const instance = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    timeout: 1000,
    headers: {'X-CMC_PRO_API_KEY': '101f8864-41d9-4223-9f32-effa9b886491'}
  });
  try {
    const resp = await instance.get();
    const data = resp.data.data.reduce((acc, curr) => {
      const { price, volume_24h, percent_change_24h, market_cap }  = curr.quote.USD;
      acc.push({
        name: curr.name,
        rank: curr.cmc_rank,
        price,
        volume: volume_24h,
        priceChange: percent_change_24h,
        marketCap: market_cap
      });
      return acc; 
    }, []).sort((a, b) => a.rank - b.rank)
    res.json(data);
  } catch(err) {
    console.err('Fail to get cryptocurrency data') 
  }
});

app.listen(PORT, HOST);
