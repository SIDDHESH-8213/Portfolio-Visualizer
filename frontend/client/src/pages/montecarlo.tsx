import React, { useState } from 'react';
import Monte_performance from '../components/Monte_performance';
import PercentileChart from '../components/PercentileChart';

const Montecarlo = () => {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [numYears, setNumYears] = useState(10);
  const taxTreat = "Pre-tax Returns";
  const [assets, setAssets] = useState([
    { name: "Asset 1", class: "", allocation: "" },
    { name: "Asset 2", class: "", allocation: "" },
    { name: "Asset 3", class: "", allocation: "" },
    { name: "Asset 4", class: "", allocation: "" },
  ]);

  const [simulationResult, setSimulationResult] = useState(null);

  const handleChange = (index, field, value) => {
    const newAssets = [...assets];
    newAssets[index][field] = value;
    setAssets(newAssets);
  };

  const handleRunSimulation = async () => {
    const weights = assets.map(asset => parseFloat(asset.allocation)/100 || 0);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/montecarlo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          initial_investment: initialInvestment,
          num_simulations: numYears,
          weights: weights,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSimulationResult(result);
        console.log(result)
      } else {
        console.error('Simulation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='bg-gray relative px-[10%] min-h-screen'>
      <div className='px-5'>
        <div className='text-3xl font-semibold mt-6'>
          Monte Carlo Simulation
        </div>
        <hr className='mt-4' />

        <div className='text-3xl font-normal mt-4'>
          Portfolio Monte Carlo Simulation Overview
        </div>

        <div className='mt-4'>
          This Monte Carlo simulation tool provides a means to test long term expected portfolio growth 
          and portfolio survival based on withdrawals, e.g., testing whether the portfolio can sustain the 
          planned withdrawals required for retirement or by an endowment fund.        
        </div>
      </div>

      <div className='px-5 py-4 mt-4'>
        <div className='text-2xl font-medium'>
          Simulation Model Configuration
        </div>

        <div className='flex flex-col gap-1 mt-8'>
          <div className='flex flex-row justify-between text-center items-center align-middle w-[60%]'>
            <div className='font-medium'>Initial Amount</div>
            <input
              type='number'
              className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
            />
          </div>

          <div className='flex flex-row justify-between text-center items-center align-middle w-[60%]'>
            <div className='font-medium'>Simulation Period in years</div>
            <input
              type='number'
              className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
              value={numYears}
              onChange={(e) => setNumYears(parseFloat(e.target.value))}
            />
          </div>

          <div className='flex flex-row justify-between text-center items-center align-middle w-[60%]'>
            <div className='font-medium'>Tax Treatment</div>
            <input
              type='text'
              className='bg-gradient-to-b from-white to-gray-200 w-[60%] border-gray-300 border-2 rounded-sm px-2 py-1 focus:outline-none'
              value={taxTreat}
              readOnly
            />
          </div>

        </div>
      </div>


      <div className="p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Asset Allocation</h2>
        {assets.map((asset, index) => (
          <div key={index} className={`flex items-center px-2 mb-2 ${
            index % 2 === 0 ? "bg-slate-50" : "bg-white"
          }`}>
            <label className="w-1/4 text-gray-700">{asset.name}</label>
            <select
              className="w-1/3 p-1 border border-gray-300 bg-gray-50 rounded"
              value={asset.class}
              onChange={(e) => handleChange(index, "class", e.target.value)}
            >
              <option value="">Select asset class...</option>
              <option value="us_stock">US Stock</option>
              <option value="gold">Gold</option>
              <option value="reits">REITs</option>
              <option value="bonds">Bonds</option>
              {/* Add more options as needed */}
            </select>
            <input
              type="text"
              className="w-1/6 px-2 py-1 ml-12 border border-gray-300 rounded"
              placeholder="%"
              value={asset.allocation}
              onChange={(e) => handleChange(index, "allocation", e.target.value)}
            />
          </div>
        ))}
      
        <div className="flex items-center justify-center mt-6">
          <button 
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleRunSimulation}
          >
            Run Simulation
          </button>
        </div>
      </div>

      {simulationResult && (
        <div className="p-6 bg-white mt-6 rounded-lg shadow-md" >
           <Monte_performance data={simulationResult}/>
        </div>
      )}

      {
        simulationResult && (
          <div className='p-4 bg-white-100 mt-6 rounded-2xl shadow-lg' >
            <h4 className='text-[rgb(18,0,255)] font-medium text-xl mb-6 ml-9'>Portfolio Balance</h4>
            <PercentileChart data={simulationResult}/>
          </div>
        )
      }
    </div>
  );
};

export default Montecarlo;
