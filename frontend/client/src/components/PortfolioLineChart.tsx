import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface Props  {
  yearResults1: any,
  yearResults2?: any,
  yearResults3?: any,
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PortfolioLineChart = ({ yearResults1, yearResults2, yearResults3 } : Props) => {
  // Generate labels for the years 2014 to 2024
  const labels = Object.keys(yearResults1).map(year => (parseInt(year)).toString());

  // Extract data points for each portfolio
  const dataPoints1 = Object.values(yearResults1);
  const dataPoints2 = yearResults2 ? Object.values(yearResults2) : [];
  const dataPoints3 = yearResults3 ? Object.values(yearResults3) : [];

  // Prepare chart data
  const chartData = {
    labels, // ['2014', '2015', ..., '2024']
    datasets: [
      {
        label: 'Portfolio 1',
        data: dataPoints1, // [10096.42, 10925.07, ..., 21867.10]
        backgroundColor: 'rgba(37, 99, 235, 0.5)', // Blue with opacity
        borderColor: 'rgb(37, 99, 235)', // Blue color for the line
        tension: 0.3, // Smooth the line
      },
      ...(dataPoints2.length ? [{
        label: 'Portfolio 2',
        data: dataPoints2,
        backgroundColor: 'rgba(32, 201, 151, 0.5)', // Green with opacity
        borderColor: 'rgb(32, 201, 151)', // Green color for the line
        tension: 0.3,
      }] : []),
      ...(dataPoints3.length ? [{
        label: 'Portfolio 3',
        data: dataPoints3,
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red with opacity (for contrast)
        borderColor: 'rgb(255, 99, 132)', // Red color for the line
        tension: 0.3,
      }] : []),
    ],
  };

  // Configure chart options
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Portfolio Balance ($)',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-6" style={{ width: '1202px', height: '569px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PortfolioLineChart;
