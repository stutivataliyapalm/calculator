"use client";
import { useState } from "react";
import { Info } from "lucide-react";
import BasicLayout from "@/components/BasicLayout";
import { Dialog } from "@headlessui/react";

export default function AverageCalculator() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const parseTextInput = (text) => {
    return text
      .split(/[,\n]/)
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num));
  };

  const calculateStats = async () => {
    try {
      const numbers = parseTextInput(input);

      if (numbers.length === 0) {
        throw new Error("No valid numbers provided");
      }

      const response = await fetch("http://127.0.0.1:5000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numbers }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      alert(err.message || "Failed to calculate statistics");
    }
  };

  const clearInput = () => {
    setInput("");
    setStats(null);
  };

  return (
    <BasicLayout>
      <div className="w-full max-w-sm mr-60 bg-white rounded-lg shadow-md p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-base sm:text-lg font-bold text-gray-800">Average Calculator</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-red-500 hover:text-red-400"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
        <p className="mb-2 text-gray-600 text-xs">Calculate the average (mean) of a set of numbers.</p>
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">Numbers</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base min-h-[140px] font-mono text-sm"
              placeholder="Enter numbers separated by commas or new lines"
              spellCheck="false"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={calculateStats}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Calculate
            </button>
            <button
              onClick={clearInput}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>

          {stats && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Results:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(stats).map(([key, value]) => (
                  <div key={key} className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600">{key.replace(/([A-Z])/g, " $1")}</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {typeof value === "number" ? value.toFixed(2) : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <Dialog.Title className="text-xl font-bold">Average Calculator Help</Dialog.Title>
            <Dialog.Description className="mt-4 text-gray-600">
              <p>Enter numbers separated by commas or new lines:</p>
              <pre className="mt-2 bg-gray-100 p-2 rounded text-xs">1, 2, 3, 4, 5</pre>
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
    </BasicLayout>
  );
}
