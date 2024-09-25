import React from 'react';

interface PerformanceProps {
  portfolio1: any;
  portfolio2?: any;
  portfolio3?: any;
  initial_inv?: any;
}

const Performance = ({ portfolio1, portfolio2, portfolio3, initial_inv }: PerformanceProps) => {
  const portfolios = [portfolio1, portfolio2, portfolio3].filter(Boolean);
  const headers = ['Metric', ...portfolios.map((_, i) => `Portfolio ${i + 1}`)];

  const metrics = [
    'Start Balance',
    'End Balance',
    'Annualized Return (CAGR)',
    'Standard Deviation',
    'Sharpe Ratio',
  ];

  // Function to safely extract metrics
  const extractMetricValues = (portfolio) => {
    // Use a default value for undefined cases
    const yearResults = portfolio.year_results || {};
    const endBalance = yearResults['2024'];
    const startBalance = initial_inv; // First year as start balance

    // Log undefined values
    

    // Return formatted metrics
    return {
      'Start Balance': startBalance !== undefined
        ? `$${Number(startBalance).toFixed(2)}`
        : `$0.00`,
      'End Balance': endBalance !== undefined
        ? `$${Number(endBalance).toFixed(2)}`
        : `$0.00`,
      'Annualized Return (CAGR)': portfolio.cagr !== undefined
        ? `${(Number(portfolio.cagr) * 100).toFixed(2)}%`
        : '0.00%',
      'Standard Deviation': portfolio.std_dev !== undefined
        ? `${(Number(portfolio.std_dev) * 100).toFixed(2)}%`
        : '0.00%',
      'Sharpe Ratio': portfolio.sharpe_ratio !== undefined
        ? `${(Number(portfolio.sharpe_ratio) * 100).toFixed(2)}%`
        : '0.00%',
    };
  };

  const portfolioData = portfolios.map((portfolio) => extractMetricValues(portfolio));

  return (
    <div className="p-6 bg-white">
      <h4 className="text-[rgb(18,0,255)] font-medium text-xl mb-4">Performance Summary</h4>
      <table className="w-full text-left text-gray-800">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, metricIndex) => (
            <tr className={`border-t ${metricIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`} key={metricIndex}>
              <td className="py-2 px-4">{metric}</td>
              {portfolioData.map((data, portfolioIndex) => (
                <td className="py-2 px-4" key={portfolioIndex}>{data[metric]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Performance;
