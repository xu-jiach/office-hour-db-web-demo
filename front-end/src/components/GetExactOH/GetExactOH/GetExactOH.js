import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import "./GetExactOH.css"

const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

const GetExactOH = ({courseNum, TA_name}) => {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    fetch(`${server}/exactoh?course_num=${courseNum}&TA_name=${TA_name}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setHours(data);

        });
  }, [courseNum, TA_name]);

    return (
        <div>
            <h1 className="TableTitle">Office Hours for Course {courseNum} and TA {TA_name}</h1>
            <Table bordered className="OHtable">
                <thead>
                    <tr>
                        <th>courseNum</th>
                        <th>TA Name</th>
                        <th>Day</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Room</th>
                        <th>Zoom Link</th>
                    </tr>
                </thead>
                <tbody>
                    {hours.map((hour, index) => (
                        <tr key={index}>
                            <td>{hour[0]}</td>
                            <td>{hour[1]}</td>
                            <td>{hour[2]}</td>
                            <td>{new Date(hour[3] * 1000).toISOString().substr(11, 8)}</td>
                            <td>{new Date(hour[4] * 1000).toISOString().substr(11, 8)}</td>
                            <td>{hour[5]}</td>
                            <td>{hour[6]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default GetExactOH;
