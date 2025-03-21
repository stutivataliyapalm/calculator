'use client';
import CalculatorLayout from "@/components/BasicLayout";
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useState } from 'react';

const GPAcalculator = () => {
  const [courses, setCourses] = useState([{ course: '', grade: '', credits: '' }]);
  const [gpa, setGpa] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (index, event) => {
    const newCourses = [...courses];
    newCourses[index][event.target.name] = event.target.value;
    setCourses(newCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { course: '', grade: '', credits: '' }]);
  };

  const calculateGPA = () => {
    if (!gpa) {
      alert("Please enter your data.");
      return;
    }
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

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <CalculatorLayout>
      <div className=" flex flex-col bg-gray-100">
        <div className="w-96  p-6 bg-white shadow-md rounded-lg">
          <div className="flex items-center mb-2">
            <h1 className="text-base font-bold">GPA Calculator</h1>
            <button onClick={toggleContent} className="flex items-center ml-4">
              <Info className="w-5 h-5  text-red-500 hover:text-red-400" onClick={() => setIsModalOpen(true)} />
            </button>
          </div>
         
          <table className="w-80">
            <thead>
              <tr>
                <th className="text-left">Course</th>
                <th className="text-left">Credits</th>
                <th className="text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="course"
                      placeholder="Course"
                      value={course.course}
                      onChange={(event) => handleChange(index, event)}
                      className="border rounded-md p-1 w-full text-sm"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="credits"
                      placeholder="Credits"
                      value={course.credits}
                      onChange={(event) => handleChange(index, event)}
                      className="border rounded-md p-1 w-full text-sm"
                    />
                  </td>
                  <td>
                    <select
                      name="grade"
                      value={course.grade}
                      onChange={(event) => handleChange(index, event)}
                      className="border rounded-md p-1 w-half text-sm"
                    >
                      <option value="">Select Grade</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="B-">B-</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                      <option value="C-">C-</option>
                      <option value="D+">D+</option>
                      <option value="D">D</option>
                      <option value="D-">D-</option>
                      <option value="F">F</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button onClick={addCourse} className="bg-blue-500 text-white rounded-md px-2 py-1 text-sm">Add Course</button>
            <button onClick={calculateGPA} className="bg-green-500 text-white rounded-md px-2 py-1 text-sm">Calculate GPA</button>
            <button onClick={clear} className="bg-red-500 text-white rounded-md px-2 py-1 text-sm">Clear</button>
            <button onClick={printGPA} className="text-blue-500 rounded-md px-2 py-1 text-sm">Print</button>
          </div>
          {gpa !== null && (
            <h2 className="text-center mt-2">Your GPA: {gpa}</h2>
          )}
        </div>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
              <Dialog.Title className="text-lg font-semibold mb-2">How to Use GPA Calculator</Dialog.Title>
              <ul className="list-disc pl-5 space-y-2">
                <li>Input your course names, credits, and grades in the respective fields.</li>
                <li>Click "Add Course" to include more courses as needed.</li>
                <li>After entering all courses, click "Calculate GPA" to see your average.</li>
                <li>Use the "Clear" button to reset all fields if needed.</li>
              </ul>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </CalculatorLayout>
  );
};

export default GPAcalculator;