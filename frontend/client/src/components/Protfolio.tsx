import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Portfolio = ({ assets }) => {
  if (!assets || assets.length === 0) {
    return <div>No data available</div>;
  }

  const data = {
    labels: assets.map(asset => asset.name),
    datasets: [
      {
        data: assets.map(asset => asset.allocation),
        backgroundColor: [
          '#1D4ED8', '#34D399', '#60A5FA', '#6B7280', '#10B981', '#3B82F6', '#F97316',
        ],
        borderColor: '#ffffff',
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: '#000000', // Black color for percentage text
        formatter: (value, context) => {
          const total = context.chart._metasets[0].total;
          const percentage = (value / total * 100).toFixed(1);
          return `${percentage}%`;
        },
        font: {
          weight: 'bold',
          size: 10,
        },
      },
    },
  };

  return (
    <div className="flex flex-row items-center justify-around">
      <table className="w-[60%] mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Ticker</th>
            <th className="py-2 px-4 border-b">Allocation</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={index} className='odd:bg-gray-50 even:bg-white'>
              <td className="py-2 px-4 border-b text-center">{asset.name}</td>
              <td className="py-2 px-4 border-b text-center">{asset.allocation.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Pie data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default Portfolio;
