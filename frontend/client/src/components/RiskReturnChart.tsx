import React from 'react';
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';

const RiskReturnChart = ({ data }) => {
  // Extracting keys (e.g., EFV, IWM, etc.) and corresponding risk and return data
  const keys = Object.keys(data["Annualized Return"]);
  
  const chartData = {
    datasets: keys.map((key, index) => ({
      label: key,
      data: [{
        x: data["Annualized Standard Deviation"][key], // Risk
        y: data["Annualized Return"][key] // Return
      }],
      backgroundColor: `hsl(${index * 50}, 70%, 50%)`, // Generate different colors for each point
      pointRadius: 5
    }))
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Annualized Standard Deviation (Risk)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Annualized Return',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return (
      
        <Scatter data={chartData} options={options} />
      
  );
};

export default RiskReturnChart;
