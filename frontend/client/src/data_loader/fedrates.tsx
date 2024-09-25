import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '3f5d3c23e4d19ee31e300da6a30b69ac';
const FRED_BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

const useFedRates = (seriesId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(FRED_BASE_URL, {
          params: {
            series_id: seriesId,
            api_key: API_KEY,
            file_type: 'json',
          },
        });

        if (response.data && response.data.observations) {
          setData(response.data.observations);
        } else {
          setError('No data available');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.message); 
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [seriesId]);

  return { data, loading, error };
};

export default useFedRates;
