'use client';
import React, { useState } from 'react';
import CalculatorLayout from '@/components/BasicLayout';

const RandomNumber = () => {
    const [lowerLimit, setLowerLimit] = useState(6); // Default lower limit
    const [upperLimit, setUpperLimit] = useState(20); // Default upper limit
    const [randomNumber, setRandomNumber] = useState(null);

    const generateRandomNumber = () => {
        const number = Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit; // Generates a number between lowerLimit and upperLimit
        setRandomNumber(number);
    };
    
    const clearNumber = () => {
        setLowerLimit('');
        setUpperLimit('');
        setRandomNumber('');
    };
    
    return (
        <CalculatorLayout>
            <div className="w-full max-w-sm mr-60 bg-white rounded-lg shadow-md p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-base sm:text-lg font-bold text-gray-800">Random Number Generator</h1>
                </div>
                
                <p className="mb-2 text-gray-600 text-xs">Generate random numbers within your specified range.</p>
                
                <div className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="lowerLimit" className="block mb-2 font-medium text-gray-700">Lower Limit</label>
                        <input 
                            id="lowerLimit"
                            type="number" 
                            className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base" 
                            value={lowerLimit} 
                            onChange={(e) => setLowerLimit(Number(e.target.value))} 
                            placeholder="Enter lower limit"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="upperLimit" className="block mb-2 font-medium text-gray-700">Upper Limit</label>
                        <input 
                            id="upperLimit"
                            type="number" 
                            className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base"
                            value={upperLimit} 
                            onChange={(e) => setUpperLimit(Number(e.target.value))} 
                            placeholder="Enter upper limit"
                        />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={generateRandomNumber}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Generate Number
                        </button>
                        <button
                            onClick={clearNumber}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                    
                    {randomNumber !== null && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-lg font-semibold mb-3">Your Random Number is:</h2>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <p className="text-2xl font-bold text-blue-600">{randomNumber}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    );
};

export default RandomNumber;