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
      {/* <div className="container mx-auto  ">
        <h1 className="text-2xl font-bold mb-4 text-center">Root Calculator</h1> */}

        <div className="mb-4 bg-white w-80 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Square Root Calculator
            <button
              onClick={() => openModal('The square root of a number is a value that, when multiplied by itself, gives the original number.')}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <Info className="w-5 h-5" />
            </button>
          </h2>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">√</span>
            <input
              type="number"
              value={squareInput}
              onChange={(e) => setSquareInput(e.target.value)}
              className="w-52 border border-gray-300 p-2 rounded "
              placeholder="Enter number"
            />
            <span className="text-xl">= {squareRoot}</span>
          </div>
          <div className="flex justify-center space-x-2">
            <button onClick={calculateSquareRoot} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors">
              Calculate
            </button>
            <button onClick={clearInputs} className="bg-red-500 p-2 py-2 px-4 flex-1 rounded-md shadow-md text-white hover:bg-red-600 transition-colors">
              Clear
            </button>
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
            <button onClick={calculateCubeRoot} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 flex-1  rounded-md transition-colors">
              Calculate
            </button>
            <button onClick={clearInputs} className="bg-red-500 p-2 rounded-md shadow-md text-white hover:bg-red-600 py-2 px-4 flex-1 transition-colors">
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
            onClick={() => calculateGeneralRoot(1)} // Adjust this to your logic
            className="bg-blue-600  hover:bg-blue-700 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors"
        >
            Calculate
        </button>
        <button
            onClick={clearInputs}
            className="bg-red-500  hover:bg-red-600 text-white font-medium py-2 px-4 flex-1 rounded-md transition-colors"
        >
            Clear
        </button>
        
    </div>
    <span className="text-xl mt-4">= {generalRoot}</span>
</div>
        {isModalOpen && (
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-md">
                <Dialog.Title className="text-xl font-bold mb-4">Information</Dialog.Title>
                <Dialog.Description className="mb-4">
                  {modalMessage}
                </Dialog.Description>
                <button onClick={() => setIsModalOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Close
                </button>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      {/* </div> */}
    </CalculatorLayout>
  );
}