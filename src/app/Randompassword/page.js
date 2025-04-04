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
            <div className="w-full max-w-sm mr-60 bg-white rounded-lg shadow-md p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-base sm:text-lg font-bold">Generate A Random Password</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-red-500 hover:text-red-400"
                    >
                        <Info className="w-4 h-4" />
                    </button>
                </div>
                <p className="mb-2 text-gray-600 text-xs">Generate secure random passwords with custom settings.</p>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">Password Length (6-35):</label>
                        <input 
                            id="length"
                            type="number" 
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={length} 
                            onChange={(e) => setLength(e.target.value)} 
                            placeholder="Enter length (6-35)"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={generatePassword}
                            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-base"
                        >
                            Generate
                        </button>
                        <button
                            onClick={clearPassword}
                            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors text-base"
                        >
                            Clear
                        </button>
                    </div>

                    {password && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2">Generated Password:</h2>
                            <p className="font-mono text-blue-600 break-all">{password}</p>
                        </div>
                    )}
                </div>
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
        </CalculatorLayout>
    );
}

export default RandomPassword;