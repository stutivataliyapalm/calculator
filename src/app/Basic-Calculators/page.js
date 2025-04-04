"use client";

import { useState } from "react";
import BasicLayout from "@/components/BasicLayout";
import { Dialog } from "@headlessui/react";
import { Info } from "lucide-react";

export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNumberClick = (number) => {
    setDisplay(display === "0" ? number.toString() : display + number.toString());
  };

  const handleOperatorClick = (operator) => {
    setDisplay(display + operator);
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: display }),
      });

      const data = await response.json();
      if (response.ok) {
        setDisplay(data.result.toString());
      } else {
        setDisplay("Error");
      }
    } catch (error) {
      setDisplay("Error");
    }
  };

  const handleDecimal = () => {
    const parts = display.split(/[-+*/]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes(".")) {
      setDisplay(display + ".");
    }
  };

  return (
    <BasicLayout>
      <div className="w-full max-w-sm mr-60 bg-white rounded-lg shadow-md p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-base sm:text-lg font-bold text-gray-800">Basic Calculator</h1>
          <button onClick={() => setIsModalOpen(true)} className="text-red-500 hover:text-red-400">
            <Info className="w-4 h-4" />
          </button>
        </div>

        <p className="mb-2 text-gray-600 text-xs">Perform basic arithmetic calculations.</p>

        <div className="bg-gray-100 p-2 rounded-lg mb-2 text-right">
          <p className="text-xl font-semibold text-gray-800">{display}</p>
        </div>

        <div className="grid grid-cols-4 gap-1">
          {[7, 8, 9, "/"].map((item) => (
            <button key={item} onClick={() => (typeof item === "number" ? handleNumberClick(item) : handleOperatorClick(item))}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md text-base font-medium">
              {item}
            </button>
          ))}
          {[4, 5, 6, "*"].map((item) => (
            <button key={item} onClick={() => (typeof item === "number" ? handleNumberClick(item) : handleOperatorClick(item))}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md text-base font-medium">
              {item}
            </button>
          ))}
          {[1, 2, 3, "-"].map((item) => (
            <button key={item} onClick={() => (typeof item === "number" ? handleNumberClick(item) : handleOperatorClick(item))}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md text-base font-medium">
              {item}
            </button>
          ))}
          {[0, ".", "=", "+"].map((item) => (
            <button key={item} onClick={() => (item === "=" ? handleCalculate() : item === "." ? handleDecimal() : handleNumberClick(item))}
              className={`p-2 rounded-md text-base font-medium ${item === "=" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 hover:bg-gray-300"}`}>
              {item}
            </button>
          ))}
        </div>

        <button onClick={handleClear} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-2 font-medium">
          Clear
        </button>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <Dialog.Title className="text-xl font-bold">Basic Calculator Help</Dialog.Title>
            <Dialog.Description className="mt-4 text-gray-600">
              This calculator provides basic arithmetic functions:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Addition (+)</li>
                <li>Subtraction (-)</li>
                <li>Multiplication (*)</li>
                <li>Division (/)</li>
              </ul>
              Enter numbers and operations using the keypad and press = to calculate the result.
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
}
