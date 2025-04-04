'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Info } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useState } from 'react';

const GradeCalculator = () => {
  const [courses, setCourses] = useState([{ course: '', weight: '', grade: '' }]);
  const [totalGrade, setTotalGrade] = useState(null);
  const [letterGrade, setLetterGrade] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCourses = [...courses];
    updatedCourses[index][name] = value;
    setCourses(updatedCourses);
  };

  const calculateGrade = () => {
    let totalPoints = 0;
    let totalWeight = 0;

    courses.forEach(course => {
      const { weight, grade } = course;
      const weightValue = parseFloat(weight);
      if (weightValue > 0 && grade) { // Ensure weight and grade are valid
        totalWeight += weightValue;
        totalPoints += weightValue * getGradePoints(grade);
      }
    });

    if (totalWeight > 0) {
      const gpa = (totalPoints / totalWeight).toFixed(2);
      setTotalGrade(gpa);
      setLetterGrade(getLetterGrade(gpa));
    } else {
      alert("Please enter valid weights.");
    }
  };

  const getGradePoints = (grade) => {
    switch (grade) {
      case 'A+': return 4.0;
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
      default: return 0.0;
    }
  };

  const getLetterGrade = (gpa) => {
    const numericGPA = parseFloat(gpa);
    if (numericGPA >= 4.0) return 'A';
    if (numericGPA >= 3.7) return 'A-';
    if (numericGPA >= 3.3) return 'B+';
    if (numericGPA >= 3.0) return 'B';
    if (numericGPA >= 2.7) return 'B-';
    if (numericGPA >= 2.3) return 'C+';
    if (numericGPA >= 2.0) return 'C';
    if (numericGPA >= 1.7) return 'C-';
    if (numericGPA >= 1.3) return 'D+';
    if (numericGPA >= 1.0) return 'D';
    if (numericGPA >= 0.7) return 'D-';
    return 'F';
  };

  const clearFields = () => {
    setCourses([{ course: '', weight: '', grade: '' }]);
    setTotalGrade(null);
    setLetterGrade(null);
  };

  const addCourse = () => {
    setCourses([...courses, { course: '', weight: '', grade: '' }]);
  };

  const printGrade = () => {
    if (totalGrade === null) {
      alert("Please calculate the GPA before printing.");
      return;
    }
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Print Grade</title></head><body>');
    printWindow.document.write('<h1>Your Generated Grade</h1>');
    printWindow.document.write('<h2>' + totalGrade + ' (' + letterGrade + ')</h2>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    Window.print();
  };

  return (
    <CalculatorLayout>
        <div className="flex-col bg-gray-100">
            <div className="w-96 p-6 bg-white shadow-md rounded-lg mr-5 mb-4"> {/* Added mb-4 here */}
                <div className="flex items-center mb-2">
                    <h1 className="text-base font-bold">Grade Calculator</h1>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center ml-4">
                        <Info className="w-5 h-5 text-red-500 hover:text-red-400" />
                    </button>
                </div>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">Course</th>
                            <th className="text-left">Weight(%)</th>
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
                                        className="border rounded-md p-1 w-24 text-sm"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="weight"
                                        placeholder="Weight(%)"
                                        value={course.weight}
                                        onChange={(event) => handleChange(index, event)}
                                        className="border rounded-md p-1 w-28 text-sm"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="grade"
                                        placeholder="Grade"
                                        value={course.grade}
                                        onChange={(event) => handleChange(index, event)}
                                        className="border rounded-md p-1 w-28 text-sm"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button onClick={addCourse} className="bg-blue-500 text-white rounded-md px-2 py-1 text-sm">Add Course</button>
                    <button onClick={calculateGrade} className="bg-green-500 text-white rounded-md px-2 py-1 text-sm">Calculate Grade</button>
                    <button onClick={clearFields} className="bg-red-500 text-white rounded-md px-2 py-1 text-sm ml-4">Clear</button>
                    <button onClick={printGrade} className="text-blue-500 rounded-md px-2 py-1 text-sm">Print</button>
                </div>
                {totalGrade !== null && (
                    <h2 className="text-center mt-2">Your Total Grade: {totalGrade} ({letterGrade})</h2>
                )}
            </div>
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <Dialog.Title className="text-lg font-semibold mb-2">How to Use Grade Calculator</Dialog.Title>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Input your course names, weights, and grades in the respective fields.</li>
                            <li>Click "Add Course" to include more courses as needed.</li>
                            <li>After entering all courses, click "Calculate Grade" to see your total grade.</li>
                            <li>Use the "Clear" button to reset all fields if needed.</li>
                            <li>Use the "Print" button to print your calculator.</li>
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

        <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-xl"> {/* Added mb-4 here */}
            <p>
                (1) Inputs:
                <br />
                List of assignments/exams
                <br />
                Scores received for each assignment/exam
                <br />
                Total possible points for each assignment/exam
                <br />
                Weights for each assignment/exam (if applicable)
            </p>
            <br />
            <p>
                (2) Calculations:
                <br />
                Calculate the percentage score for each assignment/exam.
                <br />
                Apply weights to calculate the weighted score (if applicable).
                <br />
                Calculate the overall grade.
            </p>
            <br />
            <p>
                (3) Outputs:
                <br />
                Final grade as a percentage.
                <br />
                Letter grade (A, B, C, etc.) based on the final percentage.
            </p>
            <br />
        </div>
    </CalculatorLayout>
);
};

export default GradeCalculator;