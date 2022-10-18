import React, { useEffect, useState } from "react";
import List from "./List";
import Header from "./Header";
import Utilities from "./Utilities";
import "../../static/css/grocery_list.css";

// Function: getTimestamp
// Returns : The string for current datetime in timestamp format which can be used as unique identifier.
// (ms accuracy)
///////////////////Write a testing function to simulate clicks very fast and check timestamps//////////////////
function getTimestamp() {
  let d = new Date();
  let timestamp = d.getTime();
  return `${timestamp}`;
}
// React list element
const reactListElement = (data) => {
  return (
    <div className="list__element" key={getTimestamp()}>
      <h3>{data}</h3>
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
const GroceryList = () => {
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

  // Create a click handler that will update the component list at each button click for add button
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
      console.log(reactComponent);
      // Push to current array of components
      let newArr = [...components, reactComponent];
      // Update the state
      updateComponents(newArr);

      // Make a post request to the backend
    }
  };
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
