import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PdfForm = () => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('B.Tech');

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePdf();
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    const tableData = course === 'B.Tech'
      ? [
        ['year', 'One time fee', 'Tuition fee'],
        [1, 500, 160],
        [2, '-', 160],
      ]
      : [
        ['year', 'One time fee', 'Tuition fee'],
        [1, 600, 260],
        [2, '-', 260],
      ];

    doc.setFontSize(12);
    doc.text(`Ref- ${course === 'B.Tech' ? 'A101' : 'B101'}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Course: ${course}`, 20, 40);
    doc.text(`Date of Offer (current date): ${currentDate}`, 20, 50);
    doc.text('Fee structure:', 20, 60);

    doc.autoTable({
      startY: 70,
      head: [tableData[0]],
      body: tableData.slice(1),
      styles: { halign: 'center', fontSize: 12 },
      margin: { top: 10 },
    });

    doc.save(`${name}_${course}.pdf`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">PDF Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="course" className="block font-medium mb-1">Course:</label>
            <select
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Generate PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default PdfForm;