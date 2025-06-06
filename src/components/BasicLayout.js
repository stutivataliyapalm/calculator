"use client"; 
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// CategoriesPage Component (Renamed correctly to CalculatorLayout)
export default function CalculatorLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path to determine which calculator is shown.

  const categories = [
    { name: "Average Calculator", path: "/Basic-Calculators/AverageCalculator" },
    { name: "Log Calculator", path: "/Basic-Calculators/LogCalculator" },
    { name: "Exponent Calculator", path: "/Basic-Calculators/ExponentCalculator" },
    { name: "Date Calculator", path: "/Basic-Calculators/DateCalculator" },
  ];

  // State to manage which calculator is shown by default
  const [selectedCalculator, setSelectedCalculator] = useState("/Basic-Calculators/AverageCalculator");
  

  // Set default calculator when the component mounts or when pathname changes
  useEffect(() => {
    if (pathname) {
      setSelectedCalculator(pathname);
    }
  }, [pathname]);

  const handleBackToCategories = () => {
    setSelectedCalculator("/Basic-Calculators");
    router.push("/Basic-Calculators");
  };

  const handleCategoryClick = (path) => {
    setSelectedCalculator(path);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-30">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-2 relative">
          {/* Left Sidebar - Categories - Fixed */}
          <aside className="w-44 hidden lg:block">
            <div className="fixed w-44 space-y-3 pr-1">
              {/* Back to Categories Button */}
              <button
                onClick={handleBackToCategories}
                className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center lg:justify-start text-sm"
              >
                ← Back to Categories
              </button>

              {/* Sidebar Heading */}
              <h2 className="text-lg font-bold text-gray-800 mb-2">Basic Calculators</h2>
              <ul className="space-y-2">
                {categories.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleCategoryClick(item.path)}
                      className="w-full p-2 text-left bg-white text-gray-800 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Mobile Sidebar */}
          <aside className="w-full lg:hidden space-y-3 mb-4">
            <button
              onClick={handleBackToCategories}
              className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center text-sm"
            >
              ← Back to Categories
            </button>

            <h2 className="text-lg font-bold text-gray-800 mb-2">Basic Calculators</h2>
            <ul className="space-y-2">
              {categories.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleCategoryClick(item.path)}
                    className="w-full p-2 text-left bg-white text-gray-800 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main content - Calculator */}
          <main className="flex-1 lg:ml-24">
            <div className="flex flex-col lg:flex-row">
              {/* Calculator Content - Left aligned with minimal spacing */}
              <div className="flex-1 flex justify-start pl-0">
                {children}
              </div>
              
              {/* Right Sidebar: Ad Box and Related Calculators */}
              <aside className="w-full lg:w-64 mt-6 lg:mt-0 lg:ml-16 space-y-4">
                {/* Ad Box */}
                <div className="bg-gray-200 rounded-md shadow-lg p-4 h-40 flex items-center justify-center transition-transform transform hover:scale-105">
                  <p className="text-gray-600 text-lg">Advertisement</p>
                </div>

                {/* Related Calculators Section */}
                <div className="bg-white rounded-md shadow-lg p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Related Calculators</h2>
                  <div className="grid grid-cols-1 gap-2">
                    <ul className="space-y-1 text-blue-600 text-sm">
                      <li><a href="/DateCalculator" className="hover:underline hover:text-blue-800">Date Calculator</a></li>
                      <li><a href="/CalculateHours" className="hover:underline hover:text-blue-800">Time Calculator</a></li>
                      <li><a href="/gpa-calculator" className="hover:underline hover:text-blue-800">GPA Calculator</a></li>
                      <li><a href="/AgeCalculator" className="hover:underline hover:text-blue-800">Age Calculator</a></li>
                      <li><a href="/BMI-Calculator" className="hover:underline hover:text-blue-800">BMI Calculator</a></li>
                      <li><a href="/LoanCalculator" className="hover:underline hover:text-blue-800">Loan Calculator</a></li>
                      <li><a href="/TaxCalculator" className="hover:underline hover:text-blue-800">Tax Calculator</a></li>
                      <li><a href="/MortgageCalculator" className="hover:underline hover:text-blue-800">Mortgage Calculator</a></li>
                      <li><a href="/SalaryCalculator" className="hover:underline hover:text-blue-800">Salary Calculator</a></li>
                      <li><a href="/more-calculators" className="hover:underline hover:text-blue-800">More Calculators</a></li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}



