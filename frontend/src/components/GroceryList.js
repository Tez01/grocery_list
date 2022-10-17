import React from "react";
import List from "./List";
import Header from "./Header";
import Utilities from "./Utilities";
import "../../static/css/grocery_list.css";
function GroceryList() {
  return (
    <div className="grocery-list container">
      <Header />
      <Utilities />
      <List />
    </div>
  );
}

export default GroceryList;
