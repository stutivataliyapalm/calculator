// "use client";
// import Link from "next/link";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import DateCalculator from "./DateCalculator/page";
// import AgeCalculator from "./AgeCalculator/page";
// import GPAcalculator from "./GPAcalculator/page";
// import Percentage from "./Percentage/page";
// import Randomnumber from "./Randomnumber/page";
// import Randompassword from "./Randompassword/page";
// import Gradecalculator from './Gradecalculator/page';
// import FractionCalculator from './FractionCalculator/page';
// import RootCalculator from './RootCalculator/page';
// import CircleCalculator from "./CircleCalculator/page";
// import IPSubnetCalculator from "./IPSubnetCalculator/page";
// import AverageCalculator from "./AverageCalculator/page";
// import BasicCalculators from './Basic-Calculators/page';
// import LogCalculator from "./LogCalculator/page";
// import ExponentCalculator from "./ExponentCalculator/page";
// //   "use client";
// // import Link from "next/link";
// // import Navbar from "../components/Navbar"; // Ensure this path is correct
// // import Footer from "../components/Footer"; // Ensure this path is correct

// export default function Page() {
//   return (
//     <div className="pt-20 pb-16 min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold mb-6">Welcome to the Calculator</h1>
//       <div className="flex flex-col text-black space-y-2 text-xl">
//         <Navbar>
//         {/* <Link href="/CalculateHours" className="text-blue-600 hover:underline">Hour Calculator</Link>
//         <Link href="/AgeCalculator" className="text-blue-600 hover:underline">Age Calculator</Link>
//         <Link href="/Randomnumber" className="text-blue-600 hover:underline">Random Number</Link>
//         <Link href="/GPAcalculator" className="text-blue-600 hover:underline">GPA Calculator</Link>
//         <Link href="/DateCalculator" className="text-blue-600 hover:underline">Date Calculator</Link>
//         <Link href="/Randompassword" className="text-blue-600 hover:underline">Random Password</Link>
//         <Link href="/Percentage" className="text-blue-600 hover:underline">Percentage Calculator</Link>
//         <Link href="/Gradecalculator" className="text-blue-600 hover:underline">Grade Calculator</Link>
//         <Link href="/FractionCalculator" className="text-blue-600 hover:underline">Fraction Calculator</Link>
//         <Link href="/RootCalculator" className="text-blue-600 hover:underline">Root Calculator</Link>
//         <Link href="/CircleCalculator" className="text-blue-600 hover:underline">Circle Calculator</Link>
//         <Link href="/IPSubnetCalculator" className="text-blue-600 hover:underline">IPSubnet Calculator</Link>
//         <Link href="/AverageCalculator" className="text-blue-600 hover:underline">Average Calculator</Link>
//         <Link href="/BasicCalculator" className="text-blue-600 hover:underline">Basic Calculator</Link>
//         <Link href="/LogCalculator" className="text-blue-600 hover:underline">Log Calculator</Link>
//         <Link href="/ExponentCalculator" className="text-blue-600 hover:underline">Exponent Calculator</Link> */}
//       </div>
//       <Footer /> {/* Include Footer if needed */}
//     </div>
//   );
// }








"use client"; // Ensures this component runs client-side
import Navbar from "../components/Navbar"; // Correct path to Navbar
import Breadcrumbs from "../components/Breadcrumbs"; // Ensure path is correct
import Footer from "../components/Footer"; // Correct path to Footer
// import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar /> {/* Include Navbar */}
      <Breadcrumbs /> {/* Include Breadcrumbs */}

      <div className="pt-20 pb-16 flex flex-col items-center justify-center flex-1">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Welcome to the Calculator</h1> {/* Centered title */}
      </div>

      <Footer /> {/* Include Footer */}
    </div>
  );
}
