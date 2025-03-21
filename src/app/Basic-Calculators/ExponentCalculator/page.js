"use client";
import { useState } from "react";
import BasicLayout from "@/components/BasicLayout";
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";

const ExponentCalculator = () => {
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateExponent = () => {
    const baseValue = parseFloat(base);
    const exponentValue = parseFloat(exponent);

    if (isNaN(baseValue) || isNaN(exponentValue)) {
      setResult("Invalid input. Please enter valid numbers.");
      return;
    }

    const expResult = Math.pow(baseValue, exponentValue);
    setResult(expResult);
  };

  const clearInputs = () => {
    setBase("");
    setExponent("");
    setResult(null);
  };

  return (
    <BasicLayout>
      <div className="p-4 max-w-md mx-auto mr-32 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl text-gray-800 font-bold mb-2">Exponent Calculator
        <button
            onClick={() => setIsModalOpen(true)}
            className="ml-2 text-red-600 hover:text-gray-700"
          >
            <Info className="w-5 h-5" />
          </button>
        </h1>

        <div className="mb-4">
          <label className="block text-gray-800 mb-1">Base</label>
          <input
            type="number"
            placeholder="e.g. 2"
            className="w-full p-2 text-gray-800 border rounded"
            value={base}
            onChange={(e) => setBase(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 mb-1">Exponent</label>
          <input
            type="number"
            placeholder="e.g. 3"
            className="w-full p-2 text-gray-800 border rounded"
            value={exponent}
            onChange={(e) => setExponent(e.target.value)}
          />
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={calculateExponent}
          >
            Calculate
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={clearInputs}
          >
            Clear
          </button>
        </div>

        {result !== null && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Result</h2>
            {typeof result === "string" ? (
              <p className="text-red-500">{result}</p>
            ) : (
              <p>
                <strong>
                  {base}<sup>{exponent}</sup> = {result}
                </strong>
              </p>
            )}
          </div>
        )}
         <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
              <Dialog.Title className="text-lg font-semibold mb-2">How to Use Age Calculator</Dialog.Title>
              <ul className="list-disc pl-5 space-y-2">
                <li>Select your Date of Birth.</li>
                <li>Optionally, choose the "Age at Date" to calculate age at a specific date.</li>
                <li>Click "Calculate Age" to view the result in years, months, and days.</li>
                <li>Use the "Clear" button to reset the inputs.</li>
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
      <div className="p-4 mt-8 max-w-md  text-gray-800 mr-32 mx-auto rounded-lg shadow-md bg-white">
      <p>
          The age of a person can be counted differently in different cultures. This calculator is based on the most common age system. In this system, age increases on a person's birthday. For example, the age of a person who has lived for 3 years and 11 months is 3, and their age will increase to 4 on their next birthday one month later. Most western countries use this age system.
          </p>
          <p>
          In some cultures, age is expressed by counting years with or without including the current year. For example, a person who is twenty years old is the same age as another person who is in their twenty-first year of life. In one of the traditional Chinese age systems, people are born at age 1 and their age increases up at the Traditional Chinese New Year rather than their birthday. For example, if one baby is born just one day before the Traditional Chinese New Year, 2 days later, the baby will be 2 even though he/she is only 2 days old.
          </p>
          <p>
          n some situations, the months and day result of this age calculator may be confusing, especially when the starting date is the end of a month. For example, we count Feb. 20 to Mar. 20 to be one month. However, there are two ways to calculate the age from Feb. 28, 2022 to Mar. 31, 2022. If we consider Feb. 28 to Mar. 28 to be one month, then the result is one month and 3 days. If we consider both Feb. 28 and Mar. 31 as the end of the month, then the result is one month. Both calculation results are reasonable. Similar situations exist for dates like Apr. 30 to May 31, May 30 to June 30, etc. The confusion comes from the uneven number of days in different months. In our calculations, we use the former method.
          </p>
      
        </div>
    </BasicLayout>
  );
};

export default ExponentCalculator;