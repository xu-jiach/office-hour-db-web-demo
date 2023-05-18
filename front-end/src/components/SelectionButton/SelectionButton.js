// SelectionButton.js
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function SelectionButton({ selectionComponent: SelectionComponent, 
  displayComponent: DisplayComponent, buttonLabel, 
  onActivation, onDeactivation }) {
  const [stage, setStage] = useState("initial");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleButtonClick = () => {
    setStage("selection");
    if (onActivation) {
      onActivation();
    }
  }

  const handleSelection = (item) => {
    setSelectedItem(item);
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
    <div className="SelectionButton">
      {stage === "initial" ? (
        <Button variant="primary" onClick={handleButtonClick}>
          {buttonLabel}
        </Button>
      ) : stage === "display" ? (
        <div>
          <Button variant="danger" onClick={handleBackClick}>Back</Button>
          <DisplayComponent item={selectedItem} />
        </div>
      ) : (
        <div>
          <Button variant="danger" onClick={handleBackClick}>Back</Button>
          <SelectionComponent onSelection={handleSelection} />
        </div>
      )}
    </div>
  );
}

export default SelectionButton;
