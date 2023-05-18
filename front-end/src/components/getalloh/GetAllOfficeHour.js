import React, { useState, useEffect } from "react";
import "./GetAllOfficeHour.css"
const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

function GetAllOfficeHour({ courseNum }) {
    const [officeHours, setOfficeHours] = useState([]);

    useEffect(() => {
        if (courseNum) {
            fetch(`${server}/office_hour_course/${courseNum}`)
            .then(response => response.json())
            .then(data => {
                setOfficeHours(data);
            })
        }
    }, [courseNum]);

    return (
        <div>
            <h1>Office Hours for Course {courseNum}</h1>
            <table className="OHtable">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Day</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Room</th>
                        <th>Zoom Link</th>
                    </tr>
                </thead>
                <tbody>
                    {officeHours.map((hour, index) => (
                        <tr key={index}>
                            <td>{hour[0]}</td>
                            <td>{hour[1]}</td>
                            <td>{new Date(hour[2] * 1000).toISOString().substr(11, 8)}</td>
                            <td>{new Date(hour[3] * 1000).toISOString().substr(11, 8)}</td>
                            <td>{hour[4]}</td>
                            <td>{hour[5]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetAllOfficeHour;
