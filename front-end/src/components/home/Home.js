import React, { useState, useEffect } from "react";

const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

function Home(){
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(`${server}/course`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // add this line
            setCourses(data);
        })
    }, []);

    return (
        <div>
            <h1>Course List</h1>
            <ul>
                {courses.map((course) => (
                    <li key={course.course_id}>{course.course_num}</li>
                ))}
            </ul>
        </div>
    );
}

export default Home;