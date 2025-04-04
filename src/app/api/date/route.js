import { NextResponse } from 'next/server';

// Helper function to check if a date is a weekend
function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
}

// Helper function to add days to a date
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Helper function to add business days to a date
function addBusinessDays(date, days) {
  let result = new Date(date);
  let remainingDays = days;
  
  while (remainingDays > 0) {
    result = addDays(result, 1);
    if (!isWeekend(result)) {
      remainingDays--;
    }
  }
  
  return result;
}

// Helper function to calculate difference in days
function calculateDaysDifference(startDate, endDate, includeEndDay = true, businessDaysOnly = false) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Reset the time part to avoid time zone issues
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  // Calculate the difference in milliseconds
  const diffTime = Math.abs(end - start);
  
  // Calculate the difference in days
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Adjust for including the end day
  if (includeEndDay) {
    diffDays += 1;
  }
  
  // Calculate business days if needed
  if (businessDaysOnly) {
    let businessDays = 0;
    let currentDate = new Date(start);
    
    for (let i = 0; i < diffDays; i++) {
      if (!isWeekend(currentDate)) {
        businessDays++;
      }
      currentDate = addDays(currentDate, 1);
    }
    
    return businessDays;
  }
  
  return diffDays;
}

// Main handler for POST requests
export async function POST(req) {
  try {
    const body = await req.json();
    let result = {};
    
    // Handle date difference calculation
    if (body.startDate && body.endDate) {
      const { startDate, endDate, includeEndDay = true, businessDaysOnly = false } = body;
      
      // Validate the dates
      if (!Date.parse(startDate) || !Date.parse(endDate)) {
        return NextResponse.json(
          { error: 'Invalid date format' },
          { status: 400 }
        );
      }
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Calculate days difference
      const days = calculateDaysDifference(start, end, includeEndDay, businessDaysOnly);
      
      // Calculate weeks difference
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      
      // Calculate months difference (approximate)
      const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      
      // Calculate years difference
      const yearsDiff = end.getFullYear() - start.getFullYear();
      
      result = {
        days,
        weeks,
        remainingDays,
        months: monthsDiff,
        years: yearsDiff,
        businessDays: businessDaysOnly ? days : calculateDaysDifference(start, end, includeEndDay, true)
      };
    }
    // Handle future date calculation
    else if (body.startDate && (body.yearsToAdd || body.monthsToAdd || body.weeksToAdd || body.daysToAdd)) {
      const { 
        startDate, 
        yearsToAdd = 0, 
        monthsToAdd = 0, 
        weeksToAdd = 0, 
        daysToAdd = 0,
        businessDaysToAdd = 0
      } = body;
      
      // Validate the start date
      if (!Date.parse(startDate)) {
        return NextResponse.json(
          { error: 'Invalid date format' },
          { status: 400 }
        );
      }
      
      const start = new Date(startDate);
      let futureDate = new Date(start);
      
      // Add years
      if (yearsToAdd) {
        futureDate.setFullYear(futureDate.getFullYear() + parseInt(yearsToAdd));
      }
      
      // Add months
      if (monthsToAdd) {
        futureDate.setMonth(futureDate.getMonth() + parseInt(monthsToAdd));
      }
      
      // Add weeks
      if (weeksToAdd) {
        futureDate = addDays(futureDate, parseInt(weeksToAdd) * 7);
      }
      
      // Add days
      if (daysToAdd) {
        futureDate = addDays(futureDate, parseInt(daysToAdd));
      }
      
      // Add business days
      if (businessDaysToAdd) {
        futureDate = addBusinessDays(futureDate, parseInt(businessDaysToAdd));
      }
      
      result = {
        futureDate: futureDate.toISOString().split('T')[0]
      };
    }
    else {
      return NextResponse.json(
        { error: 'Invalid request. Please provide startDate and endDate for difference calculation or startDate and time increments for future date calculation.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing date calculation:', error);
    return NextResponse.json(
      { error: 'Failed to process date calculation' },
      { status: 500 }
    );
  }
} 