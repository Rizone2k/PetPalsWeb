import React from "react";

export default function Title(props) {
  return (
    <div className="flex flex-row justify-center items-center gap-5 py-5">
      <img className="" src={require("~/assets/icon-title.png")} alt="icon" />
      <span className="md:text-xl font-semibold sm:text-base ">
        {props.title}
      </span>
      <img className="" src={require("~/assets/icon-title.png")} alt="icon" />
    </div>
  );
}
