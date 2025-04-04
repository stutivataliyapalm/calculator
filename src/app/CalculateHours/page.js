"use client";
import { useState } from "react";
import CalculatorLayout from "@/components/BasicLayout";
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";

export default function HourCalculator() {
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [startPeriod, setStartPeriod] = useState("AM");

  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [endPeriod, setEndPeriod] = useState("AM");

  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateHours = () => {
    if (!startHour || !startMinute || !endHour || !endMinute) {
      setResult("Please enter both start and end times.");
      return;
    }

    let startH = parseInt(startHour);
    let endH = parseInt(endHour);
    
    if (startPeriod === "PM" && startH !== 12) startH += 12;
    if (startPeriod === "AM" && startH === 12) startH = 0;
    
    if (endPeriod === "PM" && endH !== 12) endH += 12;
    if (endPeriod === "AM" && endH === 12) endH = 0;

    const start = new Date(2000, 0, 1, startH, parseInt(startMinute));
    const end = new Date(2000, 0, 1, endH, parseInt(endMinute));

    if (end < start) {
      setResult("End time must be after start time.");
      return;
    }

    const diff = (end - start) / 1000 / 60;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    setResult({ hours, minutes });
  };

  const clearFields = () => {
    setStartHour("");
    setStartMinute("");
    setStartPeriod("AM");
    setEndHour("");
    setEndMinute("");
    setEndPeriod("AM");
    setResult(null);
  };

  return (
    <CalculatorLayout>
      <div className="w-full max-w-sm mr-60 bg-white rounded-lg shadow-md p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-base sm:text-lg font-bold text-gray-800">Hour Calculator</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-red-500 hover:text-red-400"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
        <p className="mb-2 text-gray-600 text-xs">Calculate the time difference between two timestamps.</p>

        <div className="space-y-4">
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Start Time</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="HH"
                min="1"
                max="12"
                className="w-16 p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
              />
              <input
                type="number"
                placeholder="MM"
                min="0"
                max="59"
                className="w-16 p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={startMinute}
                onChange={(e) => setStartMinute(e.target.value)}
              />
              <select
                className="p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={startPeriod}
                onChange={(e) => setStartPeriod(e.target.value)}
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">End Time</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="HH"
                min="1"
                max="12"
                className="w-16 p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
              />
              <input
                type="number"
                placeholder="MM"
                min="0"
                max="59"
                className="w-16 p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={endMinute}
                onChange={(e) => setEndMinute(e.target.value)}
              />
              <select
                className="p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={endPeriod}
                onChange={(e) => setEndPeriod(e.target.value)}
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={calculateHours}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-base sm:text-lg font-medium"
            >
              Calculate Time
            </button>
            <button
              onClick={clearFields}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors text-base sm:text-lg font-medium"
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Result:</h2>
              {typeof result === "string" ? (
                <p className="text-red-600">{result}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600">Hours</p>
                    <p className="text-2xl font-bold text-blue-600">{result.hours}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600">Minutes</p>
                    <p className="text-2xl font-bold text-blue-600">{result.minutes}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
              <Dialog.Title className="text-lg font-semibold mb-2">How to Use Hour Calculator</Dialog.Title>
              <ul className="list-disc pl-5 space-y-2">
                <li>Enter start and end times including hours, minutes, and AM/PM selection.</li>
                <li>Click "Calculate Time" to see the total duration in hours and minutes.</li>
                <li>Use the "Clear" button to reset all fields.</li>
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
    </CalculatorLayout>
  );
}
