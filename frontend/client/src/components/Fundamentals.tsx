import React from 'react';

const EfficientFrontierTable = ({ assets }) => {
  const { expectedReturn, standardDeviation, sharpeRatio, minWeight, maxWeight, ticker } = assets;

  
  const formattedAssets = ticker.map((tick, index) => ({
    ticker: tick,
    expectedReturn: expectedReturn[tick],
    standardDeviation: standardDeviation[tick],
    sharpeRatio: sharpeRatio[tick],
    minWeight: minWeight[index],
    maxWeight: maxWeight[index],
  }));

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-white">
          <th className="py-2 px-4 text-left border-b">Asset</th>
          <th className="py-2 px-4 text-left border-b">Expected Return</th>
          <th className="py-2 px-4 text-left border-b">Standard Deviation</th>
          <th className="py-2 px-4 text-left border-b">Sharpe Ratio</th>
          <th className="py-2 px-4 text-left border-b">Min. Weight</th>
          <th className="py-2 px-4 text-left border-b">Max. Weight</th>
        </tr>
      </thead>
      <tbody>
        {formattedAssets.map((asset, index) => (
          <tr
            key={asset.ticker} 
            className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
          >
            <td className="py-2 px-4 border-b">{asset.ticker}</td>
            <td className="py-2 px-4 border-b">{(asset.expectedReturn * 100).toFixed(2)}%</td>
            <td className="py-2 px-4 border-b">{(asset.standardDeviation * 100).toFixed(2)}%</td>
            <td className="py-2 px-4 border-b">{asset.sharpeRatio.toFixed(2)}</td>
            <td className="py-2 px-4 border-b">{asset.minWeight.toFixed(2)}%</td>
            <td className="py-2 px-4 border-b">{asset.maxWeight.toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EfficientFrontierTable;
