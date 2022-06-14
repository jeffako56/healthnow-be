import React from "react";

function TextField({ value, name, changeHandler }) {
  return (
    <div>
      <label>{name}</label>
      <br />
      <input value={value} onChange={changeHandler} />
    </div>
  );
}

export default TextField;
