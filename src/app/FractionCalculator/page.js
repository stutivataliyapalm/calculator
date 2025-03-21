
'use client';
import CalculatorLayout from '@/components/BasicLayout';
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useState } from 'react';
import Big from 'big.js'; // Import Big.js

const FractionCalculator = () => {
    const [frac1, setFrac1] = useState('');
    const [frac2, setFrac2] = useState('');
    const [result, setResult] = useState('');
    const [operation, setOperation] = useState('add'); // Default operation
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Mixed number state
    const [mixedNum1, setMixedNum1] = useState('');
    const [mixedNum2, setMixedNum2] = useState('');
    const [mixedResult, setMixedResult] = useState('');
    const [mixedOperation, setMixedOperation] = useState('add'); // Default operation for mixed numbers
    const [isMixedModalOpen, setIsMixedModalOpen] = useState(false);

    // Simplify fraction state
    const [numerator, setNumerator] = useState('');
    const [denominator, setDenominator] = useState('');
    const [simplifiedResult, setSimplifiedResult] = useState('');
    const [isSimplifyModalOpen, setIsSimplifyModalOpen] = useState(false);

    // Decimal to fraction state
    const [decimal, setDecimal] = useState('');
    const [decimalResult, setDecimalResult] = useState('');
    const [isDecimalModalOpen, setIsDecimalModalOpen] = useState(false);


    // Fraction to Decimal state
    const [fraction, setFraction] = useState('');
    const [error, setError] = useState('');
    const [fractionResult, setFractionResult] = useState('');
    const [isFractionModalOpen, setIsFractionModalOpen] = useState(false);    

    // Big Fraction Calculator state
    const [numerator1, setNumerator1] = useState('');
    const [denominator1, setDenominator1] = useState('');
    const [numerator2, setNumerator2] = useState('');
    const [denominator2, setDenominator2] = useState('');
    const [resultFraction, setResultFraction] = useState('');
    const [isBigModalOpen, setIsBigModalOpen] = useState(false);

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const simplifyFraction = (num, denom) => {
    const divisor = gcd(num, denom);
    return {
        numerator: num / divisor,
        denominator: denom / divisor,
    };
};
    const SimplifiedClear = () => {
        setNumerator(''); 
        setDenominator(''); 
        setSimplifiedResult(''); 
        setOperation('add'); 
    };
    const calculate = () => {
        if (!frac1 || !frac2) {
            alert('Please enter both fractions.');
            return;
        }

        const [num1, denom1] = frac1.split('/').map(Number);
        const [num2, denom2] = frac2.split('/').map(Number);

        if (denom1 === 0 || denom2 === 0) {
            alert('Denominator cannot be zero.');
            return;
        }

        let resNum, resDenom;
        switch (operation) {
            case 'add':
                resNum = num1 * denom2 + num2 * denom1;
                resDenom = denom1 * denom2;
                break;
            case 'subtract':
                resNum = num1 * denom2 - num2 * denom1;
                resDenom = denom1 * denom2;
                break;
            case 'multiply':
                resNum = num1 * num2;
                resDenom = denom1 * denom2;
                break;
            case 'divide':
                resNum = num1 * denom2;
                resDenom = denom1 * num2;
                break;
            default:
                return;
        }

        const { numerator, denominator } = simplifyFraction(resNum, resDenom);
        setResult(`${numerator}/${denominator}`);
    };

    const clear = () => {
        setFrac1('');
        setFrac2('');
        setResult('');
        setOperation('add');
    };

    const parsemixednumber = (mixedNum) => {
        const [whole, fraction] = mixedNum.split(' ');
        const [numerator, denominator] = fraction ? fraction.split('/') : [0, 1];
        return {
            whole: parseInt(whole) || 0,
            numerator: parseInt(numerator) || 0,
            denominator: parseInt(denominator) || 1,
        };
    };

    const calculateMixed = () => {
        if (!mixedNum1 || !mixedNum2) {
            alert('Please enter both mixed numbers.');
            return;
        }

        const { whole: whole1, numerator: num1, denominator: denom1 } = parsemixednumber(mixedNum1);
        const { whole: whole2, numerator: num2, denominator: denom2 } = parsemixednumber(mixedNum2);

        let resNum, resDenom;
        switch (mixedOperation) {
            case 'add':
                resNum = (whole1 * denom1 + num1) * denom2 + (whole2 * denom2 + num2) * denom1;
                resDenom = denom1 * denom2;
                break;
            case 'subtract':
                resNum = (whole1 * denom1 + num1) * denom2 - (whole2 * denom2 + num2) * denom1;
                resDenom = denom1 * denom2;
                break;
            case 'multiply':
                resNum = (whole1 * denom1 + num1) * (whole2 * denom2 + num2);
                resDenom = denom1 * denom2;
                break;
            case 'divide':
                resNum = (whole1 * denom1 + num1) * denom2;
                resDenom = denom1 * (whole2 * denom2 + num2);
                break;
            default:
                return;
        }

        const { numerator, denominator } = simplifyFraction(resNum, resDenom);
        const wholePart = Math.floor(numerator / denominator);
        const fractionalPart = numerator % denominator;
        setMixedResult(fractionalPart === 0 ? `${wholePart}` : `${wholePart} ${fractionalPart}/${denominator}`);
    };

    const clearMixed = () => {
        setMixedNum1('');
        setMixedNum2('');
        setMixedResult('');
        setMixedOperation('add');
    };

    const convertFractionToDecimal = () => {
        const [num, denom] = fraction.split('/').map(Number);
        if (denom === 0) {
            setError('Denominator cannot be zero.');
            return;
        }
        if (isNaN(num) || isNaN(denom)) {
            setError('Please enter a valid fraction.');
            return;
        }
        const decimal = num / denom;
        setFractionResult(decimal.toString()); // Store the decimal result as a string
        setError(''); // Clear any previous errors
    };

    const fractionConvertoDecimal = () => {
        if (!fraction) {
            alert('Please enter a valid fraction');
            return;
        }
        convertFractionToDecimal();
    };

    const clearFractiontoDecimal = () => {
        setFraction('');
        setFractionResult('');
        setError('');
    };

    const convertDecimalToFraction = (decimal) => {
        const decimalParts = decimal.toString().split('.');
        const wholePart = decimalParts[0] ? parseInt(decimalParts[0]) : 0;
        const fractionPart = decimalParts[1] ? decimalParts[1] : '0';
        const denominator = Math.pow(10, fractionPart.length);
        const numerator = wholePart * denominator + parseInt(fractionPart);
    
        const divisor = gcd(numerator, denominator);
        const simplifiedNum = numerator / divisor;
        const simplifiedDenom = denominator / divisor;
    
        return `${simplifiedNum}/${simplifiedDenom}`;
    };

    const handleConvert = () => {
        if (decimal === '') {
            alert('Please enter a decimal number');
            return;
        }
        const fraction = convertDecimalToFraction(decimal);
        setFractionResult(fraction); // Store the fraction result
    };

    const clearDecimal = () => {
        setDecimal('');
        setDecimalResult('');
    };

    const fractionConvert = () => {
        if (!fraction) {
            alert('Please enter a valid fraction');
            return;
        }
        convertFractionToDecimal();
    };

    const clearFraction = () => {
        setFraction('');
        setFractionResult('');
        setError('');
    };
    const calculateMixedBigFraction = () => {
        if (!numerator1 || !denominator1 || !numerator2 || !denominator2) {
            alert('Please enter all numerator and denominator values.');
            return;
        }
    
        const num1 = Big(numerator1);
        const denom1 = Big(denominator1);
        const num2 = Big(numerator2);
        const denom2 = Big(denominator2);
        let resultNum;
        let resultDenom;
    
        switch (operation) {
            case 'add':
                resultNum = num1.times(denom2).plus(num2.times(denom1));
                resultDenom = denom1.times(denom2);
                break;
            case 'subtract':
                resultNum = num1.times(denom2).minus(num2.times(denom1));
                resultDenom = denom1.times(denom2);
                break;
            case 'multiply':
                resultNum = num1.times(num2);
                resultDenom = denom1.times(denom2);
                break;
            case 'divide':
                if (num2.eq(0)) {
                    alert('Cannot divide by zero.');
                    return;
                }
                resultNum = num1.times(denom2);
                resultDenom = denom1.times(num2);
                break;
            default:
                return;
        }
    
        // Convert to number for simplification
        const { numerator, denominator } = simplifyFraction(resultNum.toNumber(), resultDenom.toNumber());
    
        // Convert to mixed fraction
        const wholeNumber = Math.floor(numerator / denominator);
        const newNumerator = numerator % denominator;
    
        if (wholeNumber === 0 && newNumerator === 0) {
            setResultFraction("0"); // If the fraction is 0
        } else if (wholeNumber === 0) {
            setResultFraction(`${newNumerator}/${denominator}`); // Proper fraction
        } else if (newNumerator === 0) {
            setResultFraction(`${wholeNumber}`); // Whole number
        } else {
            setResultFraction(`${wholeNumber} ${Math.abs(newNumerator)}/${Math.abs(denominator)}`); // Mixed fraction
        }
    };


    //     const decimalParts = decimal.toString().split('.');
    //     const wholePart = decimalParts[0] ? parseInt(decimalParts[0]) : 0;
    //     const fractionPart = decimalParts[1] ? decimalParts[1] : '0';
    //     const denom = Math.pow(10, fractionPart.length);
    //     const num = wholePart * denominator1 + parseInt(fractionPart);
    //     const denomi = Math.pow(10, fractionPart.length);
    //     const numb = wholePart * denominator2 + parseInt(fractionPart);
    
    //     const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    //     const divisor = gcd(numerator, denominator);
        
    //     const BigNum = numerator / divisor;
    //     const BigDenom = denominator / divisor;
    
    //     return `${simplifiedNum}/${simplifiedDenom}`;
    
    
    // // Example usage
    // const decimalNumber = 0.75;
    // const fraction1 = convertDecimalToFraction(decimalNumber);
    // console.log(fraction1); // Output: "3/4"
    // };

    const clearBigFraction = () => {
        setNumerator1('');
        setDenominator1('');
        setNumerator2('');
        setDenominator2('');
        setResultFraction('');
        setOperation('add');
    };

    return (
        <CalculatorLayout>
            <div className="w-96 mr-52 p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold text-gray-800 mb-2">Fraction Calculator
                    <button onClick={() => setIsModalOpen(true)}>
                        <Info className="w-5 h-5 text-red-500 hover:text-red-400 ml-2" />
                    </button>
                </h1>
                <label htmlFor="frac1" className="block mb-1 text-gray-700">First fraction (e.g., 1/2)</label>
                <input
                    id="frac1"
                    type="text"
                    placeholder="e.g., 1/2"
                    value={frac1}
                    onChange={(e) => setFrac1(e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded mb-2"
                />

                <label htmlFor="operation" className="block mb-1 text-gray-700">Operation</label>
                <select
                    id="operation"
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded mb-2"
                >
                    <option value="add">+</option>
                    <option value="subtract">-</option>
                    <option value="multiply">*</option>
                    <option value="divide">/</option>
                </select>

                <label htmlFor="frac2" className="block mb-1 text-gray-700">Second fraction (e.g., 3/4)</label>
                <input
                    id="frac2"
                    type="text"
                    placeholder="e.g., 3/4"
                    value={frac2}
                    onChange={(e) => setFrac2(e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded mb-2"
                />

                {result && (
                    <div className="mt-4 p-4 border border-gray-300 rounded text-center bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-800">Result: {result}</h2>
                    </div>
                )}

                <div className="flex justify-center space-x-2 mt-4">
                    <button
                        onClick={calculate}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors"
                    >
                        Calculate
                    </button>

                    <button
                        onClick={clear}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 flex-1 text-sm rounded-md transition-colors"
                    >
                        Clear
                    </button>
                </div>

                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <Dialog.Title className="text-lg font-semibold mb-2">How to Use Fraction Calculator</Dialog.Title>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Enter fractions in the format a/b.</li>
                                <li>Select the operation you want to perform.</li>
                                <li>Click Calculate to see the result.</li>
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

            {/* Mixed Numbers Calculator */}
            <div className="w-96 p-6 bg-white shadow-md rounded-lg mt-4">
                <div className="w-full max-w-md">
                    <h1 className="text-base font-bold text-gray-800">Mixed Numbers Calculator
                        <button onClick={() => setIsMixedModalOpen(true)}>
                            <Info className="ml-2 w-5 h-5 text-red-500 hover:text-red-400" />
                        </button>
                    </h1>
                    <label htmlFor="mixedNum1" className="block mb-1 text-gray-700">First mixed number (e.g., 1 1/2)</label>
                    <input
                        id="mixedNum1"
                        type="text"
                        placeholder="e.g., 1 1/2"
                        value={mixedNum1}
                        onChange={(e) => setMixedNum1(e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded mb-2"
                    />

                    <label htmlFor="mixedOperation" className="block mb-1 text-gray-700">Operation</label>
                    <select
                        id="mixedOperation"
                        value={mixedOperation}
                        onChange={(e) => setMixedOperation(e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded mb-2"
                    >
                        <option value="add">+</option>
                        <option value="subtract">-</option>
                        <option value="multiply">*</option>
                        <option value="divide">/</option>
                    </select>

                    <label htmlFor="mixedNum2" className="block mb-1 text-gray-700">Second mixed number (e.g., 3 3/4)</label>
                    <input
                        id="mixedNum2"
                        type="text"
                        placeholder="e.g., 3 3/4"
                        value={mixedNum2}
                        onChange={(e) => setMixedNum2(e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded mb-2"
                    />

                    {mixedResult && (
                        <div className="mt-4 p-4 border border-gray-300 rounded text-center bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-800">Result: {mixedResult}</h2>
                        </div>
                    )}

                    <div className="flex justify-center space-x-2 mt-4">
                        <button
                            onClick={calculateMixed}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors"
                        >
                            Calculate
                        </button>

                        <button
                            onClick={clearMixed}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 flex-1 text-sm rounded-md transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <Dialog open={isMixedModalOpen} onClose={() => setIsMixedModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <Dialog.Title className="text-lg font-semibold mb-2">How to Use Mixed Numbers Calculator</Dialog.Title>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Enter the whole number, numerator, and denominator for the first mixed fraction. Repeat for the second mixed fraction (if applicable).</li>
                                <li>Choose the operation you want to perform (Addition, Subtraction, Multiplication, or Division).</li>
                                <li>Click the "Calculate" button to perform the operation.</li>
                                <li>The result will be displayed as a mixed fraction.</li>
                            </ul>
                            <button
                                onClick={() => setIsMixedModalOpen(false)}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                            >
                                Close
                            </button>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </div>

            {/* Simplify Fraction */}
            <div className="w-96 p-6 bg-white shadow-md rounded-lg mt-4">
                <h1 className="text-base font-bold text-gray-800 mb-2">Simplify Fraction
                    <button onClick={() => setIsSimplifyModalOpen(true)}>
                        <Info className="ml-2  w-5 h-5 text-red-500 hover:text-red-400" />
                    </button>
                </h1>
                <input
                    type="number"
                    value={numerator}
                    placeholder="Numerator"
                    onChange={(e) => setNumerator(e.target.value)}
                    required
                    className="w-32 border border-gray-300 rounded p-1 mb-2"
                />
                <span className='font-sans font-bold p-1'>/</span>
                <input
                    type="number"
                    value={denominator}
                    placeholder="Denominator"
                    onChange={(e) => setDenominator(e.target.value)}
                    required
                    className="w-32 border border-gray-300 rounded p-1 mb-2"
                />
                <div className="flex justify-center space-x-2 mt-4">
                <button
                    type="button"
                    onClick={() => {
                        const { numerator: num, denominator: denom } = simplifyFraction(parseInt(numerator), parseInt(denominator));
                        setSimplifiedResult(`${num}/${denom}`);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors"
                >
                    Simplify
                </button>
                
                <button
                    type="button"
                    onClick={SimplifiedClear}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 flex-1 text-base rounded-md transition-colors"
                >
                    Clear
                </button>
                </div>
                {simplifiedResult && <h3 className="mt-2">Result: {simplifiedResult}</h3>}
                <Dialog open={isSimplifyModalOpen} onClose={() => setIsSimplifyModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <Dialog.Title className="text-lg font-semibold mb-2">How to Use Simplify Fraction</Dialog.Title>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Enter the numerator and denominator of the fraction you want to simplify.</li>
                                <li>Click the "Simplify" button to see the simplified result.</li>
                            </ul>
                            <button
                                onClick={() => setIsSimplifyModalOpen(false)}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                            >
                                Close
                            </button>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </div>

            {/* Decimal to Fraction Calculator */}
            <div className="w-96 p-6 bg-white shadow-md rounded-lg mt-4">
                <h1 className="text-base font-bold text-gray-800 mb-2">Decimal to Fraction Calculator
                    <button onClick={() => setIsDecimalModalOpen(true)}>
                        <Info className="ml-2 w-5 h-5 text-red-500 hover:text-red-400" />
                    </button>
                </h1>
                <label htmlFor='Enter a decimal (e.g. 0.75)'>Enter a decimal (e.g. 0.75)</label>
                <input
                    type='number'
                    value={decimal}
                    placeholder="Enter a decimal (e.g. 0.75)"
                    onChange={(e) => setDecimal(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <div className=" flex justify-center space-x-2 mt-4">
                    <button
                        onClick={handleConvert}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 flex-1 text-sm rounded-md transition-colors"
                    >
                        Convert
                    </button>
                    <button
                        onClick={clearDecimal}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 flex-1 text-sm rounded-md transition-colors"
                    >
                        Clear
                    </button>
                </div>
                {decimalResult && (
                    <h3 className="mt-4 text-lg font-semibold text-gray-800">Result: {decimalResult}</h3>
                )}
                <Dialog open={isDecimalModalOpen} onClose={() => setIsDecimalModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <Dialog.Title className="text-lg font-semibold mb-2">How to Use Decimal to Fraction Calculator</Dialog.Title>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Enter a decimal number in the input field.</li>
                                <li>Click the "Convert" button to see the fraction equivalent.</li>
                                <li>Decimal number is converted into fraction format.</li>
                            </ul>
                            <button
                                onClick={() => setIsDecimalModalOpen(false)}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                            >
                                Close
                            </button>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </div>

{/* Fraction to Decimal Calculator */}
<div className="w-96 p-6 bg-white shadow-md rounded-lg  mt-4">
    <h1 className="text-base font-bold text-gray-800 mb-2">Decimal to Fraction Calculator
        <button onClick={() => setIsDecimalModalOpen(true)}>
            <Info className="ml-2 w-5 h-5 text-red-500 hover:text-red-400" />
        </button>
    </h1>
    <label htmlFor='Enter a decimal (e.g. 0.75)'>Enter a decimal (e.g. 0.75)</label>
    <input
        type='number'
        value={decimal}
        placeholder="Enter a decimal (e.g. 0.75)"
        onChange={(e) => setDecimal(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
    />
    <div className="flex justify-center space-x-2 mt-4">
        <button
            onClick={handleConvert}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 flex-1 text-sm rounded-md transition-colors"
        >
            Convert
        </button>
        <button
            onClick={clearDecimal}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 flex-1 text-sm rounded-md transition-colors"
        >
            Clear
        </button>
    </div>
    {fractionResult && (
        <h2 className="mt-4 text-lg font-semibold text-gray-800">Fraction Result: {fractionResult}</h2>
    )}
    <Dialog open={isDecimalModalOpen} onClose={() => setIsDecimalModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                <Dialog.Title className="text-lg font-semibold mb-2">How to Use Decimal to Fraction Calculator</Dialog.Title>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Enter a decimal number in the input field.</li>
                    <li>Click the "Convert" button to see the fraction equivalent.</li>
                    <li>Decimal number is converted into fraction format.</li>
                </ul>
                <button
                    onClick={() => setIsDecimalModalOpen(false)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                >
                    Close
                </button>
            </Dialog.Panel>
        </div>
    </Dialog>

    <Dialog open={isFractionModalOpen} onClose={() => setIsFractionModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                <Dialog.Title className="text-lg font-semibold mb-2">How to Use Fraction to Decimal Calculator</Dialog.Title>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Enter a fraction in the format a/b.</li>
                    <li>Click the "Convert" button to see the decimal equivalent.</li>
                    <li>Fraction is converted into decimal form.</li>
                </ul>
                <button
                    onClick={() => setIsFractionModalOpen(false)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                >
                    Close
                </button>
            </Dialog.Panel>
        </div>
    </Dialog>
</div>
{/* Big Fraction Calculator */}
<div className="w-96 p-6 bg-white shadow-md rounded-lg mt-4">
    <h1 className="text-base font-bold text-gray-800 mb-2">Big Number Fraction Calculator
        <button onClick={() => setIsBigModalOpen(true)}>
            <Info className="ml-2 w-5 h-5 text-red-500 hover:text-red-400" />
        </button>
    </h1>
    
    <div className="flex flex-col space-y-4 mt-4">
        <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Numerator1"
                    value={numerator1}
                    onChange={(e) => setNumerator1(e.target.value)}
                    className='w-28 border border-gray-300 rounded p-1 mb-1'
                />
                <input
                    type="text"
                    placeholder="Denominator1"
                    value={denominator1}
                    onChange={(e) => setDenominator1(e.target.value)}
                    className="w-28 border border-gray-300 rounded p-1"
                />
            </div>

            <div className="mx-4">
                <label htmlFor="operation" className="block mb-1 text-gray-700">Operation</label>
                <select
                    id="operation"
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className="w-10 p-1 border border-gray-300 rounded"
                >
                    <option value="add">+</option>
                    <option value="subtract">-</option>
                    <option value="multiply">*</option>
                    <option value="divide">/</option>
                </select>
            </div>

            <div className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Numerator2"
                    value={numerator2}
                    onChange={(e) => setNumerator2(e.target.value)}
                    className='w-28 border border-gray-300 rounded p-1 mb-1'
                />
                <input
                    type="text"
                    placeholder="Denominator2"
                    value={denominator2}
                    onChange={(e) => setDenominator2(e.target.value)}
                    className="w-28 border border-gray-300 rounded p-1"
                />
            </div>
        </div>

        <div className="flex justify-center space-x-2 mt-4">
            <button
                onClick={calculateMixedBigFraction}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors"
            >
                Calculate
            </button>
            <button
                onClick={clearBigFraction}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors"
            >
                Clear
            </button>
        </div>
    </div>
    
    {resultFraction && (
        <div className="mt-4 p-4 border border-gray-300 rounded text-center bg-gray-50">
            <h2 className="mt-4 text-lg font-semibold text-gray-800">Result: {resultFraction}</h2>
        </div>
    )}

    <Dialog open={isBigModalOpen} onClose={() => setIsBigModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                <Dialog.Title className="text-lg font-semibold mb-2">How to Use Big Number Fraction Calculator</Dialog.Title>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Enter the numerator and denominator for both fractions.</li>
                    <li>Select the operation you want to perform.</li>
                    <li>Click the "Calculate" button to see the result.</li>
                </ul>
                <button
                    onClick={() => setIsBigModalOpen(false)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                >
                    Close
                </button>
            </Dialog.Panel>
        </div>
    </Dialog>
</div>
        </CalculatorLayout>
    );
};

export default FractionCalculator;