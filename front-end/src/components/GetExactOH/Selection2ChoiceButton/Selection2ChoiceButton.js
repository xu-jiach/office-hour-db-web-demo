// Selection2ChoiceButton.js
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Selection2Choice from '../Selection2Choice/Selection2Choice';
import GetExactOH from '../GetExactOH/GetExactOH';

function Selection2ChoiceButton({ buttonLabel, onActivation, onDeactivation }) {
  const [stage, setStage] = useState("initial");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleButtonClick = () => {
    setStage("selection");
    if (onActivation) {
      onActivation();
    }
  }

  const handleSelection = (selectedItem) => {
    console.log("Selected Item:", selectedItem); // new line
    setSelectedItem(selectedItem);
    setStage("display");
  }
  

  const handleBackClick = () => {
    setSelectedItem(null);
    setStage("initial");
    if (onDeactivation) {
      onDeactivation();
    }
  }

  return (
    <div>
      {stage === "initial" ? (
        <Button variant="primary" onClick={handleButtonClick}>
          {buttonLabel}
        </Button>
      ) : stage === "display" ? (
        <div>
          <Button variant="danger" onClick={handleBackClick}>Back</Button>
          <GetExactOH courseNum={selectedItem.course} TA_name={selectedItem.TA} />
        </div>
      ) : (
        <div>
          <Button variant="danger" onClick={handleBackClick}>Back</Button>
          <Selection2Choice onSelection={handleSelection} />
        </div>
      )}
    </div>
  );
}

export default Selection2ChoiceButton;
