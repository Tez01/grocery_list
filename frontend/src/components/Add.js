import React, { useState, useEffect, useRef } from "react";
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

    // // Get the parent element for this delete button
    const parentElement = e.target.parentElement;
    if (parentElement != null) {
      // Filter out the array of list items except the item with this id
      let newItems = stateRef.current.filter((item) => {
        return item.props.id !== itemId;
      });

      updateListItems(newItems);
    }
  };

  // Create a handler for input form submission
  const addItem = (e) => {
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
      // Convert to react component
      const reactComponent = reactListElement(
        textInput,
        navigateToEdit,
        deleteHandler
      );

      // Push to current array of components
      let newArr = [...listItems, reactComponent];
      // Update the state
      updateListItems(newArr);
      // Make a post request to the backend

      //////////////////// Make a test which clicks the button when empty and very long strings ///////////
    }
  };

  //   // Add handler for purchased button
  //   const purchasedHandler = (e,itemId) => {
  // // Prevent submit action of button
  // e.preventDefault();

  // // Get the parent element for this purchase button
  // const parentElement = e.target.parentElement;
  // if (parentElement != null) {
  //   // Filter out the array of list items except the item with this id
  //   let newItems = stateRef.current.map((item) => {
  //       if(item.props.id == itemId){
  //         // If item is not purchased, make it purchased
  //         if(parentElement.dataset.purchased == "0"){

  //         parentElement.classList.remove("item--not-purchased");
  //         parentElement.classList.add("item--purchased")
  //         parentElement.dataset.purchased = "1"
  //         }
  //         else{
  //           // If item is purchased, make it unpurchased
  //             parentElement.classList.remove("item--purchased");
  //             parentElement.classList.add("item--not-purchased")
  //             parentElement.dataset.purchased = "0"

  //       };
  //       return item;

  //       }

  // }
  //   }

  return (
    <div className="Add">
      {/* Pass the above submitHandler as prop to Utilities,
      so that when form in utilities is submitted it runs this function*/}
      <Utilities submitHandler={addItem} />;
      {/* Pass the above state variable of lists as prop to List */}
      <List listItems={listItems} />;
    </div>
  );
};

export default Add;
