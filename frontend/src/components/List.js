import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import Utilities from "./Utilities";
import List from "./ListItems";
import {
  testGetReactComponents,
  getTimestamp,
  getCurrentItems,
} from "../utils";

const Add = async () => {
  // Create a state variable to add list elements dynamically
  const [listItems, updateListItems] = useState([]);
  const stateRef = useRef();
  stateRef.current = listItems;

  // This useEffect hook will only run once so as to fetch data from database,
  // on first time this component is rendered.
  useEffect(() => {
    // Get current list items from database
    // const currentListItems = await fetch('api/')

    // Update the state variable for list components
    updateListItems([...listItems, ...currentListItems]);
  }, []);

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

      // Push to current array of components
      let newArr = [
        { id: key, textData: textInput, purchased: false },
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
        if (item.purchased === true) {
          item.purchased = false;
        } else {
          item.purchased = true;
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

  const editHandler = (itemId, newValue) => {
    // Only accept valid input
    if (!/^\s*$/.test(newValue)) {
      let newListItems = listItems.map((item) => {
        if (item.id === itemId) {
          let newElement = {
            id: itemId,
            textData: newValue,
            // Again make purchased to false(This is just extra security which is redundant,
            // because edit button won't be pressed when purchased)
            purchased: false,
          };
          return newElement;
          // Make a PUT request to database
        }
        return item;
      });
      updateListItems(newListItems);
    }
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
        editHandler={editHandler}
      />
      ;
    </div>
  );
};

export default Add;
