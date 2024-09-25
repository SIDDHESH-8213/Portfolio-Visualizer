import React from 'react';

const EconomicIndicators = () => {
  const indicators = [
    {
      title: 'Consumer Price Index (CPI)',
      description:
        'The CPI measures the average change in prices over time that consumers pay for a basket of goods and services. It’s a primary indicator for inflation.',
      whyItMatters: 'Rising CPI indicates inflation, reducing purchasing power.'
    },
    {
      title: 'Oil Prices',
      description:
        'Oil prices affect the cost of energy, transportation, and goods. Changes in oil prices have a broad impact on inflation and economic activity.',
      whyItMatters: 'Higher oil prices can increase production costs, driving inflation.'
    },
    {
      title: 'Unemployment Rate',
      description:
        'The unemployment rate shows the percentage of people actively seeking jobs but unable to find work. It is a key indicator of economic health.',
      whyItMatters: 'High unemployment signals a weak economy, reducing consumer spending.'
    },
    {
      title: 'Fed Interest Rates',
      description:
        'The Federal Reserve adjusts interest rates to control inflation and stimulate or slow down economic growth. Higher rates make borrowing more expensive.',
      whyItMatters: 'Fed rate changes affect borrowing costs, consumer spending, and investment.'
    },
    {
      title: 'Inflation',
      description:
        'Inflation is the rise in prices over time, decreasing the purchasing power of money. Central banks aim to control inflation to maintain economic stability.',
      whyItMatters: 'High inflation erodes savings and reduces purchasing power.'
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Key Economic Indicators</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {indicators.map((indicator, index) => (
          <div key={index} className="p-6 bg-white shadow-md rounded-md">
            <h3 className="text-xl font-bold mb-2">{indicator.title}</h3>
            <p className="mb-4">{indicator.description}</p>
            <p className="text-blue-600 font-semibold">Why it matters: {indicator.whyItMatters}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EconomicIndicators;
