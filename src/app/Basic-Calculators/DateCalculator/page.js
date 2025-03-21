"use client";
import { useState } from 'react';
import { format } from 'date-fns';
import BasicLayout from "@/components/BasicLayout";
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";

export default function DateCalculator() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [yearsToAdd, setYearsToAdd] = useState(0);
  const [monthsToAdd, setMonthsToAdd] = useState(0);
  const [weeksToAdd, setWeeksToAdd] = useState(0);
  const [daysToAdd, setDaysToAdd] = useState(0);
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [calculateBusinessDays, setCalculateBusinessDays] = useState(false);
  const [result, setResult] = useState(null);
  const [futureDate, setFutureDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const calculateDateDifference = async () => {
    const response = await fetch("/api/date", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        includeEndDay,
        calculateBusinessDays,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setResult(data);
    }
  };

  const calculateFutureDate = async () => {
    const response = await fetch("/api/date", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        yearsToAdd,
        monthsToAdd,
        weeksToAdd,
        daysToAdd,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setFutureDate(new Date(data.futureDate));
    }
  };

  const clearDateDifference = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setIncludeEndDay(false);
    setCalculateBusinessDays(false);
    setResult(null);
  };

  const clearFutureDate = () => {
    setYearsToAdd(0);
    setMonthsToAdd(0);
    setWeeksToAdd(0);
    setDaysToAdd(0);
    setFutureDate(null);
  };

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  return (
    <BasicLayout>
      <div className="flex flex-col gap-6 ml-70 p-4">
        {/* Date Difference Calculator */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Date Difference Calculator
            <button
              onClick={() => openModal('The square root of a number is a value that, when multiplied by itself, gives the original number.')}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <Info className="w-5 h-5" />
            </button>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full text-gray-800 p-2 border rounded-md"
                value={format(startDate, 'yyyy-MM-dd')}
                onChange={(e) => setStartDate(new Date(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full p-2 text-gray-800  border rounded-md"
                value={format(endDate, 'yyyy-MM-dd')}
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeEndDay}
                onChange={(e) => setIncludeEndDay(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="text-sm text-gray-800">Include End Date</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={calculateBusinessDays}
                onChange={(e) => setCalculateBusinessDays(e.target.checked)}
                className="rounded  text-blue-600"
              />
              <span className="text-sm text-gray-800">Business Days Only</span>
            </label>
          </div>

          <div className="flex justify-center">
            <button
              onClick={calculateDateDifference}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Calculate Difference
            </button>&nbsp;
            <button
              onClick={clearDateDifference}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Results:</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-700">Years: {result.years}</p>
                <p className="text-gray-700">Months: {result.months}</p>
                <p className="text-gray-700">Weeks: {result.weeks}</p>
                <p className="text-gray-700">Days: {result.days}</p>
              </div>
            </div>
          )}
        </div>

        {/* Future Date Calculator */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Future Date Calculator
            <button
              onClick={() => openModal('The cube root of a number is a value that, when used in a multiplication three times, gives the original number.')}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <Info className="w-5 h-5" />
            </button>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Years
              </label>
              <input
                type="number"
                className="w-full text-gray-800 p-2 border rounded-md"
                value={yearsToAdd}
                onChange={(e) => setYearsToAdd(parseInt(e.target.value) || 0)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Months
              </label>
              <input
                type="number"
                className="w-full p-2 border text-gray-800 rounded-md"
                value={monthsToAdd}
                onChange={(e) => setMonthsToAdd(parseInt(e.target.value) || 0)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weeks
              </label>
              <input
                type="number"
                className="w-full p-2 text-gray-800 border rounded-md"
                value={weeksToAdd}
                onChange={(e) => setWeeksToAdd(parseInt(e.target.value) || 0)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Days
              </label>
              <input
                type="number"
                className="w-full p-2 border text-gray-800 rounded-md"
                value={daysToAdd}
                onChange={(e) => setDaysToAdd(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={calculateFutureDate}
              className="bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Calculate Future Date
            </button>&nbsp;
            <button
              onClick={clearFutureDate}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>

          {futureDate && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md text-center">
              <h3 className="text-lg font-semibold mb-2">Future Date:</h3>
              <p className="text-gray-700">{format(futureDate, 'MMMM do, yyyy')}</p>
            </div>
          )}
        </div>

        {/* Informational Content */}
        <div className="bg-white p-6 text-gray-800  rounded-lg shadow-lg w-full max-w-xl">
          <p>
            An age calculator is a tool or application designed to determine a person's age based on
            their date of birth and the current date. It can be implemented in various forms, such as a
            simple web application, a mobile app, or even a physical calculator. The primary function of
            an age calculator is to provide users with their age in years, months, and days, or simply in years.
          </p>
          <br />
          <p>
            The concept of age can vary significantly across different cultures, leading to diverse
            methods of calculating and expressing a person's age. The most widely recognized system,
            particularly in Western countries, is based on the idea that a person's age increases on their birthday.
          </p>
          <br />
          <p>
            However, in various cultures, age may be calculated differently, sometimes including or
            excluding the current year. For example, in some traditions, a person who is said to be
            twenty years old may also be referred to as being in their twenty-first year of life.
          </p>
          <br />
          <p>
            In traditional Chinese culture, age is counted from the moment of birth, but with a unique
            twist: individuals are considered to be 1 year old at birth. Furthermore, their age increases
            not on their birthday but during the celebration of the Traditional Chinese New Year.
          </p>
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
      </div>
    </BasicLayout>
  );
}