import React, { useState } from "react";

const Todolist = (props) => {
  const [hidden, setHidden] = useState("d-none");

  return (
    <span
      onMouseOver={() => {
        setHidden("");
      }}
      onMouseOut={() => {
        setHidden("d-none");
      }}
      onClick={props.click}
      style={{ cursor: "pointer" }}
    >
      <p className="fs-3 m-0">{props.text}</p>
      <i
        onClick={props.click}
        className={`fa-solid fa-x fs-6 text-danger ${hidden}`}
      ></i>
    </span>
  );
};

export default Todolist;
