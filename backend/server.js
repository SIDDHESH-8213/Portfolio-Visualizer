const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const API_KEY = '3f5d3c23e4d19ee31e300da6a30b69ac';
const FRED_BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

app.use(cors()); 

// CPI
app.get('/api/cpi', async (req, res) => {
  try {
    const response = await axios.get(FRED_BASE_URL, {
      params: {
        series_id: 'CPIAUCSL',
        api_key: API_KEY,
        file_type: 'json',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch CPI data' });
  }
});

// Oil Prices
app.get('/api/oil', async (req, res) => {
  try {
    const response = await axios.get(FRED_BASE_URL, {
      params: {
        series_id: 'DCOILWTICO',
        api_key: API_KEY,
        file_type: 'json',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch oil data' });
  }
});

// Unemployment Rate
app.get('/api/unemployment', async (req, res) => {
  try {
    const response = await axios.get(FRED_BASE_URL, {
      params: {
        series_id: 'UNRATE',
        api_key: API_KEY,
        file_type: 'json',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch unemployment rate' });
  }
});

// Inflation Rate
app.get('/api/inflation', async (req, res) => {
  try {
    const response = await axios.get(FRED_BASE_URL, {
      params: {
        series_id: 'FPCPITOTLZGUSA',
        api_key: API_KEY,
        file_type: 'json',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inflation rate' });
  }
});

// Fed Interest Rates
app.get('/api/fed-rates', async (req, res) => {
  try {
    const response = await axios.get(FRED_BASE_URL, {
      params: {
        series_id: 'FEDFUNDS',
        api_key: API_KEY,
        file_type: 'json',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Fed interest rates' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
