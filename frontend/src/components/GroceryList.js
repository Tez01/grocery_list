import React, { useEffect, useState } from "react";

import Header from "./Header";
import List from "./List";
import Edit from "./Edit";
import "../../static/css/grocery_list.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const GroceryList = () => {
  return (
    <div className="grocery-list container ">
      <Header />
      <List />
    </div>
  );
};
export default GroceryList;

/////// Multiple browser testing for all features /////////////////
