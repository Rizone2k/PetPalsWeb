import React from "react";
import {
  FaDollarSign,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaMercury,
} from "react-icons/fa";

export default function Card(props) {
  return (
    <>
      <div className="my-1 px-20 sm:px-5 w-full sm:w-1/2 md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 2xl:w-1/5">
        <article className="overflow-hidden rounded-lg shadow-lg h-full">
          <a className="" href="/">
            <img
              alt="Placeholder"
              className="block max-h-60 object-cover w-full mx-auto object-center"
              src={props.src}
            />
          </a>
          <div className="bg-gradient-to-r from-[#ff510c] to-[#ff8800] h-full mt-1">
            <header className="text-white flex flex-col items-start gap-3 justify-between leading-tight p-2 md:p-4">
              <h1 className="text-base">
                <a className="no-underline hover:underline" href="/">
                  {props.name}
                </a>
              </h1>
              <ul>
                <li className="flex flex-row items-start p-2">
                  <FaInfoCircle></FaInfoCircle>
                  <p className="text-sm pl-2">{props.from}</p>
                </li>
                <li className="flex flex-row items-start p-2">
                  <FaMapMarkerAlt></FaMapMarkerAlt>
                  <p className="text-sm pl-2">{props.from}</p>
                </li>
                <li className="flex flex-row items-start p-2">
                  <FaMercury></FaMercury>
                  <p className="text-sm pl-2">{props.from}</p>
                </li>
                <li className="flex flex-row items-start p-2">
                  <FaDollarSign></FaDollarSign>
                  <p className="text-sm pl-2">{props.price}</p>
                </li>
              </ul>
            </header>
            <footer className="text-white flex items-center justify-between px-3">
              <a className="text-blue-600 text-lg" href="/">
                Mua
                <i className="fa fa-heart"></i>
              </a>
            </footer>
          </div>
        </article>
      </div>
    </>
  );
}
