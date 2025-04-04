"use client";    
import { useState } from 'react';
import CalculatorLayout from '@/components/BasicLayout';
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";

const CircleCalculator = () => {
    const [radius, setRadius] = useState('');
    const [diameter, setDiameter] = useState('');
    const [circumference, setCircumference] = useState('');
    const [area, setArea] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


    const calculateCircle = () => {
        const r = parseFloat(radius);
        const d = parseFloat(diameter);
        const c = parseFloat(circumference);
        const a = parseFloat(area);

        if (!isNaN(r)) {
            setDiameter((2 * r).toFixed(2));
            setCircumference((2 * Math.PI * r).toFixed(2));
            setArea((Math.PI * r * r).toFixed(2));
        } else if (!isNaN(d)) {
            const rFromD = d / 2;
            setRadius(rFromD.toFixed(2));
            setCircumference((Math.PI * d).toFixed(2));
            setArea((Math.PI * rFromD * rFromD).toFixed(2));
        } else if (!isNaN(c)) {
            const rFromC = c / (2 * Math.PI);
            setRadius(rFromC.toFixed(2));
            setDiameter((2 * rFromC).toFixed(2));
            setArea((Math.PI * rFromC * rFromC).toFixed(2));
        } else if (!isNaN(a)) {
            const rFromA = Math.sqrt(a / Math.PI);
            setRadius(rFromA.toFixed(2));
            setDiameter((2 * rFromA).toFixed(2));
            setCircumference((2 * Math.PI * rFromA).toFixed(2));
        }
    };

    const clearFields = () => {
        setRadius('');
        setDiameter('');
        setCircumference('');
        setArea('');
    };

    return (
        <CalculatorLayout>
            <div className="w-full max-w-sm mr-60 bg-white rounded-lg shadow-md p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-base sm:text-lg font-bold text-gray-800">Circle Calculator</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-red-500 hover:text-red-400"
                    >
                        <Info className="w-4 h-4" />
                    </button>
                </div>
                <p className="mb-2 text-gray-600 text-xs">Calculate area, circumference, and other properties of a circle.</p>
                <div className="space-y-4">
                    <div className="mb-4">
                        <label className="block mb-2 font-medium text-gray-700">Radius (R)</label>
                        <input 
                            type="number" 
                            value={radius} 
                            onChange={(e) => setRadius(e.target.value)}
                            className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base" 
                            placeholder="Enter radius" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium text-gray-700">Diameter (D)</label>
                        <input 
                            type="number" 
                            value={diameter} 
                            onChange={(e) => setDiameter(e.target.value)}
                            className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base" 
                            placeholder="Enter diameter" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium text-gray-700">Circumference (C)</label>
                        <input 
                            type="number" 
                            value={circumference} 
                            onChange={(e) => setCircumference(e.target.value)}
                            className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base" 
                            placeholder="Enter circumference" 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-medium text-gray-700">Area (A)</label>
                        <input 
                            type="number" 
                            value={area} 
                            onChange={(e) => setArea(e.target.value)}
                            className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base" 
                            placeholder="Enter area" 
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={calculateCircle} 
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Calculate
                        </button>
                        <button 
                            onClick={clearFields} 
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
                        <Dialog.Title className="text-xl font-bold">Circle Calculator Help</Dialog.Title>
                        <Dialog.Description className="mt-4 text-gray-600">
                            This calculator helps you find different measurements of a circle. You can enter any one value:
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Radius (R)</li>
                                <li>Diameter (D = 2R)</li>
                                <li>Circumference (C = 2πR)</li>
                                <li>Area (A = πR²)</li>
                            </ul>
                            The calculator will automatically compute the other values.
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
};

export default CircleCalculator;