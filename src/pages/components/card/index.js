import React from "react";
import {
  FaDollarSign,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaMercury,
} from "react-icons/fa";
import "./card.scss";
import { Link } from "react-router-dom";
import capitalizeAllWords from "../handleString";
import Tippy from "@tippyjs/react";

export default function Card(props) {
  return (
    <div
      key={props.id}
      className="my-1 px-1 sm:px-5 w-1/2 md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 2xl:w-1/5"
    >
      <article className="shadow-custom overflow-hidden rounded-lg shadow-lg h-full">
        <Link
          to={
            props.sex
              ? `/detail/pet/${props.id}`
              : `/detail/product/${props.id}`
          }
        >
          <img
            alt="Placeholder"
            className="block max-h-60 object-cover w-full mx-auto object-center"
            src={props.src}
          />
        </Link>
        <div className="bg-gradient-to-r from-[#ff510c] to-[#ff8800] h-full mt-1">
          <header className="text-white flex flex-col items-start gap-1 justify-between leading-tight p-1 md:p-4">
            <h1 className="text-base">
              <Link
                to={
                  props.sex
                    ? `/detail/pet/${props.id}`
                    : `/detail/product/${props.id}`
                }
              >
                <Tippy placement="bottom" content={props.name}>
                  <b className="overview">{capitalizeAllWords(props.name)}</b>
                </Tippy>
              </Link>
            </h1>
            <ul>
              {props.from && (
                <li className="flex flex-row items-start p-2">
                  <FaInfoCircle></FaInfoCircle>
                  <p className="text-sm pl-2">{props.from}</p>
                </li>
              )}
              <li className="flex flex-row items-start p-2">
                <FaMapMarkerAlt></FaMapMarkerAlt>
                <p className="text-sm pl-2">Đà Nẵng</p>
              </li>
              {props.sex && (
                <li className="flex flex-row items-start p-2">
                  <FaMercury></FaMercury>
                  <p className="text-sm pl-2">{props.sex}</p>
                </li>
              )}
              <li className="flex flex-row items-start p-2">
                <FaDollarSign></FaDollarSign>
                <p className="text-sm pl-2">{props.price}</p>
              </li>
            </ul>
          </header>
        </div>
      </article>
    </div>
  );
}
