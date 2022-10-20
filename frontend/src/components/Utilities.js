import React, { useEffect, useState, useRef } from "react";

function Utilities({ edit, submitHandler }) {
  const [input, setInput] = useState(edit ? edit.value : "");
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitHandler({
      id: edit.id,
      textData: input,
    });
    setInput("");
  };
  return (
    <div className="utilities container">
      {edit ? (
        <>
          <form className="utilities__form" onSubmit={handleSubmit}>
            <input
              className="utilities__form__input fs-body fw-regular"
              type="text"
              placeholder="Update item..."
              value={input}
              onChange={handleChange}
            />
            <button className="utilities__form__button fs-button fw-semi-bold bg-accent-1">
              Update
            </button>
          </form>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default Utilities;
