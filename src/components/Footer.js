"use client";

import React, { useState, useEffect } from "react";

function Footer() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const atBottom =
            window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 10;
          setIsAtBottom(atBottom);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isAtBottom ? (
    <div className="flex flex-col justify-center items-center text-center p-5 bg-gray-200 w-full shadow-md fixed bottom-0 left-0">
      <h1 className="text-gray-800 font-semibold">
        © 2008-2025 All rights reserved &nbsp;
        <a className="hover:text-blue-600 font-semibold cursor-pointer" href="/">
          Calculator
        </a>
      </h1>
    </div>
  ) : null;
}

export default Footer;