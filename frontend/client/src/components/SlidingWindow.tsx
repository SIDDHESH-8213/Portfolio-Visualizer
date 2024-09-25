import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import useFedRates from '../data_loader/fedrates';

const seriesIds = {
  CPI: 'CPIAUCNS',
  GDP: 'GDPC1',
  Unemployment: 'UNRATE',
  FedFunds: 'FEDFUNDS',
  Treasury10Y: 'GS10',
  OilPrices: 'IR14200'
};

const SlidingWindow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: cpiData, loading: cpiLoading } = useFedRates(seriesIds.CPI);
  const { data: gdpData, loading: gdpLoading } = useFedRates(seriesIds.GDP);
  const { data: unemploymentData, loading: unemploymentLoading } = useFedRates(seriesIds.Unemployment);
  const { data: fedFundsData, loading: fedFundsLoading } = useFedRates(seriesIds.FedFunds);
  const { data: treasury10YData, loading: treasury10YLoading } = useFedRates(seriesIds.Treasury10Y);
  const { data: oilPricesData, loading: oilPricesLoading } = useFedRates(seriesIds.OilPrices);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 5 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 5 ? 0 : prevIndex + 1));
  };

  const graphs = [
    { title: 'CPI', data: cpiData },
    { title: 'GDP', data: gdpData },
    { title: 'Unemployment', data: unemploymentData },
    { title: 'Fed Funds Rate', data: fedFundsData },
    { title: '10-Year Treasury Yield', data: treasury10YData },
    { title: 'Oil Prices', data: oilPricesData },
  ];

  return (
    <div className='relative'>
      <div className='flex overflow-hidden'>
        <div className='flex w-full transition-transform duration-500' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {graphs.map((graph, index) => (
            <div key={index} className='w-full flex-shrink-0'>
              {cpiLoading || gdpLoading || unemploymentLoading || fedFundsLoading || treasury10YLoading || oilPricesLoading ? (
                <p>Loading...</p>
              ) : (
                <Graph title={graph.title} data={graph.data} />
              )}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handlePrev} className='absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r'>
        Prev
      </button>
      <button onClick={handleNext} className='absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l'>
        Next
      </button>
    </div>
  );
};

export default SlidingWindow;
