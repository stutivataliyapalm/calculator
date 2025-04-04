"use client";    
import React, { useState } from 'react';
import CalculatorLayout from '@/components/BasicLayout';
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";

const IPSubnetCalculator = () => {
    const [ipv4Subnet, setIpv4Subnet] = useState('255.255.255.252');
    const [ipv4Address, setIpv4Address] = useState('');
    const [ipv4Class, setIpv4Class] = useState('Any');
    const [ipv6Prefix, setIpv6Prefix] = useState('/64');
    const [ipv6Address, setIpv6Address] = useState('');
    const [ipv4Result, setIpv4Result] = useState('');
    const [ipv6Result, setIpv6Result] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const openModal = (message) => {
        setModalMessage(message);
        setIsModalOpen(true);
    };

    const handleClearIPv4 = () => {
        setIpv4Address('');
        setIpv4Class('Any');
        setIpv4Result('');
    };

    const handleClearIPv6 = () => {
        setIpv6Address('');
        setIpv6Result('');
    };

    const isValidIPv4 = (ip) => {
        const parts = ip.split('.');
        return (
            parts.length === 4 &&
            parts.every(part => {
                const num = Number(part);
                return num >= 0 && num <= 255 && String(num) === part;
            })
        );
    };

    const calculateIPv4 = (ip, subnet) => {
        const ipParts = ip.split('.').map(Number);
        const subnetParts = subnet.split('.').map(Number);
        
        // Calculate network address
        const network = ipParts.map((part, index) => part & subnetParts[index]);
        // Calculate broadcast address
        const broadcast = network.map((part, index) => part | (~subnetParts[index] & 255));
        // Calculate usable range
        const firstUsable = [...network];
        firstUsable[3] += 1; // Increment last octet for first usable IP
        const lastUsable = [...broadcast];
        lastUsable[3] -= 1; // Decrement last octet for last usable IP

        return {
            network: network.join('.'),
            broadcast: broadcast.join('.'),
            firstUsable: firstUsable.join('.'),
            lastUsable: lastUsable.join('.'),
        };
    };

    const handleCalculateIPv4 = () => {
        if (!isValidIPv4(ipv4Address)) {
            setIpv4Result('Please enter a valid IPv4 address.');
            return;
        }
        const { network, broadcast, firstUsable, lastUsable } = calculateIPv4(ipv4Address, ipv4Subnet);
        setIpv4Result(`Network: ${network}, Broadcast: ${broadcast}, Usable Range: ${firstUsable} - ${lastUsable}`);
    };

    const handleCalculateIPv6 = () => {
        if (!ipv6Address) {
            setIpv6Result('Please enter a valid IPv6 address.');
            return;
        }
        // Basic IPv6 calculation (just showing the network address)
        const networkAddress = ipv6Address.split('/')[0] + ipv6Prefix;
        setIpv6Result(`Network Address: ${networkAddress}`);
    };

    return (
        <CalculatorLayout>  
            <div className="w-full max-w-sm mr-60 bg-white rounded-lg shadow-md p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-base sm:text-lg font-bold text-gray-800">IP Subnet Calculator</h1>
                    <button
                        onClick={() => openModal('This calculator helps you work with IP addresses and subnets.')}
                        className="text-red-500 hover:text-red-400"
                    >
                        <Info className="w-4 h-4" />
                    </button>
                </div>
                <p className="mb-2 text-gray-600 text-xs">Calculate subnet details from an IP address and subnet mask.</p>
                
                {/* IPv4 Subnet Calculator */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">IPv4 Subnet Calculator</h2>
                    <div className="space-y-4">
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">Network Class:</label>
                            <div className="flex gap-4">
                                {['Any', 'A', 'B', 'C'].map((cls) => (
                                    <label key={cls} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="networkClass"
                                            value={cls}
                                            checked={ipv4Class === cls}
                                            onChange={(e) => setIpv4Class(e.target.value)}
                                            className="text-blue-500 focus:ring-blue-500"
                                        />
                                        {cls}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">Subnet:</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base"
                                value={ipv4Subnet}
                                onChange={(e) => setIpv4Subnet(e.target.value)}
                                placeholder="e.g. 255.255.255.0"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">IP Address:</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base"
                                value={ipv4Address}
                                onChange={(e) => setIpv4Address(e.target.value)}
                                placeholder="e.g. 192.168.1.1"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={handleCalculateIPv4}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-base sm:text-lg font-medium"
                            >
                                Calculate
                            </button>
                            <button 
                                onClick={handleClearIPv4}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors text-base sm:text-lg font-medium"
                            >
                                Clear
                            </button>
                        </div>
                        {ipv4Result && (
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h2 className="text-lg font-semibold mb-3">Result:</h2>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-blue-600">{ipv4Result}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        
                {/* IPv6 Subnet Calculator */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">IPv6 Subnet Calculator</h2>
                    <div className="space-y-4">
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">Prefix Length:</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base"
                                value={ipv6Prefix}
                                onChange={(e) => setIpv6Prefix(e.target.value)}
                                placeholder="e.g. /64"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">IP Address:</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 text-base"
                                value={ipv6Address}
                                onChange={(e) => setIpv6Address(e.target.value)}
                                placeholder="e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={handleCalculateIPv6}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-base sm:text-lg font-medium"
                            >
                                Calculate
                            </button>
                            <button 
                                onClick={handleClearIPv6}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors text-base sm:text-lg font-medium"
                            >
                                Clear
                            </button>
                        </div>
                        {ipv6Result && (
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h2 className="text-lg font-semibold mb-3">Result:</h2>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-blue-600">{ipv6Result}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
                        <Dialog.Title className="text-xl font-bold">IP Subnet Calculator Help</Dialog.Title>
                        <Dialog.Description className="mt-4 text-gray-600">
                            {modalMessage}
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>IPv4 calculator helps you find network address, broadcast address, and usable IP ranges.</li>
                                <li>IPv6 calculator helps you determine network addresses for IPv6 addresses.</li>
                                <li>Enter valid IP addresses in the standard format.</li>
                            </ul>
                        </Dialog.Description>
                        <div className="mt-6">
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors text-base font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </CalculatorLayout>
    );
};

export default IPSubnetCalculator;










