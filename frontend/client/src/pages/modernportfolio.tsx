import React, { useState } from 'react';
import RiskReturnPlot from '../components/RiskReturnPlot';
import Fundamentals from '../components/Fundamentals';

const ModernPortfolio = () => {
  const [tickers, setTickers] = useState(Array(4).fill(''));
  const [initialAllocation, setInitialAllocation] = useState(100000);
  const [startYear, setStartYear] = useState('2020-01-01');
  const [endYear, setEndYear] = useState('2024-12-31');
  const [numSimulations, setNumSimulations] = useState(1000);
  const [riskFreeRate, setRiskFreeRate] = useState(0.01); 
  const [apiResponse, setApiResponse] = useState(null);
  const [fresp, setfresp] = useState(null);

  const handleTickerChange = (index, value) => {
    const newTickers = [...tickers];
    newTickers[index] = value;
    setTickers(newTickers);
  };

  const runSimulation = async () => {
    const validTickers = tickers.filter(ticker => ticker.trim() !== '');
    const requestData = {
      tickers: validTickers,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/efficientfrontierdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setApiResponse(data);
      } else {
        console.error('Error fetching data from API:', response.statusText);
      }
    } catch (error) {
      console.error('Error running simulation:', error);
    }

    try {
      const frespResponse = await fetch('http://127.0.0.1:5000/api/fundamental', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (frespResponse.ok) {
        const data = await frespResponse.json();
        setfresp(data);
      } else {
        console.error('Error fetching data from API:', frespResponse.statusText);
      }
    } catch (error) {
      console.error('Error running simulation:', error);
    }
  };

  return (
    <div className="min-h-screen px-[10%] bg-gray-50 relative">
      <div className='px-5'>
        <div className='text-3xl font-semibold pt-3'>
          Efficient Frontier
        </div>
        <hr className='mt-4'/>
        <div className='mt-6'>
          This tool uses mean-variance optimization to calculate and plot the efficient frontier for the 
          specified asset classes, mutual funds, ETFs, or stocks based on historical returns or forward-looking
          capital market assumptions. The efficient frontier shows the set of optimal portfolios that provide 
          the best possible expected return for the level of risk in the portfolio.
        </div>
      </div>

      <div className='px-5'>
        <div className='mt-5 text-3xl'>
          Efficient Frontier Configuration
        </div>
        
        <div className='mt-6 flex flex-row justify-between text-center items-center align-middle w-[60%]'>
          <div className='font-medium'>Initial Amount</div>
          <input
            type='number'
            className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
            value={initialAllocation}
            onChange={(e) => setInitialAllocation(Number(e.target.value))}
          />
        </div>

        <div className='mt-3 flex flex-row justify-between text-center items-center align-middle w-[60%]'>
          <div className='font-medium'>Start Date</div>
          <input
            type='date'
            className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
          />
        </div>

        <div className='mt-3 flex flex-row justify-between text-center items-center align-middle w-[60%]'>
          <div className='font-medium'>End Date</div>
          <input
            type='date'
            className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
          />
        </div>

        <div className='mt-3 flex flex-row justify-between text-center items-center align-middle w-[60%]'>
          <div className='font-medium'>Number of Simulations</div>
          <input
            type='number'
            className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
            value={numSimulations}
            onChange={(e) => setNumSimulations(Number(e.target.value))}
          />
        </div>

        <div className='mt-3 flex flex-row justify-between text-center items-center align-middle w-[60%]'>
          <div className='font-medium'>Risk Free Rate</div>
          <input
            type='number'
            className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
            value={riskFreeRate}
            onChange={(e) => setRiskFreeRate(Number(e.target.value))}
          />
        </div>
      </div>
      
      <div className='mt-10 bg-white shadow-md px-4 py-6 rounded-xl'>

        <h4 className='text-[rgb(18,0,255)] font-medium text-2xl mb-3 ml-9'>Portfolio</h4>

        <table className='w-[100%]'>
          <thead>
            <tr className='bg-white'>
              <th className='px-4 py-2 text-center'>Asset Allocation</th>
              <th className='px-4 py-2 text-center'>Asset Class</th>
            </tr>
          </thead>
          <tbody>
            {tickers.map((ticker, index) => (
              <tr key={index} className='odd:bg-gray-50 even:bg-white'>
                <td className='px-2 py-1 text-center'>Asset {index + 1}</td>
                <td className='px-2 py-1 text-center'>
                  <input
                    type='text'
                    className='w-[60%] bg-gray-50 border border-gray-300 shadow-md rounded px-2 py-1'
                    value={ticker}
                    onChange={(e) => handleTickerChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-end mr-44'>
          <button onClick={runSimulation} className='mt-5 bg-blue-500 text-white px-4 py-2 rounded'>
            Run Simulation
          </button>
        </div>
        
      </div>
      
      

      {apiResponse && (
        <div className='mt-10 bg-white px-6 py-6 rounded-lg shadow-md'>
          
          <h4 className='text-[rgb(18,0,255)] font-medium text-2xl mb-3 ml-9'>Efficient Frontier</h4>

          <RiskReturnPlot plotData={apiResponse} />
        </div>
        
      )}

      {fresp && (
        <div className='mt-10 bg-white px-6 py-6 rounded-lg shadow-md'>
          <h4 className='text-[rgb(18,0,255)] font-medium text-2xl mb-3 ml-9'>Efficient Frontier Assets</h4>
          <Fundamentals assets={fresp} />
        </div>
        
      )}
    </div>
  );
};

export default ModernPortfolio;
