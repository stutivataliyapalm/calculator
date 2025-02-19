import React, { useState } from 'react';

const PercentageCalculator = () => {
    const [initialValue, setInitialValue] = useState('');
    const [finalValue, setFinalValue] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const calculatePercentageChange = (event) => {
        event.preventDefault();
        const initial = parseFloat(initialValue);
        const final = parseFloat(finalValue);

        if (isNaN(initial) || isNaN(final)) {
            setError("Please enter valid numbers.");
            setResult(null);
            return;
        }

        const change = final - initial;
        const percentageChange = (change / initial) * 100;

        if (change > 0) {
            setResult(`Increase: ${percentageChange.toFixed(2)}%`);
        } else if (change < 0) {
            setResult(`Decrease: ${Math.abs(percentageChange).toFixed(2)}%`);
        } else {
            setResult("No change: 0%");
        }

        setError('');
    };

    const clearFields = () => {
        setInitialValue('');
        setFinalValue('');
        setResult(null);
        setError('');
    };

    return (
        
        <div className="flex flex-col min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md ">
                <h1 className="text-xl font-bold text-center mb-4">Percentage Change Calculator</h1>
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
                {error && (
                    <div className="mt-4 p-4 bg-red-200 rounded-md text-center">
                        <p className="text-lg font-semibold text-red-600">{error}</p>
                    </div>
                )}
                {result !== null && (
                    <div className="mt-4 p-4 bg-gray-200 rounded-md text-center">
                        <p className="text-lg font-semibold">
                            {result}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PercentageCalculator;