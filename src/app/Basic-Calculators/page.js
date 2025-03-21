















//In this code Category bar is not fixed

// 'use client';  // Use 'use client' if using React's client-side rendering

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import BasicLayout from "@/components/BasicLayout";
// import { evaluate } from 'mathjs';
// import Footer from "@/components/Footer";
// import Link from "next/link";
// // export default function BasicCalculator() {
// const BasicCalculator = () => {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState("");
//   const router = useRouter();

//   // Handle button clicks
//   const handleClick = (value) => {
//     setInput((prevInput) => prevInput + value);
//   };

//   // Clear the input and result
//   const handleClear = () => {
//     setInput("");
//     setResult("");
//   };

//   // Evaluate the expression using math.js for safety
//   const handleEvaluate = () => {
//     try {
//       if (input.trim() === "") {
//         setResult("Error");
//         return;
//       }
//       setResult(evaluate(input)); // Using math.js to safely evaluate the expression
//       setInput(""); 
//     } catch (error) {
//       setResult("Error"); // In case of an invalid input, show error
//     }
//   };

//   // const handleBackToCategories = () => {
//   //   router.push("/Categories");  // This will redirect to the categories page
//   // };
//   return (
//    <BasicLayout>
//     <div className="flex min-h-screen bg-gray-100 ">
//       {/* Sidebar */}
//       <div className="p-6 w-64 mt-[2.0rem] ml-[8.5rem] -left-14 fixed bg-white">
//       {/* <Link href="/" /> */}
      
//         {/* <button
//           onClick={handleBackToCategories} // onClick={() => router.push("/handleBackToCategories")}
//           className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
//         >
//           ← Back to Categories
//         </button> */}
         
//         {/* <h2 className="text-lg font-bold text-gray-800 mb-4">Basic Calculators</h2>
//         <ul className="space-y-3">
//           {[
//             { name: "Average Calculator", path: "/Basic-Calculators/AverageCalculator" },
//             { name: "Log Calculator", path: "/Basic-Calculators/LogCalculator" },
//             { name: "Exponent Calculator", path: "/Basic-Calculators/ExponentCalculator" },
//             { name: "Date Calculator", path: "/Basic-Calculators/DateCalculator" }
//           ].map((item, index) => (
//             <li key={index}>
//               <button
//                 onClick={() => router.push(item.path)}
//                 className="w-full p-3 text-left bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
//               >
//                 {item.name}
//               </button>
//             </li>
//           ))}
//         </ul> */}
//       </div>

//       {/* Calculator Content */}
//       <div className="flex-grow p-6 ml-24 overflow-hidden"> {/* Hide scrollbar here */}
        
//           <div className="w-96 max-w-md flex flex-col p-6 bg-white rounded-lg shadow-lg bottom-9 fixed" style={{ marginTop: "0" }}>
//             <h2 className="font-bold text-gray-800 text-xl text-center">Basic Calculator</h2>

//             {/* Screen to show the input and result */}
//             <div className="flex flex-col justify-end bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
//               <div className="text-4xl font-bold text-right text-gray-800">
//                 {input || "0"}
//               </div>
//               {result && (
//                 <div className="text-2xl text-right text-blue-500 mt-4">
//                   = {result}
//                 </div>
//               )}
//             </div>

//             {/* Calculator Buttons */}
//             <div className="grid grid-cols-4 gap-4 mt-6">
//               {["1", "2", "3", "+"].map((item) => (
//                 <button
//                   key={item}
//                   className="py-4 text-2xl font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//                   onClick={() => handleClick(item)}
//                 >
//                   {item}
//                 </button>
//               ))}
//               {["4", "5", "6", "-"].map((item) => (
//                 <button
//                   key={item}
//                   className="py-4 text-2xl font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//                   onClick={() => handleClick(item)}
//                 >
//                   {item}
//                 </button>
//               ))}
//               {["7", "8", "9", "*"].map((item) => (
//                 <button
//                   key={item}
//                   className="py-4 text-2xl font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//                   onClick={() => handleClick(item)}
//                 >
//                   {item}
//                 </button>
//               ))}
//               {["0", "C", "=", "/"].map((item) => (
//                 <button
//                   key={item}
//                   className="py-4 text-2xl font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//                   onClick={() => {
//                     if (item === "C") {
//                       handleClear();
//                     } else if (item === "=") {
//                       handleEvaluate();
//                     } else {
//                       handleClick(item);
//                     }
//                   }}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
          
