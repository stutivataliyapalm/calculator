/**
 * Comprehensive list of all calculators in the application
 * This file can be imported and used across the application
 */
export const calculators = [
  {
    name: "Basic Calculator",
    path: "/Basic-Calculators",
    description: "Perform basic arithmetic calculations (+, -, *, /).",
    keywords: ["arithmetic", "basic", "add", "subtract", "multiply", "divide", "calculation"]
  },
  {
    name: "Average Calculator",
    path: "/Basic-Calculators/AverageCalculator",
    description: "Calculate the average (mean) of a set of numbers.",
    keywords: ["mean", "average", "statistics", "data"]
  },
  {
    name: "Log Calculator",
    path: "/Basic-Calculators/LogCalculator",
    description: "Calculate logarithms with different bases.",
    keywords: ["logarithm", "math", "log", "log10", "ln", "natural log"]
  },
  {
    name: "Exponent Calculator",
    path: "/Basic-Calculators/ExponentCalculator",
    description: "Calculate exponents and powers.",
    keywords: ["exponent", "power", "square", "cubic", "math"]
  },
  {
    name: "Date Calculator",
    path: "/Basic-Calculators/DateCalculator",
    description: "Calculate the difference between dates or add time to a date.",
    keywords: ["date", "time", "duration", "days", "weeks", "months"]
  },
  {
    name: "Root Calculator",
    path: "/RootCalculator",
    description: "Calculate square roots, cube roots, and nth roots.",
    keywords: ["root", "square root", "cubic", "cube root", "nth root", "radical"]
  },
  {
    name: "Percentage Calculator",
    path: "/PercentageCalculator",
    description: "Calculate percentages, increases, decreases, and conversions.",
    keywords: ["percent", "percentage", "discount", "tax", "tip", "increase", "decrease"]
  },
  {
    name: "Circle Calculator",
    path: "/CircleCalculator",
    description: "Calculate area, circumference, and other properties of circles.",
    keywords: ["circle", "area", "circumference", "diameter", "radius", "pi"]
  },
  {
    name: "Age Calculator",
    path: "/AgeCalculator",
    description: "Calculate age based on birth date.",
    keywords: ["age", "birthday", "birth date", "years", "months", "days"]
  },
  {
    name: "IP Subnet Calculator",
    path: "/IPSubnetCalculator",
    description: "Calculate IP subnets, CIDR notation, and network ranges.",
    keywords: ["ip", "subnet", "network", "cidr", "netmask", "ipv4", "address"]
  },
  {
    name: "Calculate Hours",
    path: "/CalculateHours",
    description: "Calculate working hours, time differences, and durations.",
    keywords: ["hours", "time", "duration", "workday", "timesheet", "shift"]
  },
  {
    name: "Random Number Generator",
    path: "/RandomNumber",
    description: "Generate random numbers within specified ranges.",
    keywords: ["random", "number", "generate", "dice", "roll", "lottery"]
  },
  {
    name: "Random Password Generator",
    path: "/RandomPassword",
    description: "Generate secure random passwords with customizable options.",
    keywords: ["password", "generate", "random", "secure", "strong", "security"]
  }
];

/**
 * Search for calculators based on a query string
 * @param {string} searchQuery - The search query to match against
 * @returns {Array} - Array of matching calculator objects
 */
export function searchCalculators(searchQuery) {
  const normalizedQuery = searchQuery.toLowerCase().trim();
  
  return calculators.filter(calculator => {
    // Check for matches in name
    const nameMatch = calculator.name.toLowerCase().includes(normalizedQuery);
    
    // Check for matches in description
    const descriptionMatch = calculator.description.toLowerCase().includes(normalizedQuery);
    
    // Check for matches in keywords
    const keywordMatch = calculator.keywords.some(keyword => 
      keyword.toLowerCase().includes(normalizedQuery)
    );
    
    return nameMatch || descriptionMatch || keywordMatch;
  });
}

/**
 * Get a calculator by its path
 * @param {string} path - The path of the calculator
 * @returns {Object|null} - The calculator object or null if not found
 */
export function getCalculatorByPath(path) {
  return calculators.find(calc => calc.path === path) || null;
}

/**
 * Get popular calculators
 * @param {number} count - Number of calculators to return
 * @returns {Array} - Array of popular calculator objects
 */
export function getPopularCalculators(count = 4) {
  // For now, we're just returning the first few calculators
  // In a real app, this could be based on usage statistics
  return calculators.slice(0, count);
} 