import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

interface AnnualReturn {
  year: string;
  return: number;
}

interface Props {
  annualReturns1: AnnualReturn[] | undefined;
  annualReturns2?: AnnualReturn[] | undefined;
  annualReturns3?: AnnualReturn[] | undefined;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnnualReturnsChart = ({ annualReturns1 = [], annualReturns2 = [], annualReturns3 = [] }: Props) => {
  // Ensure that the data is an array; otherwise, fall back to an empty array
  const safeAnnualReturns1 = Array.isArray(annualReturns1) ? annualReturns1 : [];
  const safeAnnualReturns2 = Array.isArray(annualReturns2) ? annualReturns2 : [];
  const safeAnnualReturns3 = Array.isArray(annualReturns3) ? annualReturns3 : [];

  // Create labels (assuming annual returns have year as key)
  const labels = Object.keys(annualReturns1).map(year => (parseInt(year)).toString());

  // Data for the chart
  const data = {
    labels,
    datasets: [
      {
        label: 'Portfolio 1',
        data: Object.values(annualReturns1),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Portfolio 2',
        data: Object.values(annualReturns2),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Portfolio 3',
        data: Object.values(annualReturns3),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom', // Change this to an accepted value
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += `${(context.raw * 100).toFixed(2)}%`;
            return label;
          },
        },
      },
      title: {
        display: true,
        text: 'Annual Returns',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value * 100}%`;
          },
        },
      },
    },
  };

  return (
    <div className=" bg-white p-6" style={{ width: '1202px', height: '569px' }}>
        <h4 className='text-[rgb(18,0,255)] font-medium text-xl mb-3 ml-6'>Annual Returns</h4>
        <Bar data={data} options={options} />
    </div>
  );
};

export default AnnualReturnsChart;
