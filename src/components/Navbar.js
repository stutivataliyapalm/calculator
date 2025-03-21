'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

const Navbar = () => {
    const [isClick, setIsClick] = useState(false);
    const [query, setQuery] = useState('');

    const toggleNavbar = () => {
        setIsClick(!isClick);
    };

    const handleSearch = () => {
        alert(`Searching for: ${query}`); // Corrected string interpolation
        // Implement search logic here, e.g., redirect to a search results page
    };

    return (
        <div className='bg-blue-500 w-full fixed top-0 left-0 shadow-md z-50'>
            <div className='max-w-7xl mx-auto px-6 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex-shrink-0 pl-3'>
                        <Link href='/' className='text-white text-2xl font-bold'>
                            Calculator
                        </Link>
                        
                    </div>
                    <div className='hidden md:flex flex-1 justify-end items-center space-x-4'>
                        <Link href='/' className='text-white font-semibold'>Home</Link>
                        <Link href='/Categories' className='text-white font-semibold flex items-center gap-1'>
                            Categories
                        </Link>
                        <Link href='/about' className='text-white font-semibold'>About Us</Link>
                        <Link href='/terms' className='text-white font-semibold'>Terms of Use</Link>
                        <div className='flex items-center border rounded-lg overflow-hidden bg-white shadow-md h-9 w-56'>
                            <input
                                type='text'
                                placeholder='Search...'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className='w-full px-2 text-gray-700 outline-none text-sm'
                            />
                            <button
                                onClick={handleSearch}
                                className='p-2 hover:text-blue-600 text-blue-500'
                                aria-label="Search"
                            >
                                <Search size={18} />
                            </button>
                        </div>
                    </div>
                    <div className='md:hidden flex items-center'>
                        <button
                            className='inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none'
                            onClick={toggleNavbar}
                            aria-label="Toggle navigation"
                        >
                            {isClick ? (
                                <svg className='h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                </svg>
                            ) : (
                                <svg className='h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isClick && (
                <div className='md:hidden px-4 pt-1 pb-2 space-y-1'>
                    <Link href='/' className='text-white block font-semibold'>Home</Link>
                    <Link href='/categories' className='text-white block font-semibold'>Categories</Link>
                    <Link href='/about' className='text-white block font-semibold'>About Us</Link>
                    <Link href='/terms' className='text-white block font-semibold'>Terms of Use</Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
