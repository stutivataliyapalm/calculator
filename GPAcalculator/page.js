'use client';
import { useState } from 'react';
const GPAcalculator = () => {
  const [courses, setCourses] = useState([{ course: '', grade: '', credits: '' }]);
  const [gpa, setGpa] = useState(null);

  const handleChange = (index, event) => {
    const newCourses = [...courses];
    newCourses[index][event.target.name] = event.target.value;
    setCourses(newCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { course: '', grade: '', credits: '' }]);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const gradePoint = getGradePoint(course.grade);
      if (gradePoint !== null && course.credits) {
        totalPoints += gradePoint * parseFloat(course.credits);
        totalCredits += parseFloat(course.credits);
      }
    });

    setGpa(totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0);
  };

  const getGradePoint = (grade) => {
    switch (grade.toUpperCase()) {
      case 'A+': return 4.3;
      case 'A': return 4.0;
      case 'A-': return 3.7;
      case 'B+': return 3.3;
      case 'B': return 3.0;
      case 'B-': return 2.7;
      case 'C+': return 2.3;
      case 'C': return 2.0;
      case 'C-': return 1.7;
      case 'D+': return 1.3;
      case 'D': return 1.0;
      case 'D-': return 0.7;
      case 'F': return 0.0;
      default: return null;
    }
  };

  const clear = () => {
    setCourses([{ course: '', grade: '', credits: '' }]); // Reset to one empty course
    setGpa(null); // Reset GPA
  };

  const printGPA = () => {
    if (gpa === null) {
      alert("Please calculate the GPA before printing.");
      return;
    }
    
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Print GPA</title></head><body>');
    printWindow.document.write('<h1>Your Generated GPA</h1>');
    printWindow.document.write('<h2>' + gpa + '</h2>'); // Use 'gpa' instead of 'GPA'
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ padding: '50px', margin: 'auto' }}>
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md pl-3 mt-4">
        <h1 className="text-xl font-bold mb-4 text-center">GPA Calculator</h1>
        {courses.map((course, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`course-${index}`} className="block mb-2 font-bold">Course (Optional):</label>
            <input
              id={`course-${index}`}
              type="text"
              name="course"
              placeholder="Course Name"
              value={course.course}
              onChange={(event) => handleChange(index, event)}
              className="border rounded-md mb-2 p-2 w-half"
            />
            <label htmlFor={`credits-${index}`} className="block mb-2 font-bold">Credits:</label>
            <input
              id={`credits-${index}`}
              type="number"
              name="credits"
              placeholder="Credits"
              value={course.credits}
              onChange={(event) => handleChange(index, event)}
              className="border rounded-md mb-2 p-2 w-half"
            />
            <label htmlFor={`grade-${index }`} className="block mb-2 font-bold">Grade:</label>
            <input
              id={`grade-${index}`}
              type="text"
              name="grade"
              placeholder="Grade (A, B, C, etc.)"
              value={course.grade}
              onChange={(event) => handleChange(index, event)}
              className="border rounded-md mb-2 p-2 w-half"
            />
          </div>
        ))}
        <button onClick={addCourse} className="bg-blue-500 text-white rounded-md px-6 py-2 mr-2">Add Course</button>
        <button onClick={calculateGPA} className="bg-green-500 text-white rounded-md px-6 py-2 mr-2 ">Calculate GPA</button>
        <button onClick={clear} className="bg-red-500 text-white rounded-md px-6 py-2 ">Clear</button>
        <button
          onClick={printGPA}
          className=" text-blue-500 rounded-md px-6 py-2 mr-20"
        >
          Print 
        </button>
        {gpa !== null && <h2 className="mt-4">Your GPA: {gpa}</h2>}
      </div>
    </div>
  );
};

export default GPAcalculator;