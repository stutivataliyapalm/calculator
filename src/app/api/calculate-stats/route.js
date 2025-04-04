// Define the add function
function add(a, b) {
    return a + b;
  }
  
  export async function POST(req) {
    try {
      const body = await req.json();
      const { numbers } = body;
  
      // Validate input
      if (!Array.isArray(numbers) || numbers.length === 0) {
        return new Response(
          JSON.stringify({ error: "Numbers are required for calculations." }),
          { status: 400 }
        );
      }
  
      // Convert input to number array and filter invalid values
      const numArray = numbers.map(num => parseFloat(num)).filter(num => !isNaN(num));
  
      if (numArray.length === 0) {
        return new Response(
          JSON.stringify({ error: "Invalid numbers in input." }),
          { status: 400 }
        );
      }
  
      // Perform the calculations
      const sum = numArray.reduce((acc, curr) => add(acc, curr), 0);
      const count = numArray.length;
      const average = sum / count;
  
      // Calculate median
      const sortedArray = [...numArray].sort((a, b) => a - b);
      const median = count % 2 === 0
        ? (sortedArray[count / 2 - 1] + sortedArray[count / 2]) / 2
        : sortedArray[Math.floor(count / 2)];
  
      // Calculate geometric mean
      const geometricMean = Math.pow(numArray.reduce((acc, curr) => acc * curr, 1), 1 / count);
  
      // Get largest, smallest, and range
      const largest = Math.max(...numArray);
      const smallest = Math.min(...numArray);
      const range = largest - smallest;
  
      // Create stats object
      const stats = { sum, count, average, median, geometricMean, largest, smallest, range };
  
      return new Response(JSON.stringify(stats), { status: 200 });
    } catch (error) {
      console.error("Server Error:", error);
      return new Response(
        JSON.stringify({ error: "An error occurred while calculating the stats." }),
        { status: 500 }
      );
    }
  }
  