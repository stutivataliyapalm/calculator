'use client';
import { useState } from "react";
import CalculatorLayout from "@/components/BasicLayout";
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";

export default function HourCalculator() {
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [startPeriod, setStartPeriod] = useState("AM");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [endPeriod, setEndPeriod] = useState("AM");

  const [result, setResult] = useState(null);

  const calculateHours = () => {
    if (!startHour || !startMinute || !endHour || !endMinute) {
      alert("Please enter both start and end times.");
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

  return (
    <CalculatorLayout>
      <div className="bg-white mt-1 rounded-lg shadow-md p-6 w-80 ">
        <div className="flex justify-between items-center mb-4 ">
          <h1 className="text-base font-bold text-gray-800">Hour Calculator</h1>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center">
            <Info className="w-5 h-5 mr-32 text-red-500 hover:text-red-400" />
          </button>
          
        </div>
        <p className="text-gray-600 mb-4">Calculate total hours and minutes between two times.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="HH"
                min="1"
                max="12"
                className="w-13 p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
              />
              <input
                type="number"
                placeholder="MM"
                min="0"
                max="59"
                className="w-13 p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={startMinute}
                onChange={(e) => setStartMinute(e.target.value)}
              />
              <select
                className=" p-2 border w-13 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={startPeriod}
                onChange={(e) => setStartPeriod(e.target.value)}
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="HH"
                min="1"
                max="12"
                className ="w-13 p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
              />
              <input
                type="number"
                placeholder="MM"
                min="0"
                max="59"
                className="w-13 p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={endMinute}
                onChange={(e) => setEndMinute(e.target.value)}
              />
              <select
                className="p-2 border w-13 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500"
                value={endPeriod}
                onChange={(e) => setEndPeriod(e.target.value)}
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={calculateHours}
              className="bg-blue-600 mr-32 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Calculate Time
            </button>
          </div>

          {result && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Result:</h2>
              {typeof result === "string" ? (
                <p className="text-red-600">{result}</p>
              ) : (
                <>
                  <p className="text-gray-700">
                    <span className="font-medium">{result.hours}</span> Hours
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">{result.minutes}</span> Minutes
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
            <Dialog.Title className="text-lg font-semibold mb-2">How to Use Hour Calculator</Dialog.Title>
            <ul className="list-disc pl-5 space-y-2">
              <li>Input your start and end times in the respective fields.</li>
              <li>Click "Calculate Time" to see the total hours and minutes.</li>
              <li>Use the "Close" button to dismiss this help dialog.</li>
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