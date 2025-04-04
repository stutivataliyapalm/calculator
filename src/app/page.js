"use client"; // Ensures this component runs client-side

import Navbar from "../components/Navbar"; // Correct path to Navbar
// import Breadcrumbs from "@/components/Breadcrumbs";
// import Footer from "../components/Footer"; // Correct path to Footer
import Link from "next/link"; // For navigation

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar /> {/* Include Navbar */}
      <Breadcrumbs /> Include Breadcrumbs

      <div className="pt-20 pb-16 flex flex-col items-center justify-center flex-1">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">
          Welcome to the Advanced Online Calculators
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mb-6">
          A collection of free and easy-to-use online calculators for math, finance, health, and more.
        </p>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 text-center">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">🧮 Math Calculators</h2>
            <p className="text-gray-600">Basic, Scientific, Percentage, Fractions</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">💰 Finance Tools</h2>
            <p className="text-gray-600">Loan, Interest, Mortgage, Savings</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">⚕️ Health Calculators</h2>
            <p className="text-gray-600">BMI, Calories, Body Fat</p>
          </div>
        </div>

        {/* Call to Action */}
        <Link href="/calculators">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Explore Calculators
          </button>
        </Link>
      </div>

      {/* <Footer /> Include Footer */}
    </div>
  );
}
