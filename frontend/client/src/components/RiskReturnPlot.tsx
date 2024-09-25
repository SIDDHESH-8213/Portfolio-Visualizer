import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, Tooltip, Title, Legend, PointElement, CategoryScale, LinearScale } from 'chart.js';
import 'chart.js/auto';

Chart.register(Tooltip, Title, Legend, PointElement, CategoryScale, LinearScale);

const RiskReturnPlot = ({ plotData }) => {
  const { returns, risk, weights } = plotData;

  // Map data for the chart
  const chartData = {
    datasets: [
      {
        label: 'Portfolios',
        data: risk.map((riskValue, index) => ({
          x: riskValue,
          y: returns[index],
          weights: weights[index],
        })),
        backgroundColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Risk (Standard Deviation)',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Return',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const weights = context.raw.weights;
            return `Weights: ${weights.map(w => w.toFixed(2)).join(', ')}`;
          },
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default RiskReturnPlot;
