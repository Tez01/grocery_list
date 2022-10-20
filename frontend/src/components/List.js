import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faCircleCheck,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import { toggleButtonText } from "../utils";

function List({ listItems, purchaseHandler, deleteHandler }) {
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
            purchased={item.visibility}
            editable={item.visibility}
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
// By default this function sets the item class as not purchased and set the data purchased property to 0(not purchased)
// data size is set 0 as well for input button
const reactListElement = (
  key,
  data,
  navigateToEdit,
  deleteHandler,
  purchasedHandler,
  visibility,
  editable
) => {
  return (
    <div
      className={`list__element ${
        item.purchased ? "item--purchased" : "item--not-purchased"
      }`}
      key={key}
      id={key}
    >
      <button
        type="button"
        className="list__element__button list__element__button--data bg-primary-color button--hidden"
        onClick={toggleButtonText}
        data-size="0"
      >
        {data}
      </button>
      <button
        type="button"
        className={`list__element__button list__element__button--edit bg-button-save text-primary-color ${
          item.purchased ? "button--clickable" : "button--unclickable"
        }`}
        onClick={navigateToEdit}
      >
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button
        type="button"
        className="list__element__button list__element__button--delete bg-button-delete text-primary-color"
        onClick={(e) => deleteHandler(e, key)}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      <button
        type="button"
        className="list__element__button list__element__button--purchased bg-button-accent-2 text-primary-color"
        onClick={(e) => purchasedHandler(e, key)}
      >
        <FontAwesomeIcon icon={faCircleCheck} />
      </button>
    </div>
  );
};
export default List;
