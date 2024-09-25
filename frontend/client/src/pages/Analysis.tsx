import React from 'react'
import { useState } from 'react';
import ToolBox from '../components/ToolBox'

const Analysis = () => {

  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (index: number) => {
    setSelectedButton(index);
  };

  const sidebar = ['All Functions', 'Financial Planning', 'Research Insights', 'Portfolio Construction']

  const Backtest = [
    { name: 'Backtest Asset Allocation', addre: '/backtest' },
  ];

  const Monte = [
    { name: 'Monte Carlo Simulation', addre: '/montecarlo' },
  ];

  const Efficient = [
    { name: 'Efficient Frontier', addre: '/modernportfolio' },
  ];

  const Factor = [
    { name: 'Factor Regression', addre: '/factorregression' },
    { name: 'Factor Statistics', addre: '/factorstatistics' },
  ];

  const Asset = [
    { name: 'Asset Correlation', addre: '/assetcorrelation' },
  ];

  const Risk = [
    { name: 'Risk Factor Allocation', addre: '/riskfactor' },
  ];

  return (
    <div className='bg-white min-h-screen px-5'>
      <div className='px-[3%] mt-5'>
        <div className='text-3xl font-semibold mb-3'>Portfolio Visualizer Tools</div>
        <hr className='mb-4' />
      </div>

      <div className='flex flex-row justify-between mx-8 mt-10'>
        <div className='flex flex-col w-[25%] '>
          <div className='text-gray-900 font-medium text-2xl'>Select Solutions for</div>

          <div className='flex flex-col gap-5 mt-5'>
            {sidebar.map((cont, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              className={`bg-gray-200 rounded-2xl px-5 py-[10px] w-[70%] 
                transition-colors duration-300  font-medium
              ${selectedButton === index ? 'bg-gray-900 text-[#35ffb6]' : 'text-black hover:bg-gray-900 hover:text-[#35ffb6]'}`}
            >
              {cont}
            </button>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-[75%]'>
          <ToolBox 
            Title='Backtest Portfolio' 
            description='Backtest a portfolio asset allocation and compare historical and realized returns and
            risk characteristics against various lazy portfolios.'
            functions1={Backtest}
          />
          <ToolBox 
            Title='Monte Carlo Simulation' 
            description='Run Monte Carlo simulations for the specified portfolio based on historical or forecasted returns to test long term expected portfolio growth and survival, and the capability to meet financial goals and liabilities.'
            functions1={Monte}
          />
          <ToolBox 
            Title='Portfolio Optimization' 
            description='Chart the efficient frontier to explore risk vs. return trade-offs based on historical or forecasted returns. Optimize portfolios based on mean-variance, conditional value-at-risk (CVaR), risk-return ratios, or drawdowns.'
            functions1={Efficient}
          />
          <ToolBox 
            Title='Risk Factor Allocation' 
            description='Compare and test tactical allocation models based on moving averages, momentum, market valuation, and volatility targeting.'
            functions1={Risk}
          />
          <ToolBox 
            Title='Factor Analysis' 
            description='Run regression analysis using Fama-French and Carhart factor models for individual assets or a portfolio to analyze returns against market, size, value and momentum factors.'
            functions1={Factor}
          />
          <ToolBox 
            Title='Asset Analytics' 
            description='Find funds based on asset class, style and risk adjusted performance, and analyze asset correlations.'
            functions1={Asset}
          />
          
        </div>

      </div>

      
    </div>
  )
}

export default Analysis;
