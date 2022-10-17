import React from "react";
import List from "./List";
import Title from "./Title";
import Utilities from "./Utilities";
function GroceryList() {
  return (
    <div className="grocerylist">
      <Title />
      <Utilities />
      <List />
    </div>
  );
}

export default GroceryList;
