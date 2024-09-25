import React from 'react';

const PortfolioRegressionResults = ({ data }) => {
  const { columns, index, data: tableData } = JSON.parse(data);

  return (
    <div className="p-6 bg-white  rounded-md">
      
      
      

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-2 text-left border-b">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className='odd:bg-gray-50 even:bg-white'>
                {row.map((cell, cellIndex) => {
                  // Check if the cell is a number, if so, format it to 2 decimal places
                  const formattedCell =
                    typeof cell === 'number' ? cell.toFixed(2) : cell;
                  return (
                    <td key={cellIndex} className={`px-4 py-2 border-b ${cellIndex === 4 && cell === 0.0 ? 'text-green-600' : ''}`}>
                      {formattedCell}
                    </td>
                  );})}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioRegressionResults;
