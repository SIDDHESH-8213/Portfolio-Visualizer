import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import useFedRates from '../data_loader/fedrates'; 

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const EconomicDataChart = ({ seriesId }) => {
  const { data, loading, error } = useFedRates(seriesId);

  const chartData = {
    labels: data.map(item => item.date),
    datasets: [{
      label: `Data for ${seriesId}`,
      data: data.map(item => parseFloat(item.value)), // Ensure value is a number
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      fill: false,
    }],
  };

  return (
    <div>
      <h2>Economic Data Chart</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error}</p>}
      {data.length > 0 && <Line data={chartData} />}
    </div>
  );
};

export default EconomicDataChart;
