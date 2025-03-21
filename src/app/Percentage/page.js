"use client";
import React, { useState } from 'react';
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";
import CalculatorLayout from '@/components/BasicLayout';

const PercentageCalculator = () => {
    // State for various calculators
    const [percentage, setPercentage] = useState('');
    const [number, setNumber] = useState('');
    const [result, setResult] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [total, setTotal] = useState('');
    const [part, setPart] = useState('');
    const [percentageResult, setPercentageResult] = useState(null);
    const [percentageMessage, setPercentageMessage] = useState('');

    const [numerator, setNumerator] = useState('');
    const [denominator, setDenominator] = useState('');
    const [fractionResult, setFractionResult] = useState(null);
    const [fractionMessage, setFractionMessage] = useState('');

    const [originalPrice, setOriginalPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [discountMessage, setDiscountMessage] = useState('');

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [percentageDifference, setPercentageDifference] = useState(null);
    const [error, setError] = useState('');

    const [initialValue, setInitialValue] = useState('');
    const [finalValue, setFinalValue] = useState('');
    const [changeResult, setChangeResult] = useState(null);
    const [changeError, setChangeError] = useState('');

    // Calculate Percentage
    const calculate = () => {
        const num = Number(number);
        const perc = Number(percentage);
        if (isNaN(num) || isNaN(perc)) {
            alert("Please enter valid numbers.");
            return;
        }
        const result = (num * perc) / 100;
        setResult(result.toFixed(2));
    };

    const clear = () => {
        setPercentage('');
        setNumber('');
        setResult('');
    };

    // Percentage in Common Phrases Calculation
    const calculatePercentage = () => {
        // Convert total and part inputs to numbers
        const TotalValue = parseFloat(total); // Use parseFloat to handle decimal values
        const partValue = parseFloat(part); // Use parseFloat to handle decimal values
    
        // Input validation
        if (isNaN(TotalValue) || isNaN(partValue) || TotalValue <= 0) {
            setPercentageMessage('Please enter valid numbers. Total must be greater than zero.');
            setPercentageResult(null);
            return;
        }
    
        // Calculate percentage
        const result = (partValue / TotalValue) * 100; // Calculate the percentage
        setPercentageResult(result.toFixed(2)); // Set the result to two decimal places
        setPercentageMessage(`The result of ${partValue} is ${result.toFixed(2)}% of ${TotalValue}.`); // Set the message
    };

    // Calculate Fraction
    const calculateFraction = () => {
        const num = Number(numerator);
        const denom = Number(denominator);

        if (isNaN(num) || isNaN(denom) || denom === 0) {
            setFractionMessage('Please enter valid numbers.');
            setFractionResult(null);
            return;
        }

        const result = (num / denom) * 100;
        setFractionResult(result.toFixed(2));
        setFractionMessage(`The fraction ${num}/${denom} is: ${result.toFixed(2)}%`);
    };

    // Calculate Discount
    const calculateDiscount = () => {
        const original = Number(originalPrice);
        const discountValue = Number(discount);

        if (isNaN(original) || isNaN(discountValue) || original <= 0 || discountValue < 0) {
            setDiscountMessage('Please enter valid numbers.');
            setDiscountedPrice(null);
            return;
        }

        const discounted = original * (1 - (discountValue / 100));
        setDiscountedPrice(discounted.toFixed(2));
        setDiscountMessage(`The price after ${discountValue}% discount is: $${discounted.toFixed(2)}`);
    };

    // Calculate Percentage Difference
    const calculatePercentageDifference = (event) => {
        event.preventDefault();
        const num1 = Number(value1);
        const num2 = Number(value2);

        if (isNaN(num1) || isNaN(num2) || num1 === 0) {
            setError("Please enter valid numbers.");
            setPercentageDifference(null);
            return;
        }

        const difference = num2 - num1;
        const percentage = (difference / num1) * 100;
        setPercentageDifference(percentage.toFixed(2));
        setError('');
    };

    // Calculate Percentage Change
    const calculatePercentageChange = (event) => {
        event.preventDefault();
        const initial = Number(initialValue);
        const final = Number(finalValue);
        
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
        <CalculatorLayout>
            <div className="bg-white mt-1 rounded-lg shadow-md p-4 w-96 mx-auto mb-4 mr-36 max-w-xl ">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">Percentage Calculator</h1>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center">
                        <Info className="w-5 h-5 mr-28 text-red-500 hover:text-red-400" />
                    </button>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="number"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        placeholder="%"
                        className="border border-gray-300 rounded-l-md p-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="mx-2">of</span>
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder=""
                        className="border border-gray-300 rounded-l-md p-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="mx-2">=</span>
                    <input
                        type="text"
                        value={result}
                        readOnly
                        className="border border-gray-300 rounded-l-md p-2 w-24 bg-gray-200 text-center"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={calculate}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
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

                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <Dialog.Title className="text-lg font-semibold mb-2">How to Use Percentage Calculator</Dialog.Title>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Input the percentage and the number.</li>
                                <li>Click "Calculate" to see the result.</li>
                                <li>Use the "Clear" button to reset the inputs.</li>
                            </ul>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                            >
                                Close
                            </button>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </div>

            {/* Percentage in Common Phrases */}
            <div className="bg-white mt-1 rounded-lg shadow-md p-4 w-96 mr-28mx-auto mb-4 max-w-3xl ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Percentage in Common Phrases</h2>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center">
                        <Info className="w-5 h-5 mr-5 text-red-500 hover:text-red-400" />
                    </button>
                </div>
                <div className="flex items-center mb-4">
                    <span className="mx-1">What</span>
                    <span className="mx-1">is</span>
                    <input
                        type="number"
                        className="border border-gray-300 rounded-md p-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="%"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                    />
                    <span className="mx-2">of</span>
                    <input
                        type="number"
                        className="border border-gray-300 rounded-md p-2 mx-2 w-1/3"
                        placeholder=""
                        value={part}
                        onChange={(e) => setPart(e.target.value)}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={calculatePercentage}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Calculate
                    </button>
                    <button
                        onClick={clearFields}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                        Clear
                    </button>
                </div>
                {percentageMessage && <h2 className="text-center text-red-600">{percentageMessage} {percentageResult !== null ? `${percentageResult}` : ''}</h2>}
            </div>

            {/* Fraction Calculator */}
            <div className="bg-white mt-1 rounded-lg shadow-md p-4 w-96 mr-36 mx-auto mb-4 max-w-3xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                    </h2>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="number"
                        className="border border-gray-300 rounded-md p-2 w-28"
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
                        className="border border-gray-300 rounded-md p-2 mx-2 mr-2 w-28"
                        placeholder="Denominator"
                        value={denominator}
                        onChange={(e) => setDenominator(e.target.value)}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={calculateFraction}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Calculate
                    </button>
                    <button
                        onClick={clearFields}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                        Clear
                    </button>
                </div>
                {fractionMessage && <h2 className="text-center text-red-600">{fractionMessage} {fractionResult !== null ? `${fractionResult}` : ''}</h2>}
            </div>

            {/* Discount Calculator */}
            <div className="bg-white mt-1 rounded-lg shadow-md p-4 w-96 mx-auto mb-4 max-w-3xl mr-36">
                <div className="flex justify-between items-center ">
                    <h2 className="text-xl font-semibold"></h2>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        type="number"
                        className="border border-gray-300 rounded-md p-2 w-32 "
                        placeholder="Original Price"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                    <span className="mx-2 text-xl">is</span>
                    <input
                        type="number"
                        className="border border-gray-300 rounded-md p-2 mx-2 w-20"
                        placeholder="%"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                    <span className="mx-2 text-xl">of</span>
                    <span className="mx-2 text-xl">What</span>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={calculateDiscount}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Calculate
                    </button>
                    <button
                        onClick={clearFields}
                        className=" bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                        Clear
                    </button>
                </div>
                {discountMessage && <h2 className="text-center text-red-600">{discountMessage} {discountedPrice !== null ? `$${discountedPrice}` : ''}</h2>}
            </div>

            {/* Percentage Difference Calculator */}
            <div className="bg-white mt-1 rounded-lg shadow-md p-6 w-96 mr-36 mx-auto mb-4 max-w-3xl ">
                <div className="flex justify-between items-center ">
                    <h1 className="text-base font-semibold text-center">Percentage Difference Calculator</h1>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center">
                        <Info className="w-5 h-5 mr-14 text-red-500 hover:text-red-400" />
                    </button>
                </div>
                <form onSubmit={calculatePercentageDifference}>
                    <label htmlFor="value1" className="block mb-2">Value 1:</label>
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
                            className="px-2 py-1  text-white bg-blue-500 rounded hover:bg-blue-700 transition text-base"
                        >
                            Calculate Percentage
                        </button>
                        <button
                            type="button"
                            onClick={clearFields}
                            className="flex-1 px-2 py-1  text-white bg-red-500 rounded hover:bg-red-700 transition text-base"
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

            {/* Percentage Change Calculator */}
            <div className="bg-white mt-1 rounded-lg shadow-md p-6 w-96 mr-36 mx-auto mb-4 max-w-3xl">
                <div className="flex justify-between items-center ">
                    <h1 className="text-xl font-semibold text-center">Percentage Change Calculator</h1>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center">
                        <Info className="w-5 h-5 mr-5 text-red-500 hover:text-red-400" />
                    </button>
                </div>
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
                        className="w-full p-2 text-base border rounded-md mb-4"
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
        </CalculatorLayout>
    );
}

export default PercentageCalculator;