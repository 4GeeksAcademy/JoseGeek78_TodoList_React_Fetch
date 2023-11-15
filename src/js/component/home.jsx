import React, { useState } from "react";

const Todolist = (todo) => {
	const [hidden, setHidden] = useState("d-none")
	return <span onMouseOver={()=>{setHidden("")}} onMouseOut={()=>{setHidden("d-none")}}>
        <p className="fs-3 m-0">{todo.text}</p>
        <i onClick={todo.click} className={`fa-solid fa-x fs-6 text-danger ${hidden}`}></i>
        </span>
}

export default Todolist;
