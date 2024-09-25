import React, { useState } from 'react';
import axios from 'axios';
import FactorCorrelations from '../components/FactorCorrelations';
import RiskReturnChart from '../components/RiskReturnChart';

const FactorStatistics = () => {
  const [factorReturns, setFactorReturns] = useState('');
  const [stockMarket, setStockMarket] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/factorstatistics', {
      });

      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="px-[10%] h-full relative bg-gray-50">
      <div className='px-5'>
        <div className='text-3xl font-semibold pt-3'>
          Factor Return Statistics
        </div>
        <hr className='mt-4'/>
        <div className='mt-6'>
          Factor returns statistics refer to the performance metrics of specific factors (such as value, 
          growth, momentum, size, etc.) that drive returns in a portfolio or investment model. These statistics
          help in understanding how much of the return can be attributed to these individual factors, isolating 
          their impact from other elements. By analyzing factor returns, investors can evaluate the 
          effectiveness of their investment strategies, optimize portfolio construction, and assess risk 
          exposure to specific market or economic conditions. These metrics are crucial in quantitative 
          finance and portfolio management.
        </div>
      </div>

      <div className='px-5'>
        <div className='mt-5 text-3xl'>
          Model Configuration
        </div>
        
        <div className='mt-6 flex flex-row justify-between text-center items-center align-middle w-[60%]'>
          <div className='font-medium'>Factor Returns</div>
          <input
            type='text'
            className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
            value={factorReturns}
            onChange={(e) => setFactorReturns(e.target.value)}
          />
        </div>

        <div className='mt-3 flex flex-row justify-between text-center items-center align-middle w-[60%]'>
          <div className='font-medium'>Stock Market</div>
          <input
            type='text'
            className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
            value={stockMarket}
            onChange={(e) => setStockMarket(e.target.value)}
          />
        </div>

        <div className='mt-3 flex flex-row justify-between text-center items-center align-middle w-[60%]'>
          <div className='font-medium'>Start Date</div>
          <input
            type='date'
            className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className='mt-3 flex flex-row justify-between text-center items-center align-middle w-[60%]'>
          <div className='font-medium'>End Date</div>
          <input
            type='date'
            className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        
      </div>

      <div className='flex justify-center mt-5'>
        <button
          type="submit"
          className="w-[10%] bg-blue-500 text-white p-2 rounded-md"
          onClick={handleSubmit}
        >
          View Statistics
        </button>
      </div>
        
      

      {results && (
        <div className='mt-10 bg-white px-6 py-6 rounded-lg shadow-md'>
          <h4 className='text-[rgb(18,0,255)] font-medium text-2xl mb-6 ml-4'>Factor Correlations</h4>
          <FactorCorrelations data={results}/>
        </div>
      )}

      {results && (
        <div className='mt-10 bg-white px-6 py-6 rounded-lg shadow-md'>
          <h4 className='text-[rgb(18,0,255)] font-medium text-2xl mb-6 ml-4'>Factor Performance</h4>
          <RiskReturnChart data={results} />
        </div>
      )
      }

    </div>
  );
};

export default FactorStatistics;
