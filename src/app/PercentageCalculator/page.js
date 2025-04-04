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
            <div className="w-full max-w-sm mr-60 bg-white rounded-lg shadow-md p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-base sm:text-lg font-bold text-gray-800">Percentage Calculator</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-red-500 hover:text-red-400"
                    >
                        <Info className="w-4 h-4" />
                    </button>
                </div>
                <p className="mb-2 text-gray-600 text-xs">Calculate percentages, percent changes, and more.</p>
                <div className="space-y-4">
                    <div className="mb-4">
                        <label className="block mb-2 font-medium text-gray-700">Value</label>
                        <input 
                            type="number" 
                            value={number} 
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base" 
                            placeholder="Enter value"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium text-gray-700">Percentage</label>
                        <input 
                            type="number" 
                            value={percentage} 
                            onChange={(e) => setPercentage(e.target.value)}
                            className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base" 
                            placeholder="Enter percentage"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={calculate} 
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Calculate
                        </button>
                        <button 
                            onClick={clear} 
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                    {result !== null && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-lg font-semibold mb-3">Results:</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-600">Percentage Value</p>
                                    <p className="text-2xl font-bold text-blue-600">{result}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-600">Decimal Value</p>
                                    <p className="text-2xl font-bold text-blue-600">{result / 100}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
                        <Dialog.Title className="text-xl font-bold">Percentage Calculator Help</Dialog.Title>
                        <Dialog.Description className="mt-4 text-gray-600">
                            This calculator helps you calculate percentages easily:
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Enter the value you want to calculate the percentage of</li>
                                <li>Enter the percentage you want to calculate</li>
                                <li>Get both percentage and decimal results</li>
                            </ul>
                            The calculator will show both the percentage and decimal values.
                        </Dialog.Description>
                        <div className="mt-6">
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </CalculatorLayout>
    );
}

export default PercentageCalculator;