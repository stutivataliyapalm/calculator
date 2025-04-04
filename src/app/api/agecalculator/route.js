export async function POST(req) {
    try {
      const { dateOfBirth, ageAtDate } = await req.json();
  
      if (!dateOfBirth) {
        return new Response(
          JSON.stringify({ error: "Date of birth is required." }),
          { status: 400 }
        );
      }
  
      const dob = new Date(dateOfBirth);
      const endDate = ageAtDate ? new Date(ageAtDate) : new Date();
  
      if (isNaN(dob.getTime()) || isNaN(endDate.getTime())) {
        return new Response(
          JSON.stringify({ error: "Invalid date format." }),
          { status: 400 }
        );
      }
  
      const age = calculateAge(dob, endDate);
  
      return new Response(JSON.stringify(age), { status: 200 });
    } catch (error) {
      console.error("Server Error:", error);
      return new Response(
        JSON.stringify({ error: "An error occurred while calculating the age." }),
        { status: 500 }
      );
    }
  }
  
  function calculateAge(dob, endDate) {
    const diff = endDate - dob;
    const ageDate = new Date(diff);
  
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;
  
    return { years, months, days };
  }