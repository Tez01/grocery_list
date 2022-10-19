import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getReactComponents } from "../utils";
import { reactListElement } from "../utils";
import "../../static/css/edit.css";
const Edit = () => {
  const { state } = useLocation();
  const { components, updateComponents, target, navigateToEdit } = state;
  console.log(components, target);
  const navigate = useNavigate();
  const update = () => {
    console.log("In");
    const inputValue = document.querySelector(".edit__input").value;
    console.log(inputValue);
    for (let i = 0; i < components.length; i++) {
      console.log(components[i].props.id, target.id);
      if (components[i].props.id == target.id) {
        components.splice(i, 1);
        components.splice(i, 0, reactListElement(inputValue, navigateToEdit));

        console.log(components);
      }
    }
    updateComponents([...components]);
    navigate("/");
  };

  return (
    <div className="edit">
      <input
        className="edit__input"
        type="text"
        defaultValue={target.firstChild.innerText}
        autoFocus
      />
      <button className="bg-button-save edit__button" onClick={update}>
        Done
      </button>
    </div>
  );
};

export default Edit;
