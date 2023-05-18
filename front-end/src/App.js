import Header from "./components/header/Header";
import SelectCourse from "./components/SelectCourse/selectCourse";
import GetAllOfficeHour from "./components/getalloh/GetAllOfficeHour";
import React, { useState } from "react";

const App = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseSelect = (courseNum) => {
      setSelectedCourse(courseNum);
  };

  return (
      <div>
          <Header />
          <SelectCourse onCourseSelect={handleCourseSelect} />
          {selectedCourse && <GetAllOfficeHour courseNum={selectedCourse} />}
      </div>
  );  
  };

export default App;