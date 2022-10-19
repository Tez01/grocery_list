import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Function: getTimestamp
// Returns : The string for current datetime in timestamp format which can be used as unique identifier.
// (ms accuracy)
///////////////////Write a testing function to simulate clicks very fast and check timestamps//////////////////
function getTimestamp() {
  let d = new Date();
  let timestamp = d.getTime();
  return `${timestamp}`;
}

// Function: toggleButtonText
//           Toggles text between expanded or hidden view
// Arguments: Takes in the event property.
function toggleButtonText(e) {
  // Whenever the button is clicked toggle the class between button--hidden and button--expand
  // based on the current data attribute of element. This would expand the text inside.
  // See these classes in grocery_list.css
  /////////////////////// Write test to see this functionality ///////////////////////////////
  const targetElement = e.target;
  if (targetElement.data == "0") {
    targetElement.classList.remove("button--hidden");
    targetElement.classList.add("button--expand");
    targetElement.data = "1";
  } else {
    targetElement.classList.remove("button--expand");
    targetElement.classList.add("button--hidden");
    targetElement.data = "0";
  }
}

const reactListElement = (data, navigateToEdit) => {
  const key = getTimestamp();
  return (
    <div className="list__element " key={key} id={key}>
      <button
        type="button"
        className="list__element__button list__element__button--data bg-primary-color button--hidden"
        onClick={toggleButtonText}
        data="0"
      >
        {data}
      </button>
      <button
        type="button"
        className="list__element__button list__element__button--edit bg-button-save text-primary-color"
        onClick={navigateToEdit}
      >
        Edit
      </button>
      <button
        type="button"
        className="list__element__button list__element__button--delete bg-button-delete text-primary-color"
      >
        Delete
      </button>
    </div>
  );
};

// function: getCurrentItems
// Returns : Fetches the list of current list items from database. Returns an object of lists
function getCurrentItems() {
  return [];
}

// function: getReactComponents
//           This function takes in a list of data elements and returns a list of
//           react list components filled with that data
function getReactComponents(listOfComponents) {
  const reactComponents = [];
  for (let i = 0; i < listOfComponents.length; i++) {
    /////////////// if data in list component is empty
    reactComponents.push(reactListElement(listOfComponents[i], i));
  }
  return reactComponents;
}

// testGetReactComponents
function testGetReactComponents() {
  const listData = [];
  for (let i = 0; i < 10; i++) {
    listData.push(`${i}`);
  }
  const reactComponents = getReactComponents(listData);
  console.log(reactComponents);
}

export {
  testGetReactComponents,
  getReactComponents,
  reactListElement,
  toggleButtonText,
  getTimestamp,
  getCurrentItems,
};
