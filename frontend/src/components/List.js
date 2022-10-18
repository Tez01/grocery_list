import React, { useEffect } from "react";

function getCurrentItems() {}

function List({ components }) {
  useEffect(() => {
    console.log("effect");
    console.log(components);
  }, [components]);

  return <div className="list container">{components}</div>;
}

export default List;
