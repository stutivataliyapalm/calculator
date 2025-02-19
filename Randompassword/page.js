






'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Password = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState('');
    const [showContent, setShowContent] = useState(false);

const generatePassword = () => {
    const len = parseInt(length);
    if (isNaN(len) || len < 6 || len > 35) {
        alert("Password length must be between 6 and 20 characters.");
        return;
    }

    const smallchars = 'abcdefghijklmnopqrstuvwxyz';
    const bigchars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '1234567890';
    const symbols = '@#$%&*';
    const allChars = smallchars + bigchars + numbers + symbols;

    let pass = '';
    for (let i = 0; i < len; i++) {
        pass += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    setPassword(pass);
};

const clearPassword = () => {
    setPassword('');
    setLength('');
};

const toggleContent = () => {
    setShowContent(!showContent);
};

return (
    <div className="fix flex flex-col min-h-screen bg-gray-100" style={{ padding: '50px', margin: 'auto' }}>
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md pl-3 mt-4">
        <div className="flex items-center mb-4">
            <h1 className="text-xl font-bold">Generate A Random Password</h1> <button onClick={toggleContent} className="flex items-center ml-4 "><FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'black', fontSize: '1.5rem' }} /></button></div>
        {showContent && (
            <div className="mt-4 p-4 bg-white rounded-md">
                <h1 className="font-bold">A random password generator is a tool or algorithm that creates a password that is difficult to guess or crack.</h1>
                <h3 className="font-bold">(1) minimum length: 12 characters</h3>
                <p>minimum for a reasonably secure password.</p>
                <h3 className="font-bold">(2) Recommended Length:14-16 characters</h3>
                <p>For better security, especially for sensitive accounts (like banking or email), aim for passwords that are 14 to 16 characters long.</p>
                <h3 className="font-bold">(3) Very Strong Passwords:20 characters or more</h3>
                <p>For the highest level of security, especially for critical accounts, consider using passwords that are 20 characters or longer.</p>
            </div>
        )}
            <label htmlFor="length" className="block mb-2">Password Length (6-35):</label>
            
            <input 
                id="length"
                type="number" 
                className="w-full border rounded-md mb-4 p-2"
                value={length} 
                onChange={(e) => setLength(e.target.value)} 
                min={6} 
                max={35} 
                placeholder="Enter length (6-35)"
            />
            <div className="flex space-x-4">
                <button
                    onClick={generatePassword}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                    Generate Password
                </button>
                
                <button
                    onClick={clearPassword}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                >
                    Clear
                </button>
            </div>
            <div className="flex-1 px-4 py-2 mt-4 p-4 bg-gray-50 border rounded-md text-center">
                <h1 className="text-lg font-semibold mt-2 p-2 border border-blue-500 rounded-md bg-white">
                    Your Password is: <span style={{ color: 'blue' }}>{password}</span>
                </h1>
            </div>
        </div>
        <br />
    </div>
    );
}
export default Password;












