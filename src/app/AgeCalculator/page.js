"use client";
// import CalculatorLayout from "@/components/BasicLayout";
import { useState } from "react";
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";

export default function AgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [ageAtDate, setAgeAtDate] = useState("");
  const [age, setAge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateAge = () => {
    // Show alert if no date of birth is provided
    if (!dateOfBirth) {
      alert("Please enter your date of birth.");
      return;
    }

    const birthDate = new Date(dateOfBirth);
    const targetDate = new Date(ageAtDate || new Date());

    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(targetDate.getFullYear(), targetDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const clearFields = () => {
    setDateOfBirth("");
    setAgeAtDate("");
    setAge(null);
  };

  return (
    // <CalculatorLayout>
      <div className="bg-white mt-1 rounded-lg shadow-md p-6 w-80  ">
        <div className="flex items-center ">
          <h1 className="text-xl font-semibold mr-7 text-center">Age Calculator</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-2 mb-3 text-red-500 hover:text-red-400"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-4">Calculate age between two dates in years, months, and days.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              className="w-52 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age at Date</label>
            <input
              type="date"
              className="w-52 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={ageAtDate}
              onChange={(e) => setAgeAtDate(e.target.value)}
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={calculateAge}
              className="bg-blue-600 hover:bg-blue-700 mr-4  text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Calculate Age
            </button>
            <button
              onClick={clearFields}
              className="bg-red-500 hover:bg-red-400 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>

          {age && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Result:</h2>
              <p className="text-gray-700"><span className="font-medium">{age.years}</span> Years</p>
              <p className="text-gray-700"><span className="font-medium">{age.months}</span> Months</p>
              <p className="text-gray-700"><span className="font-medium">{age.days}</span> Days</p>
            </div>
          )}
        </div>

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
    // </CalculatorLayout>
  );
}