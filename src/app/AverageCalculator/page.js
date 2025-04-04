"use client";

import { useState, useEffect } from "react";
import { Info } from "lucide-react";
// import CalculatorLayout from "@/components/CalculatorLayout";
import { Dialog } from "@headlessui/react";

export default function AverageCalculator() {
  const [numbers, setNumbers] = useState("");
  const [stats, setStats] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Calculate stats when form is submitted
  const calculateStats = async () => {
    const numArray = numbers
      .split(",")
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num) && num >= 0);
  
    if (numArray.length === 0) {
      setStats(null);
      return;
    }
  
    try {
      const response = await fetch("/api/calculate-stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numbers: numArray }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setStats(data);  // Updates stats state with the calculation results
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong.");
      }
    } catch (error) {
      alert("An error occurred while calculating the stats.");
      console.error(error);
    }
  };
  
  const clearInput = () => {
    setNumbers("");
    setStats(null);
  };

  // Fetch some data on page load (example for testing purposes)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/calculate-stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numbers: [10, 20, 30, 40, 50], // Example array of numbers
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result); // Store the data from the response
      } catch (err) {
        setError(err.message); // If an error occurs, set the error message
      }
    };

    fetchData();
  }, []); // Empty array ensures it runs only once after the component mounts

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    // <CalculatorLayout>
      <div className="bg-white rounded-lg shadow-md p-4 w-80">
        <div className="mb-4">
          <h1 className="text-base font-semibold mb-4 ml-1">
            Average Calculator
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-3 text-red-500 hover:text-red-400"
            >
              <Info className="w-5 h-5" />
            </button>
          </h1>
          {/* Displaying fetched data */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <input
            type="text"
            placeholder="Enter numbers separated by commas"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            className="w-72 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Display stats */}
          {stats && (
            <div className="mt-4 text-center text-lg font-medium">
              <b>
                <p>
                  Average:{" "}
                  <span className="text-blue-600">{stats.average.toFixed(2)}</span>
                </p>
              </b>
              <p>
                Sum: <span className="text-blue-600">{stats.sum.toFixed(2)}</span>
              </p>
              <p>
                Count: <span className="text-blue-600">{stats.count}</span>
              </p>
              <p>
                Median:{" "}
                <span className="text-blue-600">{stats.median.toFixed(2)}</span>
              </p>
              <p>
                Geometric Mean:{" "}
                <span className="text-blue-600">{stats.geometricMean.toFixed(2)}</span>
              </p>
              <p>
                Largest: <span className="text-blue-600">{stats.largest}</span>
              </p>
              <p>
                Smallest: <span className="text-blue-600">{stats.smallest}</span>
              </p>
              <p>
                Range: <span className="text-blue-600">{stats.range.toFixed(2)}</span>
              </p>
            </div>
          )}
        </div>

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
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    // </CalculatorLayout>
  );
}
