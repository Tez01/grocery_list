import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faCircleCheck,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Utilities from "./Utilities";
import { toggleButtonText } from "../utils";

function List({ listItems, purchaseHandler, deleteHandler, editHandler }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    editHandler(value.id, value.textData);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <Utilities edit={edit} submitHandler={submitUpdate} />;
  }
  return (
    <div className="list container">
      {listItems.map((item) => {
        return (
          <div
            className={`list__element ${
              item.purchased ? "item--purchased" : "item--not-purchased"
            }`}
            key={item.id}
            id={item.id}
          >
            <button
              type="button"
              className="list__element__button list__element__button--data bg-primary-color button--hidden"
              onClick={toggleButtonText}
              data-size="0"
            >
              {item.textData}
            </button>
            <button
              type="button"
              className={`list__element__button list__element__button--edit bg-button-save text-primary-color ${
                item.purchased ? "button--unclickable" : "button--clickable"
              }`}
              onClick={() => setEdit({ id: item.id, value: item.textData })}
              // onClick={navigateToEdit}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              type="button"
              className="list__element__button list__element__button--delete bg-button-delete text-primary-color"
              onClick={(e) => deleteHandler(e, item.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button
              type="button"
              className="list__element__button list__element__button--purchased bg-button-accent-2 text-primary-color"
              onClick={(e) => purchaseHandler(e, item.id)}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default List;
