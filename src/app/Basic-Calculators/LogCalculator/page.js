"use client";
import { useState } from "react";
import BasicLayout from "@/components/BasicLayout";
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";

const LogCalculator = () => {
  const [number, setNumber] = useState("");
  const [base, setBase] = useState("");
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const calculateLog = async () => {
    setError(null);
    setResult(null);

    if (!number || !base) {
      setError("Please enter both number and base.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number, base }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to calculate log.");
      }

      setResult(data.result);
    } catch (err) {
      setError(err.message);
    }
  };

  const clearInputs = () => {
    setNumber("");
    setBase("");
    setResult(null);
    setError(null);
  };

  return (
    <BasicLayout>
      <div className="w-full max-w-sm mr-60 bg-white rounded-lg shadow-md p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-base sm:text-lg font-bold text-gray-800">Logarithm Calculator</h1>
          <button onClick={() => setIsModalOpen(true)} className="text-red-500 hover:text-red-400">
            <Info className="w-4 h-4" />
          </button>
        </div>
        <p className="mb-2 text-gray-600 text-xs">Calculate logarithms with any base.</p>
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Number</label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base"
              placeholder="Enter number"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Base</label>
            <input
              type="text"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base"
              placeholder="Enter base (e for natural log)"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={calculateLog} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Calculate
            </button>
            <button onClick={clearInputs} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Clear
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {result !== null && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Result:</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-600">Logarithm Value</p>
                <p className="text-2xl font-bold text-blue-600">{result}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <Dialog.Title className="text-xl font-bold">Logarithm Calculator Help</Dialog.Title>
            <Dialog.Description className="mt-4 text-gray-600">
              This calculator helps you compute logarithms:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Enter the number you want to find the logarithm of</li>
                <li>Enter the base (use 'e' for natural logarithm)</li>
                <li>Get the precise logarithm value</li>
              </ul>
            </Dialog.Description>
            <div className="mt-6">
              <button onClick={() => setIsModalOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </BasicLayout>
  );
};

export default LogCalculator;
