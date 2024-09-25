import React from 'react';

const factorNames = {
  "EFV": "Value",
  "IWM": "Size",
  "MTUM": "Momentum",
  "QUAL": "Quality",
  "SIZE": "Small Cap",
  "VLUE": "Value",
  "^GSPC": "Market"
};

const FactorCorrelations = ({ data }) => {
  const factors = Object.keys(data.Correlations);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white ">
        <thead className="bg-white">
          <tr>
            <th className="py-2 px-4 text-left">Factor</th>
            <th className="py-2 px-4 text-left">Key</th>
            {factors.map((factor) => (
              <th key={factor} className="py-2 px-4 text-left">
                {factor}
              </th>
            ))}
            <th className="py-2 px-4 text-left">Annualized Return</th>
            <th className="py-2 px-4 text-left">Annualized Standard Deviation</th>
          </tr>
        </thead>
        <tbody>
          {factors.map((factor) => (
            <tr key={factor} className="border-t odd:bg:gray-50 even:bg-white">
              <td className="py-2 px-4">{factorNames[factor]}</td>
              <td className="py-2 px-4">{factor}</td>
              {factors.map((innerFactor) => (
                <td key={innerFactor} className="py-2 px-4">
                  {data.Correlations[factor][innerFactor].toFixed(2)}
                </td>
              ))}
              <td className="py-2 px-4">
                {(data['Annualized Return'][factor] * 100).toFixed(2)}%
              </td>
              <td className="py-2 px-4">
                {(data['Annualized Standard Deviation'][factor] * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-sm text-gray-600">
        Factor correlations and returns statistics from January 1964 to June 2024
      </p>
    </div>
  );
};

export default FactorCorrelations;
