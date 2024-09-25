import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PercentileChart = ({ data }) => {
    console.log(data)
  const chartData = {
    labels: Array.from({ length: 10 }, (_, i) => i + 1), 
    datasets: [
      {
        label: '10th Percentile',
        data: data.percentiles["10th"],
        borderColor: '#E63946',
        fill: false,
        tension: 0.1,
      },
      {
        label: '25th Percentile',
        data: data.percentiles["25th"],
        borderColor: '#F4A261',
        fill: false,
        tension: 0.1,
      },
      {
        label: '50th Percentile',
        data: data.percentiles["50th"],
        borderColor: '#8D4E85',
        fill: false,
        tension: 0.1,
      },
      {
        label: '75th Percentile',
        data: data.percentiles["75th"],
        borderColor: '#2A9D8F',
        fill: false,
        tension: 0.1,
      },
      {
        label: '90th Percentile',
        data: data.percentiles["90th"],
        borderColor: '#3A5A98',
        fill: false,
        tension: 0.1,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Simulated Portfolio Balance',
        color: 'black',
        font: {
            size: 18, // Increase the font size
            weight: 'bold', // Optional: make it bold
            lineHeight: 1.5 // Adjust the line height
        },
        padding: {
            top: 20,
            bottom: 20
        }
    },
    
    },
  };

  return <Line data={chartData} options={options} style={{ width: '1100px', height: '510px' }}/>;
};

export default PercentileChart;
