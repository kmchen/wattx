'use strict';

const express = require('express');
const axios = require('axios');

// Constants
const PORT = 8082;
const HOST = 'localhost';

// App
const app = express();
app.get('/', (req, res) => {
  const instance = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    timeout: 1000,
    headers: {'X-CMC_PRO_API_KEY': '101f8864-41d9-4223-9f32-effa9b886491'}
  });
  instance.get().then(a => console.log(a))
});

app.listen(PORT, HOST);
