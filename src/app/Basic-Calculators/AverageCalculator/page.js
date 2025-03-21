

"use client";
import { useState } from "react";
import { Info } from "lucide-react";
import BasicLayout from "@/components/BasicLayout";
import { Dialog } from "@headlessui/react";
export default function AverageCalculator() {
  const [numbers, setNumbers] = useState("");
  const [stats, setStats] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateStats = () => {
    const numArray = numbers.split(",").map(num => parseFloat(num.trim())).filter(num => !isNaN(num) && num >= 0);
    if (numArray.length === 0) {
      setStats(null);
      return;
    }
    
    const sum = numArray.reduce((acc, curr) => acc + curr, 0);
    const count = numArray.length;
    const average = sum / count;
    const sortedArray = [...numArray].sort((a, b) => a - b);
    const median = count % 2 === 0 ? (sortedArray[count / 2 - 1] + sortedArray[count / 2]) / 2 : sortedArray[Math.floor(count / 2)];
    
    // Calculate geometric mean only for positive numbers
    const geometricMean = numArray.length > 0 ? Math.pow(numArray.reduce((acc, curr) => acc * curr, 1), 1 / count) : 0;
    
    const largest = Math.max(...numArray);
    const smallest = Math.min(...numArray);
    const range = largest - smallest;
    
    setStats({ sum, count, average, median, geometricMean, largest, smallest, range });
  };

  const clearInput = () => {
    setNumbers("");
    setStats(null);
  };

  return (
    <BasicLayout> 
  <div className="bg-white rounded-lg shadow-md p-4 ml-72 mt-2 w-80">
    <div className="">
      <h1 className="text-lg text-gray-800 font-semibold mb-4">Average Calculator
        <button onClick={() => setIsModalOpen(true)} className="ml-3 text-red-500 hover:text-red-400">
          <Info className="w-5 h-5" />
        </button>
      </h1>
      <input
        type="text"
        placeholder="Enter numbers separated by commas"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        className="w-full text-gray-800 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2 mt-4">
        <button
          onClick={calculateStats}
          className="w-2/4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Calculate Stats
        </button>
        <button
          onClick={clearInput}
          className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Clear
        </button>
      </div>
      
      {stats && (
        <div className="mt-4 text-center text-lg font-medium">
          <b><p>Average: <span className="text-blue-600">{stats.average.toFixed(2)}</span></p></b>
          <p>Sum: <span className="text-blue-600">{stats.sum.toFixed(2)}</span></p>
          <p>Count: <span className="text-blue-600">{stats.count}</span></p>
          <p>Median: <span className="text-blue-600">{stats.median.toFixed(2)}</span></p>
          <p>Geometric Mean: <span className="text-blue-600">{stats.geometricMean.toFixed(2)}</span></p>
          <p>Largest: <span className="text-blue-600">{stats.largest}</span></p>
          <p>Smallest: <span className="text-blue-600">{stats.smallest}</span></p>
          <p>Range: <span className="text-blue-600">{stats.range.toFixed(2)}</span></p>
        </div>
      )}

      {/* Modal for Info */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <Dialog.Title className="text-lg font-bold">Information</Dialog.Title>
            <Dialog.Description className="mt-2">
              This calculator allows you to input a list of numbers separated by commas. It will calculate the average, sum, count, median, geometric mean, largest, smallest, and range of the numbers provided.
            </Dialog.Description>
            <div className="mt-4">
              <button onClick={() => setIsModalOpen(false)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  </div>
</BasicLayout>
    
  );
}