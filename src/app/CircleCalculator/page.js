"use client";    
import { useState } from 'react';
import CalculatorLayout from '@/components/BasicLayout';
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";

const CircleCalculator = () => {
    const [radius, setRadius] = useState('');
    const [diameter, setDiameter] = useState('');
    const [circumference, setCircumference] = useState('');
    const [area, setArea] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


    const calculateCircle = () => {
        const r = parseFloat(radius);
        const d = parseFloat(diameter);
        const c = parseFloat(circumference);
        const a = parseFloat(area);

        if (!isNaN(r)) {
            setDiameter((2 * r).toFixed(2));
            setCircumference((2 * Math.PI * r).toFixed(2));
            setArea((Math.PI * r * r).toFixed(2));
        } else if (!isNaN(d)) {
            const rFromD = d / 2;
            setRadius(rFromD.toFixed(2));
            setCircumference((Math.PI * d).toFixed(2));
            setArea((Math.PI * rFromD * rFromD).toFixed(2));
        } else if (!isNaN(c)) {
            const rFromC = c / (2 * Math.PI);
            setRadius(rFromC.toFixed(2));
            setDiameter((2 * rFromC).toFixed(2));
            setArea((Math.PI * rFromC * rFromC).toFixed(2));
        } else if (!isNaN(a)) {
            const rFromA = Math.sqrt(a / Math.PI);
            setRadius(rFromA.toFixed(2));
            setDiameter((2 * rFromA).toFixed(2));
            setCircumference((2 * Math.PI * rFromA).toFixed(2));
        }
    };

    const clearFields = () => {
        setRadius('');
        setDiameter('');
        setCircumference('');
        setArea('');
    };

    return (
        <CalculatorLayout>
        <div className=" w-80 p-4 bg-white  rounded-lg shadow-md">
            <h1 className="text-2xl font-bold  ">Circle Calculator
            <button
            onClick={() => setIsModalOpen(true)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <Info className="w-5 h-5" />
          </button>   
            </h1>
            <p className="mb-4 text-gray-600">Please provide any value below to calculate the remaining values of a circle.</p>
            <div className=" p-6 ">
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Radius (R)</label>
                    <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)}
                        className="w-full p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Diameter (D)</label>
                    <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)}
                        className="w-full p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Circumference (C)</label>
                    <input type="number" value={circumference} onChange={(e) => setCircumference(e.target.value)}
                        className="w-full p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Area (A)</label>
                    <input type="number" value={area} onChange={(e) => setArea(e.target.value)}
                        className="w-full p-2 border rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="" />
                </div>
                <div className="flex gap-4 justify-center">
                    <button onClick={calculateCircle} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex-1 rounded-md transition-colors">
                        Calculate
                    </button>
                    <button onClick={clearFields} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 flex-1 rounded-md transition-colors">
                        Clear
                    </button>
                </div>
            </div>
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
              <Dialog.Title className="text-lg font-semibold mb-2">How to Use Circle Calculator</Dialog.Title>
              <ul className="list-disc pl-5 space-y-2">
              The Circle Calculator allows you to calculate properties of a circle, such as area, circumference, diameter, and radius. Simply enter the radius or diameter, and the calculator will provide you with the accurate results. This tool is perfect for geometry, construction, design, and everyday use where circular measurements are needed.
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
};

export default CircleCalculator;