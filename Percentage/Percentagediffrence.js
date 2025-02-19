import React, { useState } from 'react';

const PercentageCalculator = () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [percentageDifference, setPercentageDifference] = useState(null);
    const [error, setError] = useState('');

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

    const clearFields = () => {
        setValue1('');
        setValue2('');
        setPercentageDifference(null);
        setError('');
    };

    return (
        <div className="flex flex-col min-h-screen  bg-gray-100"  style={{ padding: '50px', margin: 'auto' }}>
            <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md"> 
                {/* <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto"> */}
                    <h1 className="text-xl font-bold text-center mb-4">Percentage Difference Calculator</h1>
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
        // </div>
    );
};

export default PercentageCalculator;