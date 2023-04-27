import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

function Button(props) {
  return (
    <button
      type={props.type}
      className={`btn ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
      title={props.title}
    >
      {props.children}
    </button>
  );
}

export function OutlineButton(props) {
  return (
    <Button
      type={props.type}
      className={`btn-outline ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
