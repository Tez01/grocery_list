import React, { useState, useEffect } from "react";
import Utilities from "./Utilities";
import List from "./List";
import {
  testGetReactComponents,
  getReactComponents,
  reactListElement,
  toggleButtonText,
  getTimestamp,
  getCurrentItems,
} from "../utils";
const Add = () => {
  // Create a state variable to add list elements dynamically
  const [components, updateComponents] = useState([]);

  // This useEffect hook will only run once so as to fetch data from database,
  // on first time this component is rendered.
  useEffect(() => {
    // Get current list items from database
    const currentListItems = getCurrentItems();

    // Convert these to React Components
    let reactComponents = Array.from(getReactComponents(currentListItems));
    // Update the state variable for list components
    updateComponents([...components, ...reactComponents]);
  }, []);

  // Create a handler for edit button click
  const editClickHandler = (e) => {
    // Prevent default behavior
    e.preventDefault;

    // Navigate to edit page with this element as input.
  };
  // Create a handler for input form submission
  const submitHandler = (e) => {
    // Prevent from submission of form
    e.preventDefault();
    // Get data from input
    const inputElement = document.querySelector(".utilities__form__input");
    const textInput = inputElement.value;
    // Convert to react element if input is not null and updateComponent list
    if (textInput != "") {
      // Clear the input field
      inputElement.value = "";
      // Convert to react component
      const reactComponent = reactListElement(textInput, 45);

      // Push to current array of components
      let newArr = [...components, reactComponent];
      // Update the state
      updateComponents(newArr);

      // Make a post request to the backend

      //////////////////// Make a test which clicks the button when empty and very long strings ///////////
    }
  };
  return (
    <div className="Add">
      {/* Pass the above submitHandler as prop to Utilities,
      so that when form in utilities is submitted it runs this function*/}
      <Utilities submitHandler={submitHandler} />;
      {/* Pass the above state variable of lists as prop to List */}
      <List components={components} />;
    </div>
  );
};

export default Add;
