import React, { useState, useEffect } from "react";
import "./SelectCourse.css"

const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

function SelectCourse({ onCourseSelect }) {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        fetch(`${server}/course`)
        .then(response => response.json())
        .then(data => {
            setCourses(data);
        })
    }, []);

    const handleCourseSelect = (e) => {
        setSelectedCourse(e.target.value);
        onCourseSelect(e.target.value);
    };

    return (
        <div className="CourseList">
            <h1>Course List</h1>
            <select onChange={handleCourseSelect}>
                <option value="0">-</option>
                {courses.map((course, index) => (
                    <option key={index} value={course[1]}>{course[1]}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectCourse;
