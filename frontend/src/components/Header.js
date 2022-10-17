import React, { useState } from "react";

// function: getDate
// Returns : Todays date in string format
function getDate() {
  const datetime = new Date();
  const month = datetime.toLocaleString("default", { month: "short" });
  const date = `${datetime.getDate()} ${month},${datetime.getFullYear()}`;

  return date;
}

function Header() {
  // Get today's date
  let currentDate = getDate();
  const [date, changeDate] = useState(`${currentDate}`);
  return (
    <div className="header container">
      <input
        className="header__input fs-primary-heading fw-bold"
        type="text"
        placeholder="Add title..."
      />
      <h3 className="header__date fs-secondary-heading fw-semi-bold">{date}</h3>
    </div>
  );
}

export default Header;
