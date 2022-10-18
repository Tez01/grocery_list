import React, { useState } from "react";
import List from "./List";
import Header from "./Header";
import Utilities from "./Utilities";
import "../../static/css/grocery_list.css";

// React list element
const reactListElement = (data) => {
  return (
    <div className="list__element">
      <h3>data.text</h3>
      <button>Edit</button>
      <button>Delete</button>
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
    reactComponents.push(reactListElement(listOfComponents[i]));
  }
  return reactComponents;
}

// testGetReactComponents
function testGetReactComponents() {
  listData = [];
  for (let i = 0; i < 10; i++) {
    listData.push(`${i}`);
  }
  const reactComponents = getReactComponents(listData);
  console.log(reactComponents);
}
const GroceryList = () => {
  // Get current list items from database
  const currentListItems = getCurrentItems();

  // Convert these to React Components
  const reactComponents = getReactComponents(currentListItems);

  // Create a state variable for lists, initialize with the current react components
  const [components, updateComponents] = useState(reactComponents);

  // Create a click handler that will update the component list at each button click for add button
  const submitHandler = (e) => {
    // Prevent from submission of form
    e.preventDefault();
    // Get data from input
    const textInput = document.querySelector(".utilities__form__input").value;
    // Convert to react element if input is not null and updateComponent list
    if (textInput != "") {
      const textInputArray = Array(textInput);
      console.log(textInput);
      currentListItems.push(textInput);
      // Convert to react component
      const reactComponent = getReactComponents(textInputArray);

      // Push to current array of components
      reactComponents.push(reactComponent);

      // Update the state
      updateComponents(reactComponents);

      // Make a post request to the backend
    }
  };
  testGetReactComponents();
  return (
    <div className="grocery-list container ">
      <Header />

      {/* Pass the above submitHandler as prop to Utilities,
      so that when form in utilities is submitted it runs this function*/}
      <Utilities submitHandler={submitHandler} />
      {/* Pass the above state variable of lists as prop to List */}
      <List components={components} />
    </div>
  );
};

export default GroceryList;
