"use client";
import { useState } from 'react';
import { format, addYears, addMonths, addWeeks, addDays, differenceInDays, isWeekend } from 'date-fns';
import CalculatorLayout from '@/components/CalculatorLayout';
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

  const calculateDateDifference = () => {
    let daysDifference = differenceInDays(endDate, startDate);
    
    if (includeEndDay) daysDifference += 1;
    
    if (calculateBusinessDays) {
      let businessDays = 0;
      let currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        if (!isWeekend(currentDate)) businessDays++;
        currentDate = addDays(currentDate, 1);
      }
      
      daysDifference = businessDays - (includeEndDay ? 0 : 1);
    }

    setResult({
      days: daysDifference,
      weeks: Math.floor(daysDifference / 7),
      months: differenceInMonths(endDate, startDate),
      years: differenceInYears(endDate, startDate)
    });
  };

  const calculateFutureDate = () => {
    let newDate = new Date(startDate);
    newDate = addYears(newDate, yearsToAdd);
    newDate = addMonths(newDate, monthsToAdd);
    newDate = addWeeks(newDate, weeksToAdd);
    newDate = addDays(newDate, daysToAdd);
    setFutureDate(newDate);
  };

  const clear = () => {
    setStartDate('null');

  }
  return (
    <CalculatorLayout>
    <div className="  grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
    {/* Date Difference Calculator */}
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4 w-96 max-w-xl">
        <h2 className="text-base font-bold text-gray-800 mb-4 text-center">
          Date Difference Calculator
        <button
            onClick={() => setIsModalOpen(true)}
            className="ml-2 mb-3 text-red-500 hover:text-red-400"
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
            className="w-full p-2 border rounded-md"
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
            className="w-full p-2 border rounded-md"
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
          <span className="text-sm text-gray-700">Include End Date</span>
        </label>
  
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={calculateBusinessDays}
            onChange={(e) => setCalculateBusinessDays(e.target.checked)}
            className="rounded text-blue-600"
          />
          <span className="text-sm text-gray-700">Business Days Only</span>
        </label>
      </div>
  
      <div className="flex space-x-2">
        <button
          onClick={calculateDateDifference}
          className="flex-1 px-2 py-1  bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out text-sm"
        >
          Calculate Difference
        </button>
        <button
          onClick={clear}
          className="flex-1 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
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
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Future Date Calculator
      </h2>
  
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Years
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={yearsToAdd}
            onChange={(e) => setYearsToAdd(parseInt(e.target.value) || 0)}
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Months
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
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
            className="w-full p-2 border rounded-md"
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
            className="w-full p-2 border rounded-md"
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
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-xl">
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
       
     
    </CalculatorLayout>
  );
}

// Helper functions
function differenceInYears(date1, date2) {    
  return date1.getFullYear() - date2.getFullYear();
}

function differenceInMonths(date1, date2) {
  return (date1.getFullYear() - date2.getFullYear()) * 12 + 
         (date1.getMonth() - date2.getMonth());
}