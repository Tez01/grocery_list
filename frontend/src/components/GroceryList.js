import React, { useEffect, useState } from "react";

import Header from "./Header";
import Add from "./Add";
import Edit from "./Edit";
import "../../static/css/grocery_list.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Create a router that would route to edit page on edit button click, keeping the header fixed
const router = createBrowserRouter([
  {
    path: "/",
    element: <Add />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
]);
const GroceryList = () => {
  return (
    <div className="grocery-list container ">
      <Header />

      {/* This would dynamically switch between edit and add page */}
      <RouterProvider router={router} />
    </div>
  );
};
export default GroceryList;

/////// Multiple browser testing for all features /////////////////
