"use client";
import React, { useState } from 'react';
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";
import CalculatorLayout from '@/components/BasicLayout';

const RandomPassword = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const generatePassword = () => {
        const len = parseInt(length);
        if (isNaN(len) || len < 6 || len > 35) {
            alert("Password length must be between 6 and 35 characters.");
            return;
        }

        const allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&*';
        let pass = '';
        for (let i = 0; i < len; i++) {
            pass += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }
        setPassword(pass);
    };

    const clearPassword = () => {
        setPassword('');
        setLength('');
    };

    return (
        <CalculatorLayout>
            <div className="w-80 h-screen flex flex-col bg-gray-100 ">
                <div className="w-80 p-6 bg-white shadow-md rounded-lg">
                    <div className="flex items-center mb-4">
                        <h1 className="text-base font-bold">Generate A Random Password</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="ml-2 text-red-500 hover:text-red-400"
                        >
                            <Info className="w-5 h-5" />
                        </button>
                    </div>
                   
                    <label htmlFor="length" className="block mb-2">Password Length (6-35):</label>
                    <input 
                        id="length"
                        type="number" 
                        className="w-64 border rounded-md mb-4 p-2"
                        value={length} 
                        onChange={(e) => setLength(e.target.value)} 
                        placeholder="Enter length (6-35)"
                    />
                    <div className="flex space-x-2"> {/* Adjusted space between buttons */}
                        <button
                            onClick={generatePassword}
                            className="flex-1 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out text-base"
                        >
                            Generate
                        </button>
                        <button
                            onClick={clearPassword}
                            className="flex-1 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out text-base"
                        >
                            Clear
                        </button>
                    </div>
                    <div className="flex-1 px-4 py-2 mt-4 p-4 bg-gray-50 border rounded-md text-center">
                        <h1 className="text-lg font-semibold mt-2 p-2 border border-blue-500 rounded-md bg-white">
                            Your Password is: <span style={{ color: 'blue' }}>{password}</span>
                        </h1>
                    </div>
                    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                                <Dialog.Title className="text-lg font-semibold mb-2">How to Use Password Generator</Dialog.Title>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Enter a desired password length between 6 and 35 characters.</li>
                                    <li>Click "Generate Password" to create a random password.</li>
                                    <li>Use the "Clear" button to reset the inputs to their default values.</li>
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
                <br />
            </div>
        </CalculatorLayout>
    );
}

export default RandomPassword;