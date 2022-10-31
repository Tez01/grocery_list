import React, { useState } from "react";

// function: getDate
// Returns : Todays date in string format
function getDate() {
  const datetime = new Date();
  const month = datetime.toLocaleString("default", { month: "short" });
  const date = `${datetime.getDate()} ${month},${datetime.getFullYear()}`;

  return date;
}

function logout(e) {
  fetch("logout")
    .then((response) => {
      console.log("Logged out");
      console.log(response);
    })
    .catch((err) => console.log(err));
}
function Header() {
  // Get today's date
  let currentDate = getDate();
  const [date, changeDate] = useState(`${currentDate}`);
  return (
    <header className="header container text-primary-color">
      <h1>Grocery List</h1>
      <a
        href="logout"
        className="bg-accent-1 button--logout button text-color-black"
        onClick={logout}
      >
        Logout
      </a>

      <br></br>
      <h3 className="header__date fs-secondary-heading fw-semi-bold">{date}</h3>
    </header>
  );
}

export default Header;