// "use client";
// import { useRouter } from "next/navigation";

// const CategoriesPage = () => {
//   const router = useRouter();

//   const categories = [
//     { name: "Average Calculator", path: "/Basic-Calculators/AverageCalculator" },
//     { name: "Log Calculator", path: "/Basic-Calculators/LogCalculator" },
//     { name: "Exponent Calculator", path: "/Basic-Calculators/ExponentCalculator" },
//     { name: "Date Calculator", path: "/Basic-Calculators/DateCalculator" },
//   ];

//   return (
//     <div className="p-6 w-64 mt-[2.0rem] ml-[8.5rem] fixed bg-white">
//       {/* Back to Categories Button */}
//       <button
//         onClick={() => router.push("/categories")}
//         className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
//       >
//         ← Back to Categories
//       </button>

//       {/* Sidebar Heading */}
//       <h2 className="text-lg font-bold text-gray-800 mb-4">Basic Calculators</h2>
     

//       {/* Calculator Links */}
//       <ul className="space-y-2">
//         {categories.map((item, index) => (
//           <li key={index}>
//             <button
//               onClick={() => router.push(item.path)}
//               className="w-full p-3 text-left bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
//             >
//               {item.name}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>

    
//   );
// };

// export default CategoriesPage;

// // my code 

// "use client";

// export default function CalculatorLayout({ children }) {
//   return (
//     <div className="min-h-screen bg-gray-100 px-4 flex justify-center">
//       <div className="w-full max-w-7xl mx-auto flex gap-10">
        
//         {/* Main content area */}
//         <div className="flex-1 flex flex-col items-center overflow-y-auto h-screen scrollbar-hide">
//           <div className="outline-none bg-gray-100 rounded-lg w-full pl-36 pb-40 mt-12 max-w-2xl">
//             {children}
//           </div>
//         </div>

//         {/* Fixed Sidebar: Advertisement and Related Calculators */}
//         <aside className="w-80 hidden md:block sticky top-0 h-screen space-y-6 ">
//           <div className="space-y-6 flex flex-col items-center mt-12">
            
//             {/* Advertisement Block */}
//             <div className="bg-gray-200 rounded-md shadow-lg p-6 h-48 flex items-center justify-center transition-transform transform hover:scale-105 w-80">
//               <p className="text-gray-600 text-lg">Advertisement</p>
//             </div>

//             {/* Related Calculators Block */}
//             <div className="bg-white rounded-lg shadow-lg p-4 h-auto w-80 fixed">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">Related Calculators</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <ul className="space-y-2 text-blue-600">
//                   <li><a href="/DateCalculator" className="hover:underline hover:text-blue-800">Date Calculator</a></li>
//                   <li><a href="/CalculateHours" className="hover:underline hover:text-blue-800">Hour Calculator</a></li>
//                   <li><a href="/TimeCalculator" className="hover:underline hover:text-blue-800">Time Calculator</a></li>
//                   <li><a href="/AgeCalculator" className="hover:underline hover:text-blue-800">Age Calculator</a></li>
//                   <li><a href="/more-calculators" className="hover:underline hover:text-blue-800">More Calculators</a></li>
//                 </ul>
//                 <ul className="space-y-2 text-blue-600">
//                   <li><a href="/RootCalculator" className="hover:underline hover:text-blue-800">Root Calculator</a></li>
//                   <li><a href="/ExponentCalculator" className="hover:underline hover:text-blue-800">Exponent Number</a></li>
//                   <li><a href="/LogCalculator" className="hover:underline hover:text-blue-800">Log Calculator</a></li>
//                   <li><a href="/CircleCalculator" className="hover:underline hover:text-blue-800">Circle Calculator</a></li>
//                   <li><a href="/SalaryCalculator" className="hover:underline hover:text-blue-800">Salary Calculator</a></li>
//                 </ul>
//               </div>
//             </div>

//           </div>
//         </aside>
        
//       </div>
//     </div>
//   );
// }