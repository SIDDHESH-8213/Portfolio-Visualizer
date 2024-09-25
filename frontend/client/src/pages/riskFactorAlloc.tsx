import React, { useState } from 'react';
import axios from 'axios';
import Portfolio from '../components/Protfolio'; 

const RiskFactorAlloc = () => {
  const [factors, setFactors] = useState({
    Market: 0.59,
    SMB: 0.05,
    HML: 0.17,
    TRM: 0.17,
    CDT: 0.16,
  });

  const [assets, setAssets] = useState([
    { name: 'DFUSX', allocation: 30 },
    { name: 'DFLVX', allocation: 15 },
    { name: 'DFSVX', allocation: 15 },
    { name: 'DFIHX', allocation: 10 },
    { name: 'IEF', allocation: 10 },
    { name: 'TLT', allocation: 10 },
    { name: 'LQD', allocation: 10 },
  ]);

  const [result, setResult] = useState(null);

  const handleSliderChange = (factor, newValue) => {
    setFactors({ ...factors, [factor]: parseFloat(newValue) });
  };

  const handleAssetChange = (index, field, value) => {
    const updatedAssets = assets.map((asset, i) =>
      i === index ? { ...asset, [field]: field === 'allocation' ? parseFloat(value) : value } : asset
    );
    setAssets(updatedAssets);
  };

  const handleOptimize = async () => {
    const tickers = assets.map(asset => asset.name);
    const allocations = assets.map(asset => asset.allocation / 100);
    const desired_exposure = factors;

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/riskfactorallocation', {
        tickers,
        allocations,
        desired_exposure
      });

      const adjustedAllocations = response.data.adjusted_allocations;
      console.log(adjustedAllocations)
      const updatedAssets = assets.map((asset, index) => ({
        ...asset,
        allocation: parseFloat(adjustedAllocations[index]) * 100 
      }));

      setResult(updatedAssets);
    } catch (error) {
      console.error('Error optimizing portfolio:', error);
    }
  };

  return (
    <div className=" bg-gray-50 min-h-screen px-[10%]">
      <div className='px-5'>
        <div className='text-3xl font-semibold mt-6'>
          Risk Factor Allocation
        </div>
        <hr className='mt-4' />

        <div className='text-3xl font-normal mt-4'>
          Risk Factor Allocation Overview
        </div>

        <div className='mt-4'>
          This tool supports optimizing the portfolio asset allocation based on the targeted risk factor 
          exposures. The returns of the given portfolio are first regressed against the selected risk factor 
          model consisting of equity risk factors (e.g. market, size, value), fixed income risk factors 
          (e.g. term, credit), custom risk factor series, or any combination thereof. Based on the regression 
          results, the targeted risk factor exposures of the portfolio can then be adjusted. You can also 
          specify a list of optional assets that the optimizer can choose to add to the portfolio in order 
          to meet the targeted risk factor exposures.        
        </div>
      </div>


      <div className="px-5 py-4 mt-4">
        <div className="text-2xl font-medium">
          Model Configuration
        </div>

        <div className="flex flex-col gap-2 mt-8">
          <div className="flex flex-row justify-between text-center items-center align-middle w-[50%]">
            <div className="font-medium">Factor Returns</div>
            <input
              type="text"
              className="bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none"
              value="Fama-French Research Factors"
              readOnly
            />
          </div>

          <div className="flex flex-row justify-between text-center items-center align-middle w-[50%]">
            <div className="font-medium">Equity Factor Model</div>
            <input
              type="text"
              className="bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none"
              value="Three-Factor Model"
              readOnly
            />
          </div>

          <div className="flex flex-row justify-between text-center items-center align-middle w-[50%]">
            <div className="font-medium">Fixed Income Factor Model</div>
            <input
              type="text"
              className="bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none"
              value='Term + Credit'
              readOnly
            />
          </div>

          
        </div>
      </div>



      <div className=" p-6  mb-6">
        <h1 className="text-2xl font-medium mt-6 mb-3">Portfolio Assets</h1>
        <div className="space-y-2">
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
      </div>

      <div className="bg-white p-6 shadow rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Factor Exposure Adjustments</h2>
        <div className="space-y-4">
          {Object.entries(factors).map(([factor, value]) => (
            <div key={factor} className="flex items-center space-x-4">
              <div className="w-1/4 text-gray-700">{factor}</div>
              <input
                type="range"
                min="-0.20"
                max="1.00"
                step="0.01"
                value={value}
                onChange={(e) => handleSliderChange(factor, e.target.value)}
                className="w-1/2"
              />
              <input
                type="number"
                value={value}
                onChange={(e) => handleSliderChange(factor, e.target.value)}
                className="w-20 border-gray-300 rounded-md shadow-sm"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={handleOptimize} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow">
            Optimize
          </button>
          <button onClick={() => setFactors({
            Market: 0.59,
            SMB: 0.05,
            HML: 0.17,
            TRM: 0.17,
            CDT: 0.16,
          })} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow">
            Reset
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow">Cancel</button>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-md">
        <h4 className='text-[rgb(18,0,255)] font-medium text-xl mb-6 ml-9'>Provided Portfolio</h4>
        <Portfolio assets={assets} />
      </div>

      {result && (
        <div className="bg-white p-6 mt-6 shadow rounded-md">
          <h4 className='text-[rgb(18,0,255)] font-medium text-xl mb-6 ml-9'>Adjusted Portfolio</h4>
          <Portfolio assets={result} />
        </div>
      )}
    </div>
  );
};

export default RiskFactorAlloc;
