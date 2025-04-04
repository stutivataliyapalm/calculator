'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { searchCalculators } from '@/data/calculators';

const Navbar = () => {
    const router = useRouter();
    const [isClick, setIsClick] = useState(false);
    const [query, setQuery] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const searchResultsRef = useRef(null);
    const inputRef = useRef(null);

    // Handle clicks outside of search dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Don't close if clicking inside search or search results
            if (
                (searchRef.current && searchRef.current.contains(event.target)) ||
                (searchResultsRef.current && searchResultsRef.current.contains(event.target))
            ) {
                return;
            }
            
            // Close results if clicking outside
            setShowResults(false);
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Search as user types
    useEffect(() => {
        if (query.trim().length > 1) {
            const results = searchCalculators(query);
            setSearchResults(results);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    }, [query]);

    const toggleNavbar = () => {
        setIsClick(!isClick);
        setShowMobileSearch(false);
    };

    const toggleMobileSearch = () => {
        setShowMobileSearch(!showMobileSearch);
        // Focus the input when showing mobile search
        if (!showMobileSearch) {
            setTimeout(() => {
                const mobileInput = document.querySelector('.mobile-search-input');
                if (mobileInput) mobileInput.focus();
            }, 100);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() && searchResults.length > 0) {
            // Navigate to first result
            router.push(searchResults[0].path);
            setShowResults(false);
            setQuery('');
            setShowMobileSearch(false); // Close mobile search after navigation
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        } else if (e.key === 'Escape') {
            setShowResults(false);
        } else if (e.key === 'ArrowDown' && searchResults.length > 0) {
            // Focus the first result when pressing down arrow
            const firstResult = searchResultsRef.current?.querySelector('button');
            if (firstResult) firstResult.focus();
            e.preventDefault();
        }
    };

    const handleResultClick = (path) => {
        router.push(path);
        setShowResults(false);
        setQuery('');
        setShowMobileSearch(false); // Close mobile search after navigation
    };

    const clearSearch = () => {
        setQuery('');
        setSearchResults([]);
        setShowResults(false);
        // Focus the input after clearing
        if (inputRef.current) inputRef.current.focus();
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
                        <div ref={searchRef} className='relative'>
                            <form onSubmit={handleSearch} className='flex items-center border rounded-lg overflow-hidden bg-white shadow-md h-9 w-56'>
                                <input
                                    ref={inputRef}
                                    type='text'
                                    placeholder='Search calculators...'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onClick={() => query.trim().length > 1 && setShowResults(true)}
                                    className='w-full px-2 text-gray-700 outline-none text-sm'
                                    aria-label="Search calculators"
                                    aria-expanded={showResults}
                                />
                                {query ? (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className='p-2 hover:text-red-600 text-gray-500'
                                        aria-label="Clear search"
                                    >
                                        <X size={16} />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className='p-2 hover:text-blue-600 text-blue-500'
                                        aria-label="Submit search"
                                    >
                                        <Search size={18} />
                                    </button>
                                )}
                            </form>
                            
                            {/* Search Results Dropdown */}
                            {showResults && searchResults.length > 0 && (
                                <div 
                                    ref={searchResultsRef}
                                    className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                                    role="listbox"
                                >
                                    <ul className="max-h-72 overflow-y-auto py-1">
                                        {searchResults.map((result, index) => (
                                            <li key={index} role="option">
                                                <button 
                                                    onClick={() => handleResultClick(result.path)}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-blue-50 outline-none text-sm"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleResultClick(result.path);
                                                        if (e.key === 'Escape') {
                                                            setShowResults(false);
                                                            inputRef.current?.focus();
                                                        }
                                                    }}
                                                >
                                                    <div className="font-medium text-blue-600">{result.name}</div>
                                                    <div className="text-xs text-gray-500 truncate">{result.description}</div>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='md:hidden flex items-center space-x-2'>
                        <button
                            className='p-2 text-white hover:bg-blue-600 rounded-full'
                            onClick={toggleMobileSearch}
                            aria-label="Toggle search"
                        >
                            <Search size={20} />
                        </button>
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
            {showMobileSearch && (
                <div className='px-4 py-2 bg-blue-600 md:hidden'>
                    <div className='relative'>
                        <form onSubmit={handleSearch} className='flex items-center'>
                            <input
                                type='text'
                                placeholder='Search calculators...'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className='w-full px-3 py-2 rounded-l-lg outline-none text-sm mobile-search-input'
                                autoFocus
                                aria-label="Mobile search"
                            />
                            {query ? (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className='bg-white p-2 rounded-r-lg text-gray-500'
                                    aria-label="Clear search"
                                >
                                    <X size={20} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className='bg-white p-2 rounded-r-lg text-blue-500'
                                    aria-label="Submit search"
                                >
                                    <Search size={20} />
                                </button>
                            )}
                        </form>
                        
                        {/* Mobile Search Results Dropdown */}
                        {showResults && searchResults.length > 0 && (
                            <div 
                                className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                                role="listbox"
                            >
                                <ul className="max-h-60 overflow-y-auto py-1">
                                    {searchResults.map((result, index) => (
                                        <li key={index} role="option">
                                            <button 
                                                onClick={() => handleResultClick(result.path)}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-blue-50 outline-none text-sm"
                                            >
                                                <div className="font-medium text-blue-600">{result.name}</div>
                                                <div className="text-xs text-gray-500 truncate">{result.description}</div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isClick && (
                <div className='md:hidden px-4 pt-1 pb-2 space-y-1'>
                    <Link href='/' className='text-white block font-semibold'>Home</Link>
                    <Link href='/Categories' className='text-white block font-semibold'>Categories</Link>
                    <Link href='/about' className='text-white block font-semibold'>About Us</Link>
                    <Link href='/terms' className='text-white block font-semibold'>Terms of Use</Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;