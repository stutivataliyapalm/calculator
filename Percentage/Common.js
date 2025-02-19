// import { useState } from 'react';

//  const PercentageCalculator = () => {
//  const [total, setTotal] = useState('');
//  const [part, setPart] = useState('');
//  const [percentage, setPercentage] = useState(null);
//  const [message, setMessage] = useState('');

//  const calculatePercentage = () => {
//  const totalValue = parseFloat(total);
// const partValue = parseFloat(part);

//   if (isNaN(totalValue) || isNaN(partValue) || totalValue <= 0) {
//        setMessage('Please enter valid numbers.');
//        setPercentage(null);
//        return;
//      }
//      const result = (partValue / totalValue) * 100;
//      setPercentage(result.toFixed(2));
//      setMessage(`The percentage of ${partValue} out of ${totalValue} is:`);
//    };

//    const clearFields = () => {
//      setTotal('');
//      setPart('');
//      setPercentage(null);
//      setMessage('');
//    };

//    return (
//      <div className="flex flex-col min-h-screen bg-gray-100" style={{ padding: '50px', margin: 'auto' }}>
//        <div className="w-half bg-white shadow-md  mx-auto rounded-lg border  border-gray-300 p-6">
//          <h2 className="text-xl font-semibold mb-4 text-center">Percentage Calculator</h2>
//          <div className="flex items-center mb-4">
//            <span className="mx-1 text-2xl">What</span>
//              <span className="mx-2 text-2xl">is</span>
//            <input
//              id="total"
//              type="number"
//              className="border border-gray-300 rounded-md p-2   w-full "
//              placeholder="Total"
//              value={total}
//              onChange={(e) => setTotal(e.target.value)}
//            />
//            <span className="mx-2 text-xl">of</span>
//            <input
//              type="number"
//              className="border border-gray-300 rounded-md p-2 mx-2 w-full"
//              placeholder="Part Value"
//              value={part}
//              onChange={(e) => setPart(e.target.value)}
//            />
//          </div>
//          <div className="flex space-x-4 mb-4"> 
//            <button
//              onClick={calculatePercentage}
//              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
//            >
//              Calculate
//           </button>
//            <button
//              onClick={clearFields}
//              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
//            >
//              Clear
//            </button>
//          </div>
//          {message && <h2 className="text-center">{message} {percentage !== null ? `${percentage}%` : ''}</h2>}
//        </div>
//      </div>
//    );
//  };

//  export default PercentageCalculator;

// // import { useState } from 'react';

// // const PercentageCalculator = () => {
// //   const [total, setTotal] = useState('');
// //   const [part, setPart] = useState('');
// //   const [percentage, setPercentage] = useState(null);
// //   const [message, setMessage] = useState('');

// //   const calculatePercentage = () => {
// //     const totalValue = parseFloat(total);
// //     const partValue = parseFloat(part);

// //     if (isNaN(totalValue) || isNaN(partValue) || totalValue <= 0) {
// //       setMessage('Please enter valid numbers.');
// //       setPercentage(null);
// //       return;
// //     }

// //     const result = (partValue / totalValue) * 100;
// //     setPercentage(result.toFixed(2));
// //     setMessage(`The percentage of ${partValue} out of ${totalValue} is:`);
// //   };

// //   const clearFields = () => {
// //     setTotal('');
// //     setPart('');
// //     setPercentage(null);
// //     setMessage('');
// //   };

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-100" style={{ padding: '50px', margin: 'auto' }}>
// //       <div className="w-full bg-white shadow-md mx-auto rounded-lg border border-gray-300 p-6">
// //         <h2 className="text-xl font-semibold mb-4 text-center">Percentage Calculator</h2>
// //         <div className="flex items-center mb-4">
// //           <span className="mx-1 text-2xl">What</span>
// //           <span className="mx-2 text-2xl">is</span>
// //           <input
// //             id="total"
// //             type="number"
// //             className="border border-gray-300 rounded-md p-2 ml-4 w-full"
// //             placeholder="Total"
// //             value={total}
// //             onChange={(e) => setTotal(e.target.value)}
// //           />
// //           <span className="mx-2 text-xl">of</span>
// //           <input
// //             type="number"
// //             className="border border-gray-300 rounded-md p-2 mx-2 w-full"
// //             placeholder="Part Value"
// //             value={part}
// //             onChange={(e) => setPart(e.target.value)}
// //           />
// //         </div>
// //         <div className="flex space-x-4 mb-4"> 
// //           <button
// //             onClick={calculatePercentage}
// //             className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
// //           >
// //             Calculate
// //           </button>
// //           <button
// //             onClick={clearFields}
// //             className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
// //           >
// //             Clear
// //           </button>
// //         </div>
// //         {message && <h2 className="text-center">{message} {percentage !== null ? `${percentage}%` : ''}</h2>}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PercentageCalculator;









import { useState } from 'react';

const PercentageCalculator = () => {
  // State for Percentage Calculator
  const [total, setTotal] = useState('');
  const [part, setPart] = useState('');
  const [percentage, setPercentage] = useState(null);
  const [percentageMessage, setPercentageMessage] = useState('');

  // State for Fraction Calculator
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [fractionResult, setFractionResult] = useState(null);
  const [fractionMessage, setFractionMessage] = useState('');

  // State for Discount Calculator
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [discountMessage, setDiscountMessage] = useState('');

  // Calculate Percentage (Multiplication Logic)
  const calculatePercentage = () => {
    const totalValue = parseFloat(total);
    const partValue = parseFloat(part);

    if (isNaN(totalValue) || isNaN(partValue) || totalValue <= 0) {
      setPercentageMessage('Please enter valid numbers.');
      setPercentage(null);
      return;
    }

    const result = (totalValue * partValue) / 100; // Multiplication logic
    setPercentage(result.toFixed(2));
    setPercentageMessage(`The result of ${partValue}% of ${totalValue} is:`);
  };

  // Calculate Fraction (Division Logic)
  const calculateFraction = () => {
    const num = parseFloat(numerator);
    const denom = parseFloat(denominator);

    if (isNaN(num) || isNaN(denom) || denom === 0) {
      setFractionMessage('Please enter valid numbers.');
      setFractionResult(null);
      return;
    }

    const result = num / denom; // Division logic
    setFractionResult(result.toFixed(2));
    setFractionMessage(`The fraction ${num}/${denom} is:`);
  };

  // Calculate Discount (Division Logic)
  const calculateDiscount = () => {
    const original = parseFloat(originalPrice);
    const discountValue = parseFloat(discount);

    if (isNaN(original) || isNaN(discountValue) || original <= 0 || discountValue < 0) {
      setDiscountMessage('Please enter valid numbers.');
      setDiscountedPrice(null);
      return;
    }

    const discounted = original / (1 - (discountValue / 100)); // Division logic
    setDiscountedPrice(discounted.toFixed(2));
    setDiscountMessage(`The original price before ${discountValue}% discount was:`);
  };

  // Clear Fields
  const clearFields = () => {
    setTotal('');
    setPart('');
    setPercentage(null);
    setPercentageMessage('');

    setNumerator('');
    setDenominator('');
    setFractionResult(null);
    setFractionMessage('');

    setOriginalPrice('');
    setDiscount('');
    setDiscountedPrice(null);
    setDiscountMessage('');
  };

  return (
    <div className="flex flex-col bg-gray-100" style={{ padding: '50px', margin: '0' }}>
      <div className="w-1/3 bg-white shadow-md rounded-lg border border-gray-300 p-6 mb-3">
        <h2 className="text-xl font-semibold mb-4 text-center">Percentage Calculator in Common Phrases</h2>
        <div className="flex items-center mb-4">
          <span className="text-2xl">What</span>
          <span className="mx-2 text-2xl">is</span>
          <input
            id="total"
            type="number"
            className="border border-gray-300 rounded-md p-2 ml-4 w-full"
            placeholder="%"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
          <span className="mx-2 text-xl">of</span>
          <input
            type="number"
            className="border border-gray-300 rounded-md p-2 mx-2 w-full"
            placeholder=""
            value={part}
            onChange={(e) => setPart(e.target.value)}
          />
        </div>
        <div className="flex space-x-4 mb-4"> 
          <button
            onClick={calculatePercentage}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Calculate
          </button>
          <button
            onClick={clearFields}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Clear
          </button>
        </div>
        {percentageMessage && <h2 className="text-center text-red-600">{percentageMessage} {percentage !== null ? `${percentage}` : ''}</h2>}
      </div>

      <div className="w-1/3 bg-white shadow-md rounded-lg border border-gray-300 p-6 mb-3">
        <h2 className="text-xl font-semibold mb-4 text-center">Fraction Calculator</h2>
        <div className="flex items-center mb-4">
          <input
            id="numerator"
            type="number"
            className="border border-gray-300 rounded-md p-2 ml-4 w-full"
            placeholder=""
            value={numerator}
            onChange={(e) => setNumerator(e.target.value)}
          />
          <span className="mx-1 text-xl">is</span>
          <span className="mx-1 text-xl"> What</span>
          <span className="mx-1 text-xl">%</span>
          <span className="mx-1 text-xl">of</span>
          <input
            id="denominator"
            type="number"
            className="border border-gray-300 rounded-md p-2 mx-2 w-full"
            placeholder=""
            value={denominator}
            onChange={(e) => setDenominator(e.target.value)}
          />
        </div>
        <div className="flex space-x-4 mb-4"> 
          <button
            onClick={calculateFraction}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Calculate
          </button>
          <button
            onClick={clearFields}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Clear
          </button>
        </div>
        {fractionMessage && <h2 className="text-center text-red-600">{fractionMessage} {fractionResult !== null ? `${fractionResult}` : ''}</h2>}
      </div>

      <div className="w-1/3 bg-white shadow-md rounded-lg border border-gray-300 p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Discount Calculator</h2>
        <div className="flex items-center mb-4">        
          <input
            id="originalPrice"
            type="number"
            className="border border-gray-300 rounded-md p-2 ml-4 w-full"
            placeholder=""
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
          <span className="mx-2 text-xl">is</span>
          <input
            id="discount"
            type="number"
            className="border border-gray-300 rounded-md p-2 mx-2 w-full"
            placeholder="%"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <span className="mx-2 text-xl">of</span>
          <span className="mx-2 text-xl">What</span>
        </div>
        <div className="flex space-x-4 mb-4"> 
          <button
            onClick={calculateDiscount}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Calculate
          </button>
          <button
            onClick={clearFields}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Clear
          </button>
        </div>
        {discountMessage && <h2 className="text-center text-red-600">{discountMessage} {discountedPrice !== null ? `$${discountedPrice}` : ''}</h2>}
      </div>
    </div>
  );
};

export default PercentageCalculator;