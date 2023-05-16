import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Tippy, { tippy } from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  FaBars,
  FaCat,
  FaDog,
  FaEllipsisV,
  FaGifts,
  FaHome,
  FaHotdog,
  FaRegBell,
  FaSearch,
  FaUserCircle,
  FaAngleDoubleRight,
  FaDoorOpen,
  FaAddressCard,
  FaShoppingBasket,
  FaHandHoldingHeart,
} from "react-icons/fa";
import "./header.scss";
import petPalsAPI from "~/api/petPalsAPI";
import { currentCartSelector, isLoggedInSelector } from "~/redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "~/redux/reducers/auth";
import { unwrapResult } from "@reduxjs/toolkit";

function Header() {
  const [itemDog, setItemDog] = useState([]);
  const [itemCat, setItemCat] = useState([]);
  const isLogin = useSelector(isLoggedInSelector);
  const [navbar, setNavbar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [navbarShow, setNavbarShow] = useState(false);
  const cart = useSelector(currentCartSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showNavbar = () => {
    setNavbarShow(!navbarShow);
  };
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };
  const handleLogOutClick = () => {
    // handleClose();
    dispatch(logout())
      .then(unwrapResult)
      .then(navigate("/profile"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getPet = async (category, pet) => {
      try {
        const param = category;
        const response = await petPalsAPI.getItems(param);
        pet(response.data.data.subitem);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    getPet("64171a3daf4f228ec605d08a", setItemCat);
    getPet("64171a2eaf4f228ec605d087", setItemDog);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavbar(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      {showSearch ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 w-[100vw]">
              {/*content*/}
              <div className="mx-auto border-0 rounded-lg shadow-lg relative flex flex-col w-2/3 lg:w-1/2 bg-[#ffefe1] outline-none focus:outline-none py-12 px-5">
                {/*header*/}
                <div className="flex flex-row items-center border-red-100 border-2 rounded-lg w-full lg:w-4/5 px-2">
                  <h3 className="text-base pr-1 lg:text-2xl font-semibold opacity-60">
                    <FaSearch></FaSearch>
                  </h3>
                  <input
                    type="text"
                    placeholder="Search"
                    className="border-none max-w-xs lg:px-5 py-2"
                  />
                  <button
                    className="text-xl absolute right-0 top-0 text-red-500 font-bold uppercase px-2 lg:px-6 py-2"
                    type="button"
                    onClick={() => handleShowSearch(false)}
                  >
                    X
                  </button>
                </div>
                {/*body*/}
                <div className="relative md:p-6 flex-auto overflow-auto max-h-80">
                  <p> Recent</p>
                  <ul className="flex flex-col gap-3">
                    <li className="py-3 px-2 rounded-md bg-[#89440308] hover:bg-orange-200">
                      <div className="flex flex-row items-center gap-3">
                        <img
                          className="rounded"
                          width={"20%"}
                          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                          alt="Dog"
                        />
                        <p> chó mèo gà vịt</p>
                      </div>
                    </li>
                    <li className="py-3 px-2 rounded-md bg-[#89440308] hover:bg-orange-200">
                      <div className="flex flex-row items-center gap-3">
                        <img
                          className="rounded"
                          width={"20%"}
                          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                          alt="Dog"
                        />
                        <p> chó mèo gà vịt</p>
                      </div>
                    </li>
                    <li className="py-3 px-2 rounded-md bg-[#89440308] hover:bg-orange-200">
                      <div className="flex flex-row items-center gap-3">
                        <img
                          className="rounded"
                          width={"20%"}
                          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                          alt="Dog"
                        />
                        <p> chó mèo gà vịt</p>
                      </div>
                    </li>
                  </ul>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <nav
        className={`${
          navbar ? "sticked" : ""
        } z-10 flex px-5 py-4 border-t-8 border-pink-500 border-nav-top relative`}
      >
        <div className="w-3/6 sm:w-1/6 flex items-center gap-1">
          <img width="50px" src={require("~/assets/logo192.png")} alt="" />
          <h3 className="border-nav-top_logo text-2xl font-extrabold">
            <Link to={"/"}>PetPals</Link>
          </h3>
        </div>
        <ul className="w-1/6 lg:w-2/6"></ul>
        {/* Show for PC */}
        <div className="w-4/6 navbar-pc flex flex-row items-center justify-between">
          <ul className=" w-4/6 sm:w-5/6 flex flex-row items-center justify-around mr-10 ">
            <li className="md:text-base">
              <Link to="/">
                <b>Trang chủ</b>
              </Link>
            </li>
            <li>
              <Link to="/pet/6416ee5c33df1b92e7fb8351">
                <b>Chó</b>
              </Link>
            </li>
            <li>
              <Link to="/pet/6416ee6433df1b92e7fb8354">
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
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                <ul className="bg-[#f7ece0] dropdown-menu hidden absolute rounded shadow-lg shadow-indigo-500/40">
                  <li className="block whitespace-no-wrap border-b border-[#f0bb7e]">
                    <p className="px-2 text-center"> Chó</p>
                    <ul className="rounded hidden w-52 absolute bg-[#f7ece0] shadow-lg shadow-indigo-500/40 left-full top-0">
                      {itemDog &&
                        itemDog.slice(0, 10).map((item, key) => (
                          <Link to={`/products/${item._id}`} key={key}>
                            <li
                              className="block whitespace-no-wrap border-b border-[#f0bb7e]"
                              key={item._id}
                            >
                              <p className="p-2">{item.name}</p>
                            </li>
                          </Link>
                        ))}
                    </ul>
                  </li>
                  <li className="dropdown-new py-2 px-4 block whitespace-no-wrap border-b border-[#f0bb7e]">
                    <p className="px-2 text-center"> Mèo</p>
                    <ul className="rounded w-52 hidden absolute bg-[#f7ece0] shadow-lg shadow-indigo-500/40 left-full top-0">
                      {itemCat &&
                        itemCat.slice(0, 10).map((item, key) => (
                          <Link to={`/products/${item._id}`} key={key}>
                            <li
                              className="block whitespace-no-wrap border-b border-[#f0bb7e]"
                              key={item._id}
                            >
                              <p className="p-2">{item.name}</p>
                            </li>
                          </Link>
                        ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="dropdown inline-block relative">
                <button className="py-2 rounded inline-flex items-center">
                  <span className="mr-1">
                    <b>Thức ăn</b>
                  </span>
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                  </svg>
                </button>
                <ul className="bg-[#f7ece0] dropdown-menu hidden absolute rounded px-2 py-2">
                  <Link to={"/products/64171b66af4f228ec605d098"}>
                    <li className="py-2 px-4 block whitespace-no-wrap border-b border-[#f0bb7e]">
                      Chó
                    </li>
                  </Link>
                  <Link to={"/products/64171bfeaf4f228ec605d0b8"}>
                    <li className="py-2 px-4 block whitespace-no-wrap border-b border-[#f0bb7e]">
                      Mèo
                    </li>
                  </Link>
                </ul>
              </div>
            </li>
          </ul>
          <ul className="w-1/6 sm:w-2/6 flex flex-row items-center justify-around">
            <Tippy content="Rehome cho thú cưng">
              <li>
                <Link to={"/rehome"}>
                  <FaHandHoldingHeart className="text-[#f8355f]" />
                </Link>
              </li>
            </Tippy>
            <Tippy content="Search">
              <li className="cursor-pointer" onClick={handleShowSearch}>
                <FaSearch />
              </li>
            </Tippy>
            <Tippy content="Notices">
              <li className="relative inline-block cursor-pointer">
                <div className="notice-bell">
                  <FaRegBell />
                </div>
              </li>
            </Tippy>
            {isLogin ? (
              <>
                <div className="dropdown inline-block relative">
                  <button className="py-2 rounded inline-flex items-center">
                    <span className="mr-1">
                      <FaUserCircle />
                    </span>
                  </button>
                  <ul className="bg-[#f1e4d5e7] dropdown-menu hidden absolute rounded p-2 w-20 translate-x-[-30px]">
                    <Tippy placement="right" content="Info">
                      <li className="py-2 px-2 flex justify-center whitespace-no-wrap border-b border-[#ebd3ba]">
                        <Link to={"/profile"}>
                          <FaAddressCard className="text-[#2bb972]" />
                        </Link>
                      </li>
                    </Tippy>
                    <Tippy placement="right" content="Logout">
                      <li
                        className="py-2 px-2 flex justify-center whitespace-no-wrap border-b border-[#ebd3ba]"
                        onClick={handleLogOutClick}
                      >
                        <FaDoorOpen className="text-[#b94c2b]" />
                      </li>
                    </Tippy>
                  </ul>
                </div>
                <Tippy content="Giỏ hàng">
                  <li className="relative inline-block cursor-pointer">
                    <div
                      className={` ${
                        cart && cart.length > 0 ? "notice-bell" : ""
                      }`}
                    >
                      <Link to={"/cart"}>
                        <FaShoppingBasket />
                      </Link>
                    </div>
                  </li>
                </Tippy>
              </>
            ) : (
              <>
                <Tippy content="Login">
                  <Link to={"/profile"}>
                    <li className="cursor-pointer">
                      <FaUserCircle />
                    </li>
                  </Link>
                </Tippy>
                <li className="cursor-pointer">
                  <FaEllipsisV />
                </li>
              </>
            )}
          </ul>
        </div>
        {/* show for mobile */}
        <div className={`${navbarShow ? "navbar-show nav-btn" : "hidden"}`}>
          <div className=" justify-end items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ">
            <div className="relative w-1/2 sm:w-2/5 my-6 max-w-3xl h-full ">
              {/*content*/}
              <div className="h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-orange-100">
                {/*header*/}
                <button
                  className="p-1 mr-auto border-0 float-right text-3xl"
                  onClick={showNavbar}
                >
                  <span className=" text-red-600 h-6 w-10 text-2xl">
                    <FaAngleDoubleRight></FaAngleDoubleRight>
                  </span>
                </button>
                {/*body*/}
                <div className="relative px-6 flex-auto ul-nav-show">
                  <ul className="gap-5 w-full p-2">
                    <Link to={"/rehome"}>
                      <li>
                        <FaHandHoldingHeart /> <b>Rehome</b>
                      </li>
                    </Link>
                    <li onClick={handleShowSearch}>
                      <FaSearch /> <b>Search</b>
                    </li>

                    <li>
                      <FaRegBell /> <b>Notices</b>
                    </li>

                    <Link to={"/profile"}>
                      <li>
                        <FaUserCircle /> <b>Profile</b>
                      </li>
                    </Link>
                    <li>
                      <FaEllipsisV /> <b>Setting</b>
                    </li>
                    <Link to="/">
                      <li>
                        <FaHome></FaHome>
                        <b>Home</b>
                      </li>
                    </Link>
                    <Link to={"/pet/6416ee5c33df1b92e7fb8351"}>
                      <li>
                        <FaDog></FaDog> <b>Chó</b>
                      </li>
                    </Link>
                    <Link to="/pet/6416ee6433df1b92e7fb8354">
                      <li>
                        <FaCat></FaCat>
                        <b>Mèo</b>
                      </li>
                    </Link>
                    <li>
                      <div className="dropdown relative flex flex-row">
                        <button className="py-2 rounded inline-flex items-center">
                          <FaGifts></FaGifts> <b>Phụ kiện</b>
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                          </svg>
                        </button>
                        <ul className="bg-[#ddd1c5] dropdown-menu hidden absolute rounded right-0 top-full z-10">
                          <li className=" py-2 px-4 block whitespace-no-wrap border-b border-[#f0bb7e]">
                            <Link to={`/products`}>
                              <p className="px-2 text-center">Chó</p>
                            </Link>
                          </li>
                          <li className=" py-2 px-4 block whitespace-no-wrap border-b border-[#f0bb7e]">
                            <Link to={`/products`}>
                              <p className="px-2 text-center">Mèo</p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>

                    <li>
                      <div className="dropdown relative flex flex-row">
                        <button className="py-2 rounded inline-flex items-center">
                          <FaHotdog></FaHotdog> <b>Thức ăn</b>
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                          </svg>
                        </button>
                        <ul className="bg-[#ddd1c5] dropdown-menu hidden absolute rounded right-0 top-full z-10">
                          <li className=" py-2 px-4 block whitespace-no-wrap border-b border-[#f0bb7e]">
                            <Link to={`/products/64171b66af4f228ec605d098`}>
                              <p className="px-2 text-center"> Chó</p>
                            </Link>
                          </li>
                          <li className=" py-2 px-4 block whitespace-no-wrap border-b border-[#f0bb7e]">
                            <Link to={`/products/64171bfeaf4f228ec605d0b8`}>
                              <p className="px-2 text-center"> Mèo</p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
