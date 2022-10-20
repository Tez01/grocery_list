import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
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
import { useNavigate } from "react-router-dom";

const Add = () => {
  // Create a state variable to add list elements dynamically
  const [listItems, updateListItems] = useState([]);
  const stateRef = useRef();
  stateRef.current = listItems;

  // This useEffect hook will only run once so as to fetch data from database,
  // on first time this component is rendered.
  useEffect(() => {
    // Get current list items from database
    const currentListItems = getCurrentItems();

    // Convert these to React Components
    let reactComponents = Array.from(getReactComponents(currentListItems));
    // Update the state variable for list components
    updateListItems([...listItems, ...reactComponents]);
  }, []);

  // Create handler for edit button clicked
  const navigate = useNavigate();
  const navigateToEdit = (e) => {
    e.preventDefault();

    try {
      navigate("/edit", {
        replace: true,
        state: {
          listItems: stateRef.current,
          updateListItems: updateListItems,
          target: e.target.parentElement,
          navigateToEdit: navigateToEdit,
        },
      });
    } catch {
      console.log("Error");
    }
  };

  // Create a handler for delete task
  const deleteHandler = (e, itemId) => {
    // Prevent submit action of button
    e.preventDefault();

    // Filter out the array of list items except the item with this id
    let newItems = stateRef.current.filter((item) => {
      if (item.id === itemId) {
        // Make a delete request to the database for this id
      }
      return item.id !== itemId;
    });

    updateListItems(newItems);
  };

  // Create a handler for input form submission
  const addHandler = (e) => {
    // Prevent from submission of form
    e.preventDefault();
    // Get data from input
    const inputElement = document.querySelector(".utilities__form__input");
    const textInput = inputElement.value;

    /////////// Test here more for inputs ///////////
    // Convert to react element if input is not conatining only spaces and updateComponent list
    if (!/^\s*$/.test(textInput)) {
      // Clear the input field
      inputElement.value = "";

      // Get a unique id from timestamp
      const key = getTimestamp();
      // item visibility = 1 (for unpurchased)
      const visibility = 1;
      const editable = 1;
      // Convert to react component
      // const reactComponent = reactListElement(
      //   key,
      //   textInput,
      //   navigateToEdit,
      //   deleteHandler,
      //   purchasedHandler,
      //   visibility,
      //   editable
      // );

      // Push to current array of components
      let newArr = [
        { id: key, textData: textInput, purchased: 0 },
        ...listItems,
      ];
      // Update the state
      updateListItems(newArr);
      // Make a post request to the backend to add this item with textInput and key and visibility = 1

      //////////////////// Make a test which clicks the button when empty and very long strings ///////////
    }
  };

  // Add handler for purchased button
  const purchaseHandler = (e, itemId) => {
    // Prevent submit action of button
    e.preventDefault();

    // Filter out the array of list items except the item with this id
    let newItems = stateRef.current.map((item) => {
      // Toggle visibility and editable if id matches
      if (item.id === itemId) {
        if (item.purchased === 1) {
          item.purchased = 0;
        } else {
          item.purchased = 1;
        }

        // Get text input
        const textInput = item.textData;
        let newElement = {
          id: itemId,
          textData: textInput,
          purchased: item.purchased,
        };
        return newElement;
      }

      return item;
    });
    updateListItems(newItems);
  };

  return (
    <div className="Add">
      {/* Pass the above submitHandler as prop to Utilities,
      so that when form in utilities is submitted it runs this function*/}
      <Utilities submitHandler={addHandler} />;
      {/* Pass the above state variable of lists as prop to List */}
      <List
        listItems={listItems}
        purchaseHandler={purchaseHandler}
        deleteHandler={deleteHandler}
      />
      ;
    </div>
  );
};

export default Add;
