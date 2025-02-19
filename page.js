
'use client';
import React, { useState } from 'react';

export default function PercentageCalculator() {
  // State for Percentage Calculator
  const [percentage, setPercentage] = useState('');
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  // State for Percentage in Common Phrases
  const [total, setTotal] = useState('');
  const [part, setPart] = useState('');
  const [percentageResult, setPercentageResult] = useState(null);
  const [percentageMessage, setPercentageMessage] = useState('');

  // State for Fraction Calculator
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [fractionResult, setFractionResult] = useState(null);
  const [fractionMessage, setFractionMessage] = useState('');

  // State for Discount Calculator
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [discountMessage, setDiscountMessage] = useState('');

  // State for Percentage Difference Calculator
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [percentageDifference, setPercentageDifference] = useState(null);
  const [error, setError] = useState('');

  // State for Percentage Change Calculator
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [changeResult, setChangeResult] = useState(null);
  const [changeError, setChangeError] = useState('');

  // Calculate Percentage
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

  // Calculate Percentage in Common Phrases
  const calculatePercentage = () => {
    const TotalValue = parseFloat(total);
    const partValue = parseFloat(part);

    if (isNaN(TotalValue) || isNaN(partValue) || TotalValue <= 0) {
      setPercentageMessage('Please enter valid numbers.');
      setPercentageResult(null);
      return;
    }

    const result = (TotalValue * partValue) / 100; // Multiplication logic
    setPercentageResult(result.toFixed(2));
    setPercentageMessage(`The result of ${partValue}% of ${TotalValue} is:`);
  };

  // Calculate Fraction
  const calculateFraction = () => {
    const num = parseFloat(numerator);
    const denom = parseFloat(denominator);

    if (isNaN(num) || isNaN(denom) || denom === 0) {
      setFractionMessage('Please enter valid numbers.');
      setFractionResult(null);
      return;
    }

    const result = (num / denom) * 100; // Calculate percentage
    setFractionResult(result.toFixed(2));
    setFractionMessage(`The fraction ${num}/${denom} is:`);
  };

  // Calculate Discount
  const calculateDiscount = () => {
    const original = parseFloat(originalPrice);
    const discountValue = parseFloat(discount);

    if (isNaN(original) || isNaN(discountValue) || original <= 0 || discountValue < 0) {
      setDiscountMessage('Please enter valid numbers.');
      setDiscountedPrice(null);
      return;
    }

    const discounted = original * (1 - (discountValue / 100)); // Calculate discounted price
    setDiscountedPrice(discounted.toFixed(2));
    setDiscountMessage(`The price after ${discountValue}% discount is:`);
  };

  // Calculate Percentage Difference
  const calculatePercentageDifference = (event) => {
    event.preventDefault();
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2) || num1 === 0) {
      setError("Please enter valid numbers.");
      setPercentageDifference(null);
      return;
    }

    const difference = num2 - num1; // Calculate the difference
    const percentage = (difference / num1) * 100; // Calculate the percentage change
    setPercentageDifference(percentage.toFixed(2)); // Round to 2 decimal places
    setError(''); // Clear any previous error
  };

  // Calculate Percentage Change
  const calculatePercentageChange = (event) => {
    event.preventDefault();
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);

    if (isNaN(initial) || isNaN(final)) {
      setChangeError("Please enter valid numbers.");
      setChangeResult(null);
      return;
    }

    const change = final - initial;
    const percentageChange = (change / initial) * 100;

    if (change > 0) {
      setChangeResult(`Increase: ${percentageChange.toFixed(2)}%`);
    } else if (change < 0) {
      setChangeResult(`Decrease: ${Math.abs(percentageChange).toFixed(2)}%`);
    } else {
      setChangeResult("No change: 0%");
    }

    setChangeError('');
  };

  const clearFields = () => {
    setTotal('');
    setPart('');
    setPercentageResult(null);
    setPercentageMessage('');
    setNumerator('');
    setDenominator('');
    setFractionResult(null);
    setFractionMessage('');
    setOriginalPrice('');
    setDiscount('');
    setDiscountedPrice(null);
    setDiscountMessage('');
    setValue1('');
    setValue2('');
    setPercentageDifference(null);
    setError('');
    setInitialValue('');
    setFinalValue('');
    setChangeResult(null);
    setChangeError('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ padding: '50px', margin: 'auto' }}>
      <div className="bg-white p-6 rounded-lg shadow-md w-80 mx-auto mb-4">
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
            className="border border-gray-300 rounded-l-md p-2 w-1/3 bg-gray-200 text-center"
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
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Percentage in Common Phrases */}
      <div className="w-1/3 bg-white shadow-md rounded-lg border border-gray-300 p-6 mb-3 mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Percentage calculator in Common Phrases</h2>
        <div className="flex items-center mb-4">
        <span className="mx-2 text-xl">What</span>
        <span className="mx-2 text-xl">is</span>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 ml-4 w-full"
            placeholder="             %"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
          <span className="mx-2 text-xl">of</span>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 mx-2 w-full"
            placeholder=""
            value={part}
            onChange={(e) => setPart(e.target.value)}
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={calculatePercentage}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Calculate
          </ button>
          <button
            onClick={clearFields}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Clear
          </button>
        </div>
        {percentageMessage && <h2 className="text-center text-red-600">{percentageMessage} {percentageResult !== null ? `${percentageResult}` : ''}</h2>}
      </div>

      {/* Fraction Calculator */}
      <div className="w-1/3 bg-white shadow-md rounded-lg border border-gray-300 p-6 mb-3 mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center"></h2>
        <div className="flex items-center mb-4">
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 ml-4 w-full"
            placeholder="Numerator"
            value={numerator}
            onChange={(e) => setNumerator(e.target.value)}
          />
          <span className="mx-1 text-xl">is</span>
          <span className="mx-1 text-xl">What</span>
          <span className="mx-1 text-xl">%</span>
          <span className="mx-1 text-xl">of</span>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 mx-2 w-full"
            placeholder="Denominator"
            value={denominator}
            onChange={(e) => setDenominator(e.target.value)}
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={calculateFraction}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Calculate
          </button>
          <button
            onClick={clearFields}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Clear
          </button>
        </div>
        {fractionMessage && <h2 className="text-center text-red-600">{fractionMessage} {fractionResult !== null ? `${fractionResult}` : ''}</h2>}
      </div>

      {/* Discount Calculator */}
      <div className="w-1/3 bg-white shadow-md rounded-lg border border-gray-300 p-6 mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center"></h2>
        <div className="flex items-center mb-4">
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 ml-4 w-full"
            placeholder=" "
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
          <span className="mx-2 text-xl">is</span>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 mx-2 w-full"
            placeholder="             %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <span className="mx-2 text-xl">of</span>
          <span className="mx-2 text-xl">What</span>
        </div>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={calculateDiscount}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Calculate
          </button>
          <button
            onClick={clearFields}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Clear
          </button>
        </div>
        {discountMessage && <h2 className="text-center text-red-600">{discountMessage} {discountedPrice !== null ? `$${discountedPrice}` : ''}</h2>}
      </div>

      {/* Percentage Difference Calculator */}
      <div className="flex flex-col bg-gray-100 p-6">
        <div className="bg-white shadow-md rounded-lg p-4 w-half max-w-md mx-auto">
          <h1 className="text-xl font-semibold mb-4 text-center">Percentage Difference Calculator</h1>
          <form onSubmit={calculatePercentageDifference}>
            <label htmlFor="value1" className="block mb- 2">Value 1:</label>
            <input
              id="value1"
              type="number"
              className="w-full p-2 border rounded-md mb-4"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="Enter first value"
            />
            <label htmlFor="value2" className="block mb-2">Value 2:</label>
            <input
              id="value2"
              type="number"
              className="w-full p-2 border rounded-md mb-4"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="Enter second value"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Calculate Percentage
              </button>
              <button
                type="button"
                onClick={clearFields}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Clear
              </button>
            </div>
          </form>
          {error && (
            <div className="mt-4 p-4 rounded-md text-center">
              <p className="text-lg font-semibold text-red-600">{error}</p>
            </div>
          )}
          {percentageDifference !== null && (
            <div className="mt-4 p-4 bg-gray-200 rounded-md text-center">
              <p className="text-lg font-semibold">
                Percentage Difference: <span className="text-blue-500">{percentageDifference}%</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Percentage Change Calculator */}
      <div className="flex flex-col bg-gray-100 p-6">
        <div className="bg-white shadow-md rounded-lg p-4 w-half max-w-md mx-auto">
          <h1 className="text-xl font-semibold mb-4 text-center">Percentage Change Calculator</h1>
          <form onSubmit={calculatePercentageChange}>
            <label htmlFor="initialValue" className="block mb-2">Initial Value:</label>
            <input
              id="initialValue"
              type="number"
              className="w-full p-2 border rounded-md mb-4"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value)}
              placeholder="Enter initial value"
            />
            <label htmlFor="finalValue" className="block mb-2">Final Value:</label>
            <input
              id="finalValue"
              type="number"
              className="w-full p-2 border rounded-md mb-4"
              value={finalValue}
              onChange={(e) => setFinalValue(e.target.value)}
              placeholder="Enter final value"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Calculate Change
              </button>
              <button
                type="button"
                onClick={clearFields}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Clear
              </button>
            </div>
          </form>
          {changeError && (
            <div className="mt-4 p-4 bg-red-200 rounded-md text-center">
              <p className="text-lg font-semibold text-red-600">{changeError}</p>
            </div>
          )}
          {changeResult !== null && (
            <div className="mt-4 p-4 bg-gray-200 rounded-md text-center">
              <p className="text-lg font-semibold">
                {changeResult}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}