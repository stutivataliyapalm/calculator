'use client';
import Link from 'next/link';

const categories = [
    { name: 'Basic Calculators', path: '/Basic-Calculators' },
    { name: 'Financial Calculators', path: '/financial-calculators' },
    { name: 'Health Calculators', path: '/health-calculators' },
    { name: 'Math Calculators', path: '/math-calculators' },
    { name: 'Conversion Tools', path: '/conversion-tools' },
];

const Categories = () => {
    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                Calculator Categories
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {categories.map((category, index) => (
                    <Link 
                        key={index} 
                        href={{ pathname: category.path, query: { from: '/Categories' } }} 
                        className="group" 
                        onClick={() => console.log(`Navigating to ${category.path}`)} // Log the navigation path                       
                    >
                       
                        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 cursor-pointer text-center">
                            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500">
                                {category.name}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
