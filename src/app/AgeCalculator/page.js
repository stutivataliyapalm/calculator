"use client";

import { useState } from "react";
import BasicLayout from "@/components/BasicLayout";
import { Dialog } from "@headlessui/react";
import { Info } from "lucide-react";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateAge = () => {
    if (!birthDate) {
      setAge(null);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMilliseconds = today - birth;

    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    const ageInMonths = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.4375));
    const ageInDays = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));
    const totalDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

    setAge({
      years: ageInYears,
      months: ageInMonths,
      days: ageInDays,
      totalDays: totalDays
    });
  };

  const clearFields = () => {
    setBirthDate("");
    setAge(null);
  };

  return (
    <BasicLayout>
      <div className="w-full max-w-sm mr-60 bg-white rounded-lg shadow-md p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-base sm:text-lg font-bold text-gray-800">Age Calculator</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-red-500 hover:text-red-400"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
        <p className="mb-2 text-gray-600 text-xs">Enter your birth date to calculate your age.</p>
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Birth Date</label>
            <input 
              type="date" 
              value={birthDate} 
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base" 
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={calculateAge} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Calculate Age
            </button>
            <button 
              onClick={clearFields} 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>
          {age && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Your Age:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-600">Years</p>
                  <p className="text-2xl font-bold text-blue-600">{age.years}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-600">Months</p>
                  <p className="text-2xl font-bold text-blue-600">{age.months}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-600">Days</p>
                  <p className="text-2xl font-bold text-blue-600">{age.days}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-gray-600">Total Days</p>
                  <p className="text-2xl font-bold text-blue-600">{age.totalDays}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <Dialog.Title className="text-xl font-bold">Age Calculator Help</Dialog.Title>
            <Dialog.Description className="mt-4 text-gray-600">
              This calculator helps you determine your exact age based on your birth date. It provides:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Years, months, and days since birth</li>
                <li>Total number of days lived</li>
                <li>Precise age calculation</li>
              </ul>
              Simply enter your birth date and click Calculate Age.
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
};

export default AgeCalculator;