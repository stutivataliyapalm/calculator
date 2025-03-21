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
            <div className="flex flex-col items-center gap-8 p-4 bg-white ml-28 mb-40">
                <h1 className="text-3xl font-bold ">IP Subnet Calculator</h1>
                
                {/* IPv4 Subnet Calculator */}
                <div className="w-full max-w-xl p-4 ">
                    <h2 className="text-2xl font-bold mb-4">IPv4 Subnet Calculator
                        <button
                            onClick={() => openModal('This calculator helps you determine the network address, broadcast address, and usable IP range for a given IPv4 address and subnet mask.')}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            <Info className="w-5 h-5" />
                        </button>
                    </h2>
                    <div className="mb-4">
                        <label className="block mb-1">Network Class:</label>
                        <div className="flex gap-2">
                            {['Any', 'A', 'B', 'C'].map((cls) => (
                                <label key={cls} className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="networkClass"
                                        value={cls}
                                        checked={ipv4Class === cls}
                                        onChange={(e) => setIpv4Class(e.target.value)}
                                    />
                                    {cls}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Subnet:</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={ipv4Subnet}
                            onChange={(e) => setIpv4Subnet(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">IP Address:</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={ipv4Address}
                            onChange={(e) => setIpv4Address(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors" onClick={handleCalculateIPv4}>Calculate</button>
                        <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors" onClick={handleClearIPv4}>Clear</button>
                    </div>
                    {ipv4Result && <p className="mt-4 text-blue-600">{ipv4Result}</p>}
                </div>
        
                {/* IPv6 Subnet Calculator */}
                <div className="w-full max-w-xl p-4 ">
                    <h2 className="text-2xl font-bold mb-4">IPv6 Subnet Calculator
                        <button
                            onClick={() => openModal('This calculator helps you determine the network address for a given IPv6 address and prefix length.')}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                            <Info className="w-5 h-5" />
                        </button>
                    </h2>
                    <div className="mb-4">
                        <label className="block mb-1">Prefix Length:</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={ipv6Prefix}
                            onChange={(e) => setIpv6Prefix(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">IP Address:</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={ipv6Address}
                            onChange={(e) => setIpv6Address(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors" onClick={handleCalculateIPv6}>Calculate</button>
                        <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors" onClick={handleClearIPv6}>Clear</button>
                    </div>
                    {ipv6Result && <p className="mt-4 text-blue-600">{ipv6Result}</p>}
                </div>

                {/* Modal for Information */}
                {isModalOpen && (
                    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen">
                            <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-md">
                                <Dialog.Title className="text-xl font-bold mb-4">Information</Dialog.Title>
                                <Dialog.Description className="mb-4">
                                    {modalMessage}
                                </Dialog.Description>
                                <button onClick={() => setIsModalOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Close
                                </button>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                )}
            </div>
        </CalculatorLayout>
    );
};

export default IPSubnetCalculator;











