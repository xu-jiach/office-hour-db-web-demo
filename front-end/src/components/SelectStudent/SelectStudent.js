import React, { useState, useEffect } from "react";


const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

function SelectStudent({ onSelection }) {
  const [students, setStudent] = useState([]);

  useEffect(() => {
    fetch(`${server}/student`)
      .then(response => response.json())
      .then(data => setStudent(data));
  }, []);

  const handleStudentSelect = (e) => {
    onSelection(e.target.value);
  };

  return (
    <div className="StudentList">
      <h1>Student List</h1>
      <select onChange={handleStudentSelect}>
        <option value="0">-</option>
        {students.map((student, index) => (
          <option key={index} value={student[1]}>{student[1]}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectStudent;
