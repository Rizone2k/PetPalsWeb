import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import {
  FaBars,
  FaEllipsisV,
  FaRegBell,
  FaSearch,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import "./header.scss";

function Header() {
  const [navbar, setNavbar] = useState(false);
  const [tooltipContent, setTooltipContent] = useState(false);
  const [navbarShow, setNavbarShow] = useState(false);
  console.log("------------------------------------");
  console.log(navbarShow);
  console.log("------------------------------------");

  const showNavbar = () => {
    setNavbarShow(!navbarShow);
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavbar(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <Tooltip
        html={
          <div>
            <p>{tooltipContent}</p>
            <input
              type="text"
              value={tooltipContent}
              onChange={(e) => {
                setTooltipContent(e.target.value);
              }}
            />
          </div>
        }
        position="bottom"
        trigger="click"
      >
        <p>Click here to show popup</p>
      </Tooltip>
      <nav
        className={`${
          navbar ? "sticked" : ""
        } z-10 flex px-5 py-4 border-t-8 border-pink-500 border-nav-top relative`}
      >
        <div className="w-3/6 sm:w-1/6 flex items-center gap-1">
          <img width="50px" src={require("~/assets/logo192.png")} alt="" />
          <h3 className="border-nav-top_logo text-2xl font-extrabold">
            PetPals
          </h3>
        </div>
        <ul className="w-1/6 lg:w-2/6"></ul>
        {/* Show for PC */}
        <div className="w-4/6 navbar-pc flex flex-row items-center justify-between">
          <ul className=" w-4/6 sm:w-5/6 flex flex-row items-center justify-between mr-10 ">
            <Tooltip title="Home" position="bottom" trigger="mouseenter">
              <li>
                <Link to="/">
                  <b>Home</b>
                </Link>
              </li>
            </Tooltip>
            <Tooltip title="Chó" position="bottom" trigger="mouseenter">
              <li>
                <Link to="/about">
                  <b>Chó</b>
                </Link>
              </li>
            </Tooltip>
            <Tooltip title="Mèo" position="bottom" trigger="mouseenter">
              <li>
                <Link to="/cat">
                  <b>Mèo</b>
                </Link>
              </li>
            </Tooltip>
            <li>
              <div className="dropdown inline-block relative">
                <button className="py-2 rounded inline-flex items-center">
                  <span className="mr-1">
                    <b>Phụ kiện</b>
                  </span>
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                  </svg>
                </button>
                <ul className="bg-slate-100 dropdown-menu hidden absolute rounded">
                  <li className="">
                    <a
                      className="rounded-t py-2 px-4 block whitespace-no-wrap"
                      href="/"
                    >
                      One
                    </a>
                  </li>
                  <li className="">
                    <a className="py-2 px-4 block whitespace-no-wrap" href="/">
                      Two
                    </a>
                  </li>
                  <li className="">
                    <a
                      className="rounded-b py-2 px-4 block whitespace-no-wrap"
                      href="/"
                    >
                      Three
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <Tooltip title="Thức ăn" position="bottom" trigger="mouseenter">
              <li>
                <Link to="/cat">
                  <b>Thức ăn</b>
                </Link>
              </li>
            </Tooltip>
          </ul>
          <ul className="w-1/6 sm:w-2/6 flex flex-row items-center justify-around">
            <Tooltip title="Search" position="bottom" trigger="mouseenter">
              <li>
                <FaSearch />
              </li>
            </Tooltip>
            <Tooltip title="Notices" position="bottom" trigger="mouseenter">
              <li className="relative inline-block">
                <div className="notice-bell">
                  <FaRegBell />
                </div>
              </li>
            </Tooltip>
            <Tooltip title="Profile" position="bottom" trigger="mouseenter">
              <li>
                <FaUserCircle />
              </li>
            </Tooltip>
            <li>
              <FaEllipsisV />
            </li>
          </ul>
        </div>
        {/* show for mobile */}
        <div className={`${navbarShow ? "navbar-show nav-btn" : "hidden"}`}>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={showNavbar}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <ul className="w-2/6">
                    <li>
                      <FaSearch />
                    </li>

                    <li>
                      <FaRegBell />
                    </li>

                    <li>
                      <FaUserCircle />
                    </li>
                    <li>
                      <FaEllipsisV />
                    </li>
                  </ul>
                  <div className="flex justify-center items-center">
                    <ul className=" w-4/6">
                      <li>
                        <Link to="/">
                          <b>Home</b>
                        </Link>
                      </li>
                      <li>
                        <Link to="/about">
                          <b>Chó</b>
                        </Link>
                      </li>
                      <li>
                        <Link to="/cat">
                          <b>Mèo</b>
                        </Link>
                      </li>
                      <li>
                        <div className="dropdown inline-block relative">
                          <button className="py-2 rounded inline-flex items-center">
                            <span className="mr-1">
                              <b>Phụ kiện</b>
                            </span>
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                            </svg>
                          </button>
                          <ul className="bg-slate-100 dropdown-menu hidden absolute rounded">
                            <li className="">
                              <a
                                className="rounded-t py-2 px-4 block whitespace-no-wrap"
                                href="/"
                              >
                                One
                              </a>
                            </li>
                            <li className="">
                              <a
                                className="py-2 px-4 block whitespace-no-wrap"
                                href="/"
                              >
                                Two
                              </a>
                            </li>
                            <li className="">
                              <a
                                className="rounded-b py-2 px-4 block whitespace-no-wrap"
                                href="/"
                              >
                                Three
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <Link to="/cat">
                          <b>Thức ăn</b>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={showNavbar}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={showNavbar}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
        <div className="w-2/6 lg:hidden md:hidden sm:hidden flex justify-end items-center ">
          <button className="nav-btn " onClick={showNavbar}>
            <FaBars />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Header;
