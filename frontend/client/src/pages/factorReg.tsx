import React, { useState } from 'react';
import axios from 'axios';
import PortfolioRegressionResults from '../components/PortfolioRegressionResults';
import Portfolio from '../components/Protfolio'

const PortfolioForm = () => {
  const [assets, setAssets] = useState<{ name: string; allocation: number }[]>(Array(4).fill({ name: '', allocation: 0 }));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState(null);
  const [summary, setSummary] = useState('');

  const handleAssetChange = (index, field, value) => {
    const newAssets = [...assets];
    newAssets[index] = { 
      ...newAssets[index], 
      [field]: field === 'allocation' ? parseFloat(value) || 0 : value 
    };
    setAssets(newAssets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Filter out assets with empty names or invalid allocations
    const validAssets = assets.filter(asset => asset.name.trim() !== '' && !isNaN(asset.allocation));
  
    if (validAssets.length === 0) {
      alert('Please provide at least one valid asset with a ticker and allocation.');
      return;
    }
  
    const tickers = validAssets.map(asset => asset.name);
    const allocations = validAssets.map(asset => asset.allocation);
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/factorregression', {
        tickers,
        allocations,
        start_date: startDate,
        end_date: endDate,
      });
  
      setSummary(response.data.summary);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div className="px-[10%] h-full">
      <div className="px-5">
        <div className="text-3xl font-semibold mt-6">
          Factor Regression Analysis
        </div>
        <hr className="mt-4" />

        <div className="text-3xl font-normal mt-4">
          Factor Regression Overview
        </div>

        <div className="mt-4">
          This factor regression tool supports factor regression analysis of individual assets or a portfolio of assets using the given risk factor model. The multiple linear regression indicates how well the returns of the given assets or a portfolio are explained by the risk factor exposures.
        </div>
      </div>

      <div className="px-5 py-4 mt-4">
        <div className="text-2xl font-medium">
          Regression Model Configuration
        </div>

        <div className="flex flex-col gap-2 mt-8">
          <div className="flex flex-row justify-between text-center items-center align-middle w-[40%]">
            <div className="font-medium">Regression Input</div>
            <input
              type="text"
              className="bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none"
              value="Portfolio Regression"
              readOnly
            />
          </div>

          <div className="flex flex-row justify-between text-center items-center align-middle w-[40%]">
            <div className="font-medium">Regression Methods</div>
            <input
              type="text"
              className="bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none"
              value="OLS"
              readOnly
            />
          </div>

          <div className="flex flex-row justify-between text-center items-center align-middle w-[40%]">
            <div className="font-medium">Start Date</div>
            <input
              type="date"
              className="bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="flex flex-row justify-between text-center items-center align-middle w-[40%]">
            <div className="font-medium">End Date</div>
            <input
              type="date"
              className="bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="flex flex-row justify-between text-center items-center align-middle w-[40%]">
            <div className="font-medium">Factor Returns</div>
            <input
              type="text"
              className="bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none"
              value="Fama-French Research Factors"
              readOnly
            />
          </div>
        </div>

        <div className='mt-5  px-3'>
          <table className='w-[80%]'>
            <thead>
              <tr>
                <th className='px-4 py-2 text-center'>Portfolio Asset</th>
                <th className='px-4 py-2 text-center'>Ticker</th>
                <th className='px-4 py-2 text-center'>Allocation (%)</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index} className='odd:bg-gray-50 even:bg-white'>
                  <td className = "px-4 py-2">Asset {index + 1}</td>
                  <td className = "px-4 py-2">
                    <input
                      type="text"
                      value={asset.name}
                      onChange={(e) => handleAssetChange(index, 'name', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1"
                    />
                  </td>
                  <td className = "px-4 py-2">
                    <input
                      type="number"
                      value={asset.allocation}
                      onChange={(e) => handleAssetChange(index, 'allocation', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Factor Analysis
          </button>
        </div>
        
      <div className="bg-white p-6 shadow-md rounded-xl mt-5">
        <h4 className='text-[rgb(18,0,255)] font-medium text-xl mb-6 ml-9'>Provided Portfolio</h4>
        <Portfolio assets={assets} />
      </div>

        {results && (
          <div className='mt-8 rounded-xl shadow-md p-4'>
            <h4 className='text-[rgb(18,0,255)] font-medium text-xl mb-6 ml-9'>Provided Regression Results</h4>
            <PortfolioRegressionResults data={results} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioForm;
