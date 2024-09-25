import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const EconomicIntro = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Understanding Economic Indicators</h2>
      <p className="mb-6 text-lg text-gray-700">
        Economic indicators are critical for evaluating the health of an economy. They help investors, policymakers, and analysts gauge the strength of various economic sectors and predict future economic performance. Some of the most commonly followed indicators include inflation, unemployment rates, interest rates, and oil prices. Monitoring these indicators can provide insight into economic trends and assist in making informed decisions.
      </p>
    </div>
  );
};

const EconomicGraphs = () => {
  const [cpiData, setCpiData] = useState([]);
  const [oilData, setOilData] = useState([]);
  const [unemploymentData, setUnemploymentData] = useState([]);
  const [fedRatesData, setFedRatesData] = useState([]);
  const [inflationData, setInflationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [cpiResponse, oilResponse, unemploymentResponse, fedRatesResponse, inflationResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/cpi'),
        axios.get('http://localhost:5000/api/oil'),
        axios.get('http://localhost:5000/api/unemployment'),
        axios.get('http://localhost:5000/api/fed-rates'),
        axios.get('http://localhost:5000/api/inflation'),
      ]);

      setCpiData(cpiResponse.data.observations);
      setOilData(oilResponse.data.observations);
      setUnemploymentData(unemploymentResponse.data.observations);
      setFedRatesData(fedRatesResponse.data.observations);
      setInflationData(inflationResponse.data.observations);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const prepareChartData = (data, label, color) => {
    return {
      labels: data.map((item) => item.date),
      datasets: [
        {
          label,
          data: data.map((item) => parseFloat(item.value)),
          fill: false,
          borderColor: color,
          backgroundColor: color,
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 gap-6">
        
        <div className="flex flex-col md:flex-row bg-white  p-6">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Consumer Price Index (CPI)</h3>
            <p className="mb-4 text-gray-700">
              The CPI measures the average change in prices over time that consumers pay for a basket of goods and services. It’s a primary indicator for inflation.
            </p>
            <p className="mb-6 text-blue-600 font-semibold">Why it matters: Rising CPI indicates inflation, reducing purchasing power.</p>
          </div>
          <div className="md:w-1/2">
            <Line data={prepareChartData(cpiData, 'CPI', '#4B9CD3')} />
          </div>
        </div>

       
        <div className="flex flex-col md:flex-row bg-white   p-6">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Oil Prices</h3>
            <p className="mb-4 text-gray-700">
              Oil prices affect the cost of energy, transportation, and goods. Changes in oil prices have a broad impact on inflation and economic activity.
            </p>
            <p className="mb-6 text-blue-600 font-semibold">Why it matters: Higher oil prices can increase production costs, driving inflation.</p>
          </div>
          <div className="md:w-1/2">
            <Line data={prepareChartData(oilData, 'Oil Prices', '#28A745')} />
          </div>
        </div>

        
        <div className="flex flex-col md:flex-row bg-white  p-6">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Unemployment Rate</h3>
            <p className="mb-4 text-gray-700">
              The unemployment rate shows the percentage of people actively seeking jobs but unable to find work. It is a key indicator of economic health.
            </p>
            <p className="mb-6 text-blue-600 font-semibold">Why it matters: High unemployment signals a weak economy, reducing consumer spending.</p>
          </div>
          <div className="md:w-1/2">
            <Line data={prepareChartData(unemploymentData, 'Unemployment Rate', '#FFA500')} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-white  p-6">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Fed Interest Rates</h3>
            <p className="mb-4 text-gray-700">
              The Federal Reserve adjusts interest rates to control inflation and stimulate or slow down economic growth. Higher rates make borrowing more expensive.
            </p>
            <p className="mb-6 text-blue-600 font-semibold">Why it matters: Fed rate changes affect borrowing costs, consumer spending, and investment.</p>
          </div>
          <div className="md:w-1/2">
            <Line data={prepareChartData(fedRatesData, 'Fed Interest Rates', '#6A5ACD')} />
          </div>
        </div>

      
        <div className="flex flex-col md:flex-row bg-white  p-6">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Inflation</h3>
            <p className="mb-4 text-gray-700">
              Inflation is the rise in prices over time, decreasing the purchasing power of money. Central banks aim to control inflation to maintain economic stability.
            </p>
            <p className="mb-6 text-blue-600 font-semibold">Why it matters: High inflation erodes savings and reduces purchasing power.</p>
          </div>
          <div className="md:w-1/2">
            <Line data={prepareChartData(inflationData, 'Inflation', '#FF6347')} />
          </div>
        </div>
      </div>
    </div>
  );
};


const EconomicDashboard = () => {
  return (
    <div>
      <EconomicIntro />
      <EconomicGraphs />
    </div>
  );
};

export default EconomicDashboard;
