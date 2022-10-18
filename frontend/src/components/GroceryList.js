import React, { useState } from "react";
import List from "./List";
import Header from "./Header";
import Utilities from "./Utilities";
import "../../static/css/grocery_list.css";

// function: getCurrentItems
// Returns : Fetches the list of current list items from database. Returns an object of lists
function getCurrentItems() {
  return [];
}

function GroceryList() {
  // Get current list items from database
  const currentListItems = getCurrentItems();

  const reactComponents = [<div>apke</div>, <h1>Appe</h1>];
  if (currentListItems.length != 0) {
    console.log("Converting to react list items");
    // Convert these to React Components

    const reactComponents = getListComponents(currentListItems);
  }

  // Create a state variable for lists, initialize with the current list items
  const [components, updateComponents] = useState(reactComponents);

  // // Create a click handler that will update the component list at each button click for add button
  // const clickHandler =(components, updateComponents)=>{

  //   const textInput = document.querySelector(".utilities__form__input").value

  // }
  return (
    <div className="grocery-list container ">
      <Header />

      {/* Pass the above state variable of lists as prop to Utilities,
      so that when add button in utilities is clicked, the related event listener
      updates this state variable of lists*/}
      <Utilities />
      {/* Pass the above state variable of lists as prop to List */}
      <List components={components} />
    </div>
  );
}

export default GroceryList;