//       </div>
     
//       {/* Footer */}
//       <Footer />
//     </div>
//     </BasicLayout>
//   );
// };

// export default BasicCalculator;




// pages/BasicCalculator.js

"use client";

import { useState } from "react"; 
import { useRouter } from "next/navigation"; 
import BasicLayout from "@/components/BasicLayout";

const BasicCalculator = () => {   
  const [input, setInput] = useState("");   
  const [result, setResult] = useState("");   
  const router = useRouter();  

  // Handle button clicks   
  const handleClick = (value) => {     
    setInput((prevInput) => prevInput + value);   
  };    

  // Clear the input and result   
  const handleClear = () => {     
    setInput("");     
    setResult("");   
  };    

  // Evaluate the expression   
  const handleEvaluate = () => {     
    try {       
      if (input.trim() === "") {         
        setResult("Error");         
        return;       
      }       
      setResult(eval(input));  // NOTE: eval can be unsafe in production, consider using a library like math.js in a real app       
      setInput("");      
    } catch (error) {       
      setResult("Error"); // In case of an invalid input, show error     
    }   
  };    

  return (  
    <BasicLayout>   
          <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className="w-64 p-6">
          {/* Sidebar content goes here */}
          <h2 className="text-lg font-bold text-gray-800 mb-4">Categories</h2>
          <ul className="space-y-3">
            {/* Example categories */}
            <li><button className="w-full p-3 text-left bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">Category 1</button></li>
            <li><button className="w-full p-3 text-left bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">Category 2</button></li>
            <li><button className="w-full p-3 text-left bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">Category 3</button></li>
          </ul>
        </div>

        {/* Main Content - Calculator */}
        <div className="flex-1 flex justify-center items-start  p-6">
          <div className="w-full max-w-md flex flex-col p-6 mr-24 mb-[2.0rem]  bg-white rounded-lg shadow-lg">
            <h2 className="font-bold text-gray-800 text-xl text-center">Basic Calculator</h2>        

            {/* Screen to show the input and result */}       
            <div className="flex flex-col justify-end bg-gray-100 p-6 rounded-lg shadow-inner mb-6"> 
              <div className="text-4xl font-bold text-right text-gray-800">           
                {input || "0"}         
              </div>         
              {result && (           
                <div className="text-2xl text-right text-blue-500 mt-4">             
                  = {result}           
                </div>         
              )}       
            </div>        

            {/* Buttons */}       
            <div className="grid grid-cols-4 gap-4 mt-6">         
              {["1", "2", "3", "+"].map((item) => (           
                <button             
                  key={item}             
                  className="py-4 text-2xl font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"             
                  onClick={() => handleClick(item)}           
                >             
                  {item}           
                </button>         
              ))}         
              {["4", "5", "6", "-"].map((item) => (           
                <button             
                  key={item}             
                  className="py-4 text-2xl font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"             
                  onClick={() => handleClick(item)}           
                >             
                  {item}           
                </button>         
              ))}         
              {["7", "8", "9", "*"].map((item) => (           
                <button             
                  key={item}             
                  className="py-4 text-2xl font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"             
                  onClick={() => handleClick(item)}           
                >             
                  {item}           
                </button>         
              ))}         
              {["0", "C", "=", "/"].map((item) => (           
                <button             
                  key={item}             
                  className="py-4 text-2xl font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"             
                  onClick={() => {               
                    if (item === "C") {                 
                      handleClear();               
                    } else if (item === "=") {                 
                      handleEvaluate();               
                    } else {                 
                      handleClick(item);               
                    }             
                  }}           
                >             
                  {item}           
                </button>         
              ))}       
            </div>     
          </div>
        </div>
      </div> 
    </BasicLayout>
  ); 
};

export default BasicCalculator;
