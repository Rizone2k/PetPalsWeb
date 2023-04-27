import React from "react";
import "./adsCard.scss";

function AdsCard(props) {
  return (
    <div className="w-2/6 flex flex-col border-[#FEC285] border-[3px] px-2 md:px-5 py-5 rounded-[15px] flex-wrap justify-center items-center flex-grow">
      {props.children}
      <span className="font-semibold py-5 text-xs md:text-base text-center">
        {props.title}
      </span>
      <p className="font-medium max-md:hidden overview">{props.content}</p>
    </div>
  );
}
export default AdsCard;
