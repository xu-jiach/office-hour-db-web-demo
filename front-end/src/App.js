import React, { useState } from 'react';
import './App.css'
import Header from "./components/header/Header";
import SelectionButton from "./components/SelectionButton/SelectionButton";
import SelectCourse from "./components/SelectCourse/SelectCourse";
import SelectStudent from "./components/SelectStudent/SelectStudent";
import GetStudentOH from "./components/getstudentoh/GetStudentOH";
import GetAllOfficeHour from "./components/getalloh/GetAllOfficeHour";
import GetNextOH from './components/GetNextOH/GetNextOH';
import Selection2ChoiceButton from "./components/GetExactOH/Selection2ChoiceButton/Selection2ChoiceButton";
import Card from "react-bootstrap/Card";
import CardImg from 'react-bootstrap/esm/CardImg';

const App = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonActivation = (buttonId) => {
    setActiveButton(buttonId);
  }

  const handleButtonDeactivation = () => {
    setActiveButton(null);
  };

  return (
    <div className='EntireBG'>
      <Card className='Body'>
      <Card.Img src={process.env.PUBLIC_URL + "/college.jpg"} alt="Logo" className='BodyImg' />
      <Card.ImgOverlay>
      <Header />
      <div className='Grid'>
        {activeButton !== 'student' && activeButton !== 'all' && activeButton !== 'next' && (
          <SelectionButton
            selectionComponent={SelectCourse}
            displayComponent={GetAllOfficeHour}
            buttonLabel="View Office Hour by Course"
            onActivation={() => handleButtonActivation('course')}
            onDeactivation={handleButtonDeactivation}
          />
        )}
      </div>
      <div className='Grid'>
        {activeButton !== 'course' && activeButton !== 'all' && activeButton !== 'next' &&  (
          <SelectionButton
            selectionComponent={SelectStudent}
            displayComponent={GetStudentOH}
            buttonLabel="View Office Hour by Student"
            onActivation={() => handleButtonActivation('student')}
            onDeactivation={handleButtonDeactivation}
          />
        )}
      </div>
      <div className='Grid'>
        {activeButton !== 'course' && activeButton !== 'student' && activeButton !== 'next'  && (
          <Selection2ChoiceButton
            buttonLabel="View Office Hour by TA and Course"
            onActivation={() => handleButtonActivation('all')}
            onDeactivation={handleButtonDeactivation}
          />
        )}
      </div>
      <div className='Grid'>
        {activeButton !== 'student' && activeButton !== 'all' && activeButton !== 'course' &&(
          <SelectionButton
            selectionComponent={SelectCourse}
            displayComponent={GetNextOH}
            buttonLabel="View Next Office Hour by Course"
            onActivation={() => handleButtonActivation('next')}
            onDeactivation={handleButtonDeactivation}
          />
        )}
      </div>
      </Card.ImgOverlay>
      </Card>
    </div>
  );
}

export default App;
