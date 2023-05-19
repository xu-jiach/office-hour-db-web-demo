import React, { useState, useEffect } from "react";
import "./Selection2Choice.css";
const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

function Selection2Choice({ onSelection }) {
  const [TAs, setTAs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedTA, setSelectedTA] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetch(`${server}/course`)
      .then(response => response.json())
      .then(data => setCourses(data));
  }, []);

  const handleCourseSelect = async (e) => {
    setSelectedCourse(e.target.value);
    const response = await fetch(`${server}/ta/${e.target.value}`);
    const taData = await response.json();
    setTAs(taData);
  };

  const handleTASelect = (e) => {
    setSelectedTA(e.target.value);
  };

  useEffect(() => {
    if(selectedTA && selectedCourse){
      onSelection({TA: selectedTA, course: selectedCourse});
    }
  }, [selectedTA, selectedCourse, onSelection]);
  

  return (
    <div className="TAandCourseList">
      <h1>TA and Course List</h1>
      <select onChange={handleCourseSelect}>
        <option value="0">Select Course</option>
        {courses.map((course, index) => (
          <option key={index} value={course[1]}>{course[1]}</option>
        ))}
      </select>

      <select onChange={handleTASelect}>
        <option value="0">Select TA</option>
        {TAs.map((TA, index) => (
          <option key={index} value={TA[1]}>{TA[1]}</option>
        ))}
      </select>
    </div>
  );
}

export default Selection2Choice;
