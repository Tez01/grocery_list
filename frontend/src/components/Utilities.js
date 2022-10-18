import React from "react";

function Utilities({ submitHandler }) {
  return (
    <div className="utilities container">
      <form className="utilities__form" onSubmit={submitHandler}>
        <input
          className="utilities__form__input fs-body fw-regular"
          type="text"
          placeholder="Add new item..."
        ></input>
        <button className="utilities__form__button fs-button fw-semi-bold bg-accent-1">
          Add
        </button>
      </form>
    </div>
  );
}

export default Utilities;
