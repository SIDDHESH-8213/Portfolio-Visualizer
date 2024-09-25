import React, { useState } from 'react';
import axios from 'axios';
import PortfolioLineChart from '../components/PortfolioLineChart';
import Performance from '../components/Performance';
import AnnualReturnsChart from '../components/AnnualReturnsChart';

const Backtst = () => {
  const [portfolios1, setPortfolios1] = useState(null);
  const [portfolios2, setPortfolios2] = useState(null);
  const [portfolios3, setPortfolios3] = useState(null);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allocations, setAllocations] = useState([
    { assetClass: 'US Stock Market', allocation1: 0, allocation2: 0, allocation3: 0 },
    { assetClass: 'Global ex-US Stock Market', allocation1: 0, allocation2: 0, allocation3: 0 },
    { assetClass: 'Total US Bond Market', allocation1: 0, allocation2: 0, allocation3: 0 },
    { assetClass: 'REIT', allocation1: 0, allocation2: 0, allocation3: 0 }
  ]);

  const handleInputChange = (index, field, value) => {
    const newAllocations = [...allocations];
    newAllocations[index][field] = value;
    setAllocations(newAllocations);
  };

  const handleSubmit = async () => {
    const allocationData1 = {
        initial_investment: 10000, 
        allocations: allocations.reduce((acc, alloc) => {
          acc[alloc.assetClass] = alloc.allocation1;
          return acc;
        }, {})
    }

    const allocationData2 = {
      initial_investment: 10000, 
        allocations: allocations.reduce((acc, alloc) => {
          acc[alloc.assetClass] = alloc.allocation2;
          return acc;
        }, {})
    }

    const allocationData3 = {
      initial_investment: 10000, 
        allocations: allocations.reduce((acc, alloc) => {
          acc[alloc.assetClass] = alloc.allocation3;
          return acc;
        }, {})
    }

    try {
      const response1 = await axios.post('http://127.0.0.1:5000/api/backtest', allocationData1);
      const response2 = await axios.post('http://127.0.0.1:5000/api/backtest', allocationData2);
      const response3 = await axios.post('http://127.0.0.1:5000/api/backtest', allocationData3);
      const data1 = response1.data;
      const data2 = response2.data;
      const data3 = response3.data;
      setPortfolios1(data1)
      setPortfolios2(data2)
      setPortfolios3(data3)
      console.log(data1)
    } catch (error) {
      console.error('Error during backtest:', error);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen relative px-[10%]'>
      <div className='px-5'>
        <div className='text-3xl font-semibold mt-6'>
          Backtest Portfolio Asset Allocation Class
        </div>
        <hr className='mt-4' />

        <div className='text-3xl font-normal mt-4'>
          Asset Class Allocation Overview
        </div>

        <div className='mt-4'>
          This portfolio backtesting tool allows you to construct one or more portfolios based on the selected asset class level allocations in order to analyze and backtest portfolio returns, risk characteristics, drawdowns, and rolling returns.
        </div>
      </div>

      <div className='px-5 py-4 mt-4'>
        <div className='text-2xl font-medium'>
          Portfolio Model Configuration
        </div>

        <div className='flex flex-col gap-1 mt-8'>
          <div className='flex flex-row justify-between text-center items-center align-middle w-[40%]'>
            <div className='font-medium'>Initial Amount</div>
            <input
              type='number'
              className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
            />
          </div>

          <div className='flex flex-row justify-between text-center items-center align-middle w-[40%]'>
            <div className='font-medium'>Start Date</div>
            <input
              type='date'
              className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className='flex flex-row justify-between text-center items-center align-middle w-[40%]'>
            <div className='font-medium'>End Date</div>
            <input
              type='date'
              className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className='mt-10'>
          <table className='min-w-full'>
            <thead>
              <tr className='bg-white'>
                <th className='px-4 py-2 text-center'>Asset Allocation</th>
                <th className='px-4 py-2 text-center'>Asset Class</th>
                <th className='px-4 py-2 text-center'>Portfolio #1</th>
                <th className='px-4 py-2 text-center'>Portfolio #2</th>
                <th className='px-4 py-2 text-center'>Portfolio #3</th>
              </tr>
            </thead>

            <tbody>
              {allocations.map((allocation, index) => (
                <tr key={index} className='odd:bg-gray-50 even:bg-white'>
                  <td className='px-4 py-2'>Asset {index + 1}</td>
                  <td className='px-4 py-2'>
                    <select
                      className='w-full bg-gray-50 border border-gray-300 rounded px-2 py-1'
                      value={allocation.assetClass}
                      onChange={(e) =>
                        handleInputChange(index, 'assetClass', e.target.value)
                      }
                    >
                      <option>Select asset class...</option>
                      <option value='US Stock Market'>US Stock Market</option>
                      <option value='Global ex-US Stock Market'>Global ex-US Stock Market</option>
                      <option value='Total US Bond Market'>Total US Bond Market</option>
                      <option value='REIT'>REIT</option>
                    </select>
                  </td>
                  <td className='px-4 py-2 text-center'>
                    <input
                      type='number'
                      placeholder='%'
                      className='w-full border border-gray-300 rounded px-2 py-1 text-center'
                      value={allocation.allocation1}
                      onChange={(e) =>
                        handleInputChange(index, 'allocation1', parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td className='px-4 py-2 text-center'>
                    <input
                      type='number'
                      placeholder='%'
                      className='w-full border border-gray-300 rounded px-2 py-1 text-center'
                      value={allocation.allocation2}
                      onChange={(e) =>
                        handleInputChange(index, 'allocation2', parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td className='px-4 py-2 text-center'>
                    <input
                      type='number'
                      placeholder='%'
                      className='w-full border border-gray-300 rounded px-2 py-1 text-center'
                      value={allocation.allocation3}
                      onChange={(e) =>
                        handleInputChange(index, 'allocation3', parseFloat(e.target.value))
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className='absolute my-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:shadow-md left-1/2 -translate-x-1/2'
          onClick={handleSubmit}
        >
          Submit Allocations
        </button>

        {portfolios1 && portfolios2 && portfolios3 && (
              <div className="mt-20 bg-white pt-2 shadow-lg rounded-2xl" style={{ width: '1250px', height: '350px'} }>
                <Performance portfolio1 = {portfolios1} portfolio2={portfolios2} portfolio3={portfolios3} initial_inv={initialInvestment}/>
              </div>
              
          )
        }
            
        {portfolios1 && portfolios2 && portfolios3 && (
          <div className="mt-8 bg-white pt-5 shadow-lg rounded-2xl" style={{ width: '1250px', height: '640px' }}>
            <h4 className='text-[rgb(18,0,255)] font-medium text-xl mb-3 ml-9'>Portfolio Growth</h4>
            <PortfolioLineChart yearResults1={portfolios1.year_results} 
                                yearResults2={portfolios2.year_results} 
                                yearResults3={portfolios3.year_results} 
            />
          </div>
        )}

        {portfolios1 && portfolios2 && portfolios3 && (
          <div className='bg-white mt-8 pt-5 shadow-lg rounded-2xl' style={{ width: '1250px', height: '640px' }}>
            <AnnualReturnsChart annualReturns1={portfolios1.annual_returns} annualReturns2={portfolios2.annual_returns} annualReturns3={portfolios3.annual_returns}/>
          </div>
        )}


        
      </div>
    </div>
  );
};

export default Backtst;
