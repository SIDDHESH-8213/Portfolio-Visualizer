import React, { useState } from 'react';
import axios from 'axios';

const ModelConfiguration = () => {
  const [tickers, setTickers] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [correlationBasis, setCorrelationBasis] = useState('Monthly Returns');
  const [rollingCorrelation, setRollingCorrelation] = useState('36 Months');
  const [correlationData, setCorrelationData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCorrelationData(null);

    // Construct the payload
    const payload = {
      tickers: tickers.split(' ').map((ticker) => ticker.trim()),
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/assetcorrelation', payload);

      setCorrelationData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : 'Failed to fetch correlation data');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Model Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Tickers</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="VTI VNQ GLD BND"
            value={tickers}
            onChange={(e) => setTickers(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Correlation Basis</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={correlationBasis}
            onChange={(e) => setCorrelationBasis(e.target.value)}
          >
            <option>Monthly Returns</option>
            <option>Daily Returns</option>
            <option>Weekly Returns</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Rolling Correlation</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={rollingCorrelation}
            onChange={(e) => setRollingCorrelation(e.target.value)}
          >
            <option>12 Months</option>
            <option>24 Months</option>
            <option>36 Months</option>
            <option>48 Months</option>
          </select>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            View Correlation
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Display correlation data */}
      {correlationData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-xl font-semibold mb-2">Correlation Results</h3>
          <pre className="whitespace-pre-wrap">{JSON.stringify(correlationData, null, 2)}</pre>
        </div>
      )}

      {/* Display error if any */}
      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default ModelConfiguration;
