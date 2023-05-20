import React from "react";
import { FaInfo, FaRegHeart } from "react-icons/fa";
import "./card.scss";
import { Link } from "react-router-dom";
import capitalizeAllWords from "../handleString";
import Tippy from "@tippyjs/react";

export default function Card(props) {
  return (
    <div
      key={props.id}
      className="my-1 p-2 sm:px-7 w-1/2 md:w-1/3 lg:my-4 lg:px-5 lg:w-1/4 2xl:w-1/5 relative"
    >
      <article className="overflow-hidden rounded-lg shadow-lg shadow-custom h-full p-1.5 ">
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
        <div className="mt-1 h-40">
          <header className="text-black flex flex-col items-start gap-1 justify-between leading-tight p-3 md:p-4 absolute bottom-2 transform sm:translate-x-[-1%] md:translate-x-[-4%] w-5/6">
            <h1 className="text-base overview h-9">
              <Link
                to={
                  props.sex
                    ? `/detail/pet/${props.id}`
                    : `/detail/product/${props.id}`
                }
              >
                <Tippy placement="bottom" content={props.name}>
                  <b className="overview text-sm">
                    {capitalizeAllWords(props.name)}
                  </b>
                </Tippy>
              </Link>
            </h1>
            <ul className="w-full">
              {props.from && (
                <li className="flex flex-row items-start py-1">
                  <p className="text-sm overview-one h-5">{props.from}</p>
                </li>
              )}
              <li className="flex flex-row items-start justify-between py-1 w-ful">
                <p className="text-sm">Đà Nẵng</p>
              </li>
              <li className="flex flex-row items-start justify-between py-1 w-ful">
                <p className="flex flex-row items-center">
                  <b className="text-sm text-[#2eb0d8]">
                    {props.price.toLocaleString()}đ
                  </b>
                </p>
                <Tippy placement="bottom" content="Yêu thích">
                  <p>
                    <FaRegHeart className="hover:text-[#fd3556]"></FaRegHeart>
                  </p>
                </Tippy>
              </li>
            </ul>
          </header>
        </div>
      </article>
    </div>
  );
}
