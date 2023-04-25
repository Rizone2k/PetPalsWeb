import React from "react";

function Input(props) {
  return (
    <div>
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        required={props.required}
        onChange={props.onChange ? (e) => props.onChange(e) : null}
      />
    </div>
  );
}

export default Input;
