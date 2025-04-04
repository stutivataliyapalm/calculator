"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import BasicLayout from '@/components/BasicLayout';
import { calculators, searchCalculators, getPopularCalculators } from '@/data/calculators';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [popularCalcs, setPopularCalcs] = useState([]);

  useEffect(() => {
    // Get popular calculators for the suggestions section
    setPopularCalcs(getPopularCalculators(4));
    
    // Perform search when query changes
    if (query) {
      const searchResults = searchCalculators(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <BasicLayout>
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Search Results for "{query}"
          </h1>
          
          {results.length === 0 ? (
            <div className="mt-8 text-center">
              {query ? (
                <div>
                  <p className="text-lg text-gray-600 mb-4">No calculators found matching your search.</p>
                  <p className="text-gray-500">Try different keywords or browse our categories.</p>
                </div>
              ) : (
                <p className="text-gray-600">Please enter a search term to find calculators.</p>
              )}
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <p className="text-sm text-gray-500">{results.length} calculator{results.length !== 1 ? 's' : ''} found</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                {results.map((calculator, index) => (
                  <Link 
                    href={calculator.path} 
                    key={index}
                    className="block bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h2 className="text-lg font-semibold text-blue-600 mb-1">{calculator.name}</h2>
                    <p className="text-gray-600 text-sm">{calculator.description}</p>
                    
                    <div className="mt-3 text-xs text-gray-500">
                      <span className="inline-flex items-center">
                        Click to open →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Popular Calculators</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularCalcs.map((calculator, index) => (
                <Link 
                  href={calculator.path} 
                  key={index} 
                  className="bg-gray-100 p-3 rounded text-center hover:bg-gray-200 transition-colors"
                >
                  <span className="text-sm font-medium">{calculator.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
} 