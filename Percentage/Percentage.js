

'use client';
import React, { useState } from 'react';
export default function PercentageCalculator() {
  const [percentage, setPercentage] = useState('');
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  const calculate = () => {
    const num = parseFloat(number);
    const perc = parseFloat(percentage);
    const result = (num * perc) / 100;
    setResult(result.toFixed(2));
  };

  const clear = () => {
    setPercentage('');
    setNumber('');
    setResult('');
  };

  return (
    <div className="flex flex-col min-h-screen  bg-gray-100 "style={{ padding: '50px', margin: 'auto' }}>
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-xl font-semibold mb-4 text-center">Percentage Calculator</h1>
        <div className="flex items-center mb-4">
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="%"
            className="border border-gray-300 rounded-l-md p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="mx-2">of</span>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder=""
            className="border border-gray-300 rounded-l-md p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="mx-2">=</span>
          <input
            type="text"
            value={result}
            readOnly
            className="border border-gray-300 rounded-l-md p-2 w-1/3 bg-gray-200"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={calculate}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="bg-red-500 text-white  px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Clear
          </button>
        </div>
      </div>
      
    </div>   
  );
}

