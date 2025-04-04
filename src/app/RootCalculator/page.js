"use client";
import { useState } from 'react';
import CalculatorLayout from '@/components/BasicLayout';
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";

export default function RootCalculator() {
  const [squareInput, setSquareInput] = useState('');
  const [cubeInput, setCubeInput] = useState('');
  const [generalInput, setGeneralInput] = useState('');
  const [squareRoot, setSquareRoot] = useState('?');
  const [cubeRoot, setCubeRoot] = useState('?');
  const [generalRoot, setGeneralRoot] = useState('?');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const calculateSquareRoot = () => {
    setSquareRoot(Math.sqrt(squareInput).toFixed(2));
  };

  const calculateCubeRoot = () => {
    setCubeRoot(Math.cbrt(cubeInput).toFixed(2));
  };

  const calculateGeneralRoot = (degree) => {
    setGeneralRoot(Math.pow(generalInput, 1 / degree).toFixed(2));
  };

  const clearInputs = () => {
    setSquareInput('');
    setCubeInput('');
    setGeneralInput('');
    setSquareRoot('?');
    setCubeRoot('?');
    setGeneralRoot('?');
  };

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  return (
    <CalculatorLayout>
      <div className="w-full max-w-sm mr-60 bg-white rounded-lg shadow-md p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-base sm:text-lg font-bold text-gray-800">Root Calculator</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-red-500 hover:text-red-400"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
        <p className="mb-2 text-gray-600 text-xs">Calculate the nth root of a number.</p>
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Number</label>
            <input 
              type="number" 
              value={squareInput} 
              onChange={(e) => setSquareInput(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base" 
              placeholder="Enter number"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Root</label>
            <input 
              type="number" 
              value={squareRoot} 
              onChange={(e) => setSquareRoot(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base" 
              placeholder="Enter root (e.g., 2 for square root)"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={calculateSquareRoot} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Calculate
            </button>
            <button 
              onClick={clearInputs} 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>
          {squareRoot !== '?' && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Result:</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-600">Root Value</p>
                <p className="text-2xl font-bold text-blue-600">{squareRoot}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8 bg-white w-80 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cube Root Calculator
          <button
            onClick={() => openModal('The cube root of a number is a value that, when used in a multiplication three times, gives the original number.')}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <Info className="w-5 h-5" />
          </button>
        </h2>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl">³√</span>
          <input
            type="number"
            value={cubeInput}
            onChange={(e) => setCubeInput(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Enter number"
          />
          <span className="text-xl">= {cubeRoot}</span>
        </div>
        <div className="flex justify-center space-x-2">
          <button onClick={calculateCubeRoot} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors">
            Calculate
          </button>
          <button onClick={clearInputs} className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors">
            Clear
          </button>
        </div>
      </div>

      <div className="mb-8 bg-white p-6 w-80 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">General Root Calculator
          <button
            onClick={() => openModal('The general root of a number allows calculation of any nth root by specifying the degree.')}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <Info className="w-5 h-5" />
          </button>
        </h2>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="number"
            onChange={(e) => calculateGeneralRoot(e.target.value)}
            className="border border-gray-300 p-2 rounded w-32"
            placeholder="Enter degree"
          />
          <span className="text-2xl">√</span>
          <input
            type="number"
            value={generalInput}
            onChange={(e) => setGeneralInput(e.target.value)}
            className="border border-gray-300 p-2 rounded w-32"
            placeholder="Enter number"
          />
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={() => calculateGeneralRoot(1)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={clearInputs}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors"
          >
            Clear
          </button>
        </div>
        <span className="text-xl mt-4">= {generalRoot}</span>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <Dialog.Title className="text-xl font-bold">Root Calculator Help</Dialog.Title>
            <Dialog.Description className="mt-4 text-gray-600">
              This calculator helps you find any root of a number:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Enter the number you want to find the root of</li>
                <li>Enter the root value (e.g., 2 for square root, 3 for cube root)</li>
                <li>Get the precise root value</li>
              </ul>
              The calculator will show the result with high precision.
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