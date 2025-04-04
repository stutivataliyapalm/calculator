

// 'use client';

// import Link from 'next/link';

// const categories = [
//     { name: 'Basic Calculators', path: '/Basic-Calculators' },
//     { name: 'Financial Calculators', path: '/financial-calculators' },
//     { name: 'Health Calculators', path: '/health-calculators' },
//     { name: 'Math Calculators', path: '/math-calculators' },
//     { name: 'Conversion Tools', path: '/conversion-tools' },
// ];

// const Categories = () => {
//     return (
//         <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//             <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
//                 Calculator Categories
//             </h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
//                 {categories.map((category, index) => (
//                     <Link key={index} href={category.path} className="group">
//                         <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 cursor-pointer text-center">
//                             <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500">
//                                 {category.name}
//                             </h2>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Categories;



"use client";

export default function CalculatorLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 px-4 flex justify-center">
      <div className="w-full max-w-7xl mx-auto flex gap-10">
        
      
        <div className="flex-1 flex flex-col items-center overflow-y-auto h-screen scrollbar-hide">
          <div className="outline-none bg-gray-100 rounded-lg w-full pl-36 pb-40 mt-12 max-w-2xl">
            {children}
          </div>
        </div>

     
        <aside className="w-80 hidden md:block h-screen sticky top-0 space-y-6">
          
        
          <div className="space-y-6 flex flex-col items-center mt-12">
            
       
            <div className="bg-gray-200 rounded-md shadow-lg p-6 h-48 flex items-center justify-center transition-transform transform hover:scale-105 w-80">
              <p className="text-gray-600 text-lg">Advertisement</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 h-auto w-80">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Related Calculators</h2>
              <div className="grid grid-cols-2 gap-4">
                <ul className="space-y-2 text-blue-600">
                  <li><a href="/DateCalculator" className="hover:underline hover:text-blue-800">Date Calculator</a></li>
                  <li><a href="/CalculateHours" className="hover:underline hover:text-blue-800">Hour Calculator</a></li>
                  <li><a href="/TimeCalculator" className="hover:underline hover:text-blue-800">Time Calculator</a></li>
                  <li><a href="/AgeCalculator" className="hover:underline hover:text-blue-800">Age Calculator</a></li>
                  <li><a href="/more-calculators" className="hover:underline hover:text-blue-800">More Calculators</a></li>
                </ul>
                <ul className="space-y-2 text-blue-600">
                  <li><a href="/RootCalculator" className="hover:underline hover:text-blue-800">Root Calculator</a></li>
                  <li><a href="/ExponentCalculator" className="hover:underline hover:text-blue-800">Exponent Number</a></li>
                  <li><a href="/LogCalculator" className="hover:underline hover:text-blue-800">Log Calculator</a></li>
                  <li><a href="/CircleCalculator" className="hover:underline hover:text-blue-800">Circle Calculator</a></li>
                  <li><a href="/SalaryCalculator" className="hover:underline hover:text-blue-800">Salary Calculator</a></li>
                </ul>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}