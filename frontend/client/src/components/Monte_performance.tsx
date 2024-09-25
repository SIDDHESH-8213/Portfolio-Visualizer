import React from 'react';

const Monte_performance = ({ data }) => {
  const { mean_final_value, median_final_value, percentiles } = data;
  // Calculate additional metrics
  const startBalance = percentiles['10th'][0];
  const percentileKeys = ['10th', '25th', '50th', '75th', '90th'];

  // Helper function to calculate annual mean return
  const calculateAnnualMeanReturn = (start, end, periods) => {
    return (((end / start) ** (1 / periods)) - 1) * 100;
  };

  // Helper function to calculate standard deviation (volatility)
  const calculateStandardDeviation = (values) => {
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const variance = values.reduce((acc, val) => acc + (val - mean) ** 2, 0) / values.length;
    return Math.sqrt(variance);
  };

  // Calculate metrics for each percentile
  const metrics = percentileKeys.reduce((acc, key) => {
    const values = percentiles[key];
    const endBalance = values[values.length - 1];
    const annualMeanReturn = calculateAnnualMeanReturn(startBalance, endBalance, values.length - 1);
    const annualizedVolatility = calculateStandardDeviation(values.map((value, index) => 
      index > 0 ? ((value / values[index - 1]) - 1) * 100 : 0
    ).slice(1)); // remove the first element which is always 0

    const sharpeRatio = annualMeanReturn / annualizedVolatility;

    acc[key] = {
      endBalance,
      annualMeanReturn,
      annualizedVolatility,
      sharpeRatio,
    };

    return acc;
  }, {});

  return (
    <div className="p-6 bg-white ">
      <h2 className="text-blue-600 font-bold text-xl mb-4">Performance Summary</h2>
      <div className="mb-4">
        <p className="text-gray-800"><strong>Mean Final Value:</strong> ${mean_final_value.toFixed(2)}</p>
        <p className="text-gray-800"><strong>Median Final Value:</strong> ${median_final_value.toFixed(2)}</p>
      </div>

      {/* Metrics Table */}
      <table className="min-w-full table-auto border-collapse mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Metric</th>
            {percentileKeys.map((key) => (
              <th key={key} className="px-4 py-2 text-center text-sm font-medium text-gray-600">{key} Percentile</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="px-4 py-2 text-sm text-gray-800 font-semibold">Start Balance</td>
            {percentileKeys.map((key) => (
              <td key={key} className="px-4 py-2 text-sm text-center text-gray-800">${startBalance.toFixed(2)}</td>
            ))}
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2 text-sm text-gray-800 font-semibold">End Balance</td>
            {percentileKeys.map((key) => (
              <td key={key} className="px-4 py-2 text-sm text-center text-gray-800">${metrics[key].endBalance.toFixed(2)}</td>
            ))}
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2 text-sm text-gray-800 font-semibold">Annual Mean Return</td>
            {percentileKeys.map((key) => (
              <td key={key} className="px-4 py-2 text-sm text-center text-gray-800">{metrics[key].annualMeanReturn.toFixed(2)}%</td>
            ))}
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2 text-sm text-gray-800 font-semibold">Annualized Volatility (Std)</td>
            {percentileKeys.map((key) => (
              <td key={key} className="px-4 py-2 text-sm text-center text-gray-800">{metrics[key].annualizedVolatility.toFixed(2)}%</td>
            ))}
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2 text-sm text-gray-800 font-semibold">Sharpe Ratio</td>
            {percentileKeys.map((key) => (
              <td key={key} className="px-4 py-2 text-sm text-center text-gray-800">{metrics[key].sharpeRatio.toFixed(2)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Monte_performance;
