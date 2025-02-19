'use client';
import React, { useState } from 'react';

const Randomnumber = () => {
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
        <div className="flex flex-col min-h-screen bg-gray-100" style={{ padding: '50px', margin: 'auto' }}>
            <div className="bg-white  pl- shadow-md rounded-lg p-4 w-full max-w-md">
                <h1 className="text-xl font-semibold mb-4 text-center">Random Number Generator</h1>
                
                <label htmlFor="lowerLimit" className="block mb-2">Lower Limit</label>
                <input 
                    id="lowerLimit"
                    type="number" 
                    className="w-full p-2  border rounded-md mb-4"
                    value={lowerLimit} 
                    onChange={(e) => setLowerLimit(Number(e.target.value))} 
                     
                    placeholder="Enter lower limit"
                    style={{ marginBottom: '10px', padding: '5px' }}
                />
                
                <label htmlFor="upperLimit" className="block mb-2">Upper Limit</label>
                <input 
                    id="upperLimit"
                    type="number" 
                    className="w-full p-2  border rounded-md mb-4"
                    value={upperLimit} 
                    onChange={(e) => setUpperLimit(Number(e.target.value))} 
                   
                    placeholder="Enter upper limit"
                    style={{ marginBottom: '10px', padding: '5px' }}
                />
                
                <div className="flex space-x-4"> 
                    <button
                        onClick={generateRandomNumber}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        Generate Number
                    </button>
                    <button
                        onClick={clearNumber}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                    >
                        Clear
                    </button>
                </div>
                {randomNumber !== null && (
                    <div className="mt-4 p-4 bg-gray-50 border rounded-md text-center" style={{ marginTop: '20px' }}>
                        <h1 className="text-lg font-semibold mt-2 p-2 border border-blue-500 rounded-md bg-white">Your Random Number is:<span style={{ color: 'blue' }}>{randomNumber}</span></h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Randomnumber;
