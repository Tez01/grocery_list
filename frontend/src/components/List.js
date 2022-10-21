import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import Utilities from "./Utilities";
import List from "./ListItems";
import {
  testGetReactComponents,
  getTimestamp,
  getCurrentItems,
  getCookie,
  updateData,
  deleteData,
} from "../utils";
import axios from "axios";
// CSRF token for post request
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value;
const Add = () => {
  // Create a state variable to add list elements dynamically
  const [listItems, updateListItems] = useState([]);
  const stateRef = useRef();
  stateRef.current = listItems;

  // This useEffect hook will only run once so as to fetch data from database,
  // on first time this component is rendered.
  useEffect(() => {
    // Get current list items from database
    const fetchData = async () => {
      const currentListItems = await fetch("api/");
      return currentListItems;
    };

    const currentListItems = fetchData()
      .then((response) => response.json())
      .then((data) => {
        const items = data.data.reverse(); // Because data has a data element
        // Update the state variable for list components
        updateListItems([...listItems, ...items]);
        console.log("Fetched from database");
      });
  }, []);

  // Create a handler for delete task
  const deleteHandler = (e, itemId) => {
    // Prevent submit action of button
    e.preventDefault();
    const csrf = getCookie("CSRF-TOKEN");
    // Filter out the array of list items except the item with this id
    let newItems = stateRef.current.filter((item) => {
      if (item.id === itemId) {
        const response = axios.delete(`api/${itemId}`);
        response
          .then((response) => console.log(response))
          .catch((err) => {
            console.log(err);
          });
        // // Make a delete request to the database for this id
        // const response = deleteData({ id: itemId })
        //   .then((response) => console.log(response))
        //   .catch((err) => {
        //     console.log(err);
        //   });
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
      const newListItem = { id: key, text: textInput, purchased: false };
      let newArr = [newListItem, ...listItems];
      // Update the state
      updateListItems(newArr);
      // Make a post request to the backend to add this item

      const sendData = async () => {
        const response = await axios.post("api/", JSON.stringify(newListItem));

        return response;
      };
      sendData()
        .then((response) => console.log(response))
        .catch((err) => {
          console.log(err);
        });

      //////////////////// Make a test which clicks the button when empty and very long strings ///////////
    }
  };

  // Add handler for purchased button
  const purchaseHandler = (e, itemId) => {
    // Prevent submit action of button
    e.preventDefault();

    let newPurchaseStatus = null;
    let textInput = null;
    // Filter out the array of list items except the item with this id
    let newItems = stateRef.current.map((item) => {
      // Toggle visibility and editable if id matches
      if (item.id === itemId) {
        if (item.purchased === true) {
          item.purchased = false;
          newPurchaseStatus = false;
        } else {
          item.purchased = true;
          newPurchaseStatus = true;
        }

        // Get text input
        textInput = item.text;

        // Create new element with purchased field changed
        let newElement = {
          id: itemId,
          text: textInput,
          purchased: item.purchased,
        };

        // Make request to database to update data

        return newElement;
      }

      return item;
    });

    updateListItems(newItems);

    updateData({ id: itemId, text: textInput, purchased: newPurchaseStatus })
      .then((response) => console.log(response))
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandler = (itemId, newValue) => {
    // Only accept valid input
    if (!/^\s*$/.test(newValue)) {
      let newListItems = listItems.map((item) => {
        if (item.id === itemId) {
          let newElement = {
            id: itemId,
            text: newValue,
            // Again make purchased to false(This is just extra security which is redundant,
            // because edit button won't be pressed when purchased)
            purchased: false,
          };
          // Make a PUT request to database
          const response = updateData(newElement);
          response
            .then((response) => console.log(response))
            .catch((err) => {
              console.log(err);
            });
          return newElement;
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
