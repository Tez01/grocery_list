import React, { useEffect, useState } from "react";

import Header from "./Header";
import List from "./List";
import Edit from "./Edit";
import "../../static/css/grocery_list.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

<<<<<<< HEAD
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
  const listData = [];
  for (let i = 0; i < 10; i++) {
    listData.push(`${i}`);
  }
  const reactComponents = getReactComponents(listData);
  console.log(reactComponents);
}
=======
>>>>>>> main
const GroceryList = () => {
  return (
    <div className="grocery-list container ">
      <Header />
      <List />
    </div>
  );
};
export default GroceryList;

/////// Multiple browser testing for all features /////////////////
