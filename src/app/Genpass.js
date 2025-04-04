"use client";
import React, { useState } from 'react';

const Genpass = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(8); // Default length set to 8

    const generatePassword = () => {
        const len = parseInt(length);
        
        if (isNaN(len) || len < 6 || len > 20) {
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
    return (

        <div className='flex flex-col items-center min-h-screen bg-gray-100 p-4' style={{ textAlign: 'center', padding: '20px' }}>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h1 className="text-xl font-bold text-center mb-4">Generate A Random Password</h1>
                <label htmlFor="length" className="block mb-2">Password Length (6-20):</label>
                <input 
                    id="length"
                    type="number" 
                    className="w-full p-2 border rounded-md mb-4"
                    value={length} 
                    onChange={(e) => setLength(e.target.value)} 
                    min={6} 
                    max={20} 
                    placeholder="Enter length (6-20)"
                    style={{ marginBottom: '10px', padding: '5px' }}
                />
                <br />
                <button className='w-full bg-blue-500 text-white p-2 rounded-md' onClick={generatePassword} style={{ padding: '10px', cursor: 'pointer' }}>
                    Generate A Random Password
                </button>
                <div className="mt-4 p-4 bg-gray-50 border rounded-md text-center" style={{ marginTop: '20px' }}>
                    <h1 className="text-lg font-semibold mt-2 p-2 border border-blue-500 rounded-md bg-white">Your Password is:<span style={{ color: 'blue' }}>{password}</span></h1>
                    </div>
                </div>
            </div>
    );
};
export default Genpass;