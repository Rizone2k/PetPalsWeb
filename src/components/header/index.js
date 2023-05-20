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
import Button from "../button";

function Header() {
  const isLogin = useSelector(isLoggedInSelector);
  const cart = useSelector(currentCartSelector);
  const [itemDogProduct, setItemDogProduct] = useState([]);
  const [itemCatProduct, setItemCatProduct] = useState([]);
  const [itemDog, setItemDog] = useState([]);
  const [itemCat, setItemCat] = useState([]);
  const [categoryPetList, setCategoryPetList] = useState([]);
  const [navbar, setNavbar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [navbarShow, setNavbarShow] = useState(false);
  const [title, setTitle] = useState("Product");
  const [animal, setAnimal] = useState("Chó");
  const [sort, setSort] = useState("0");
  const [filterResponse, setFilterResponse] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subItem, setSubItem] = useState("64171b66af4f228ec605d098");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ID_Cat = "6416ee6433df1b92e7fb8354";
  const ID_Dog = "6416ee5c33df1b92e7fb8351";
  const ID_Cat_Product = "64171a3daf4f228ec605d08a";
  const ID_Dog_Product = "64171a2eaf4f228ec605d087";

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

  // Item pet for navigation and filter
  useEffect(() => {
    const getItemPet = async (category, pet) => {
      try {
        const param = category;
        const response = await petPalsAPI.getItems(param);
        pet(response.data.data.subitem);
        // console.log(response.data.data.subitem);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    getItemPet(ID_Cat_Product, setItemCatProduct);
    getItemPet(ID_Dog_Product, setItemDogProduct);
  }, []);

  // Item category pet for filter
  useEffect(() => {
    const getPet = async (category, pet) => {
      try {
        const param = category;
        const response = await petPalsAPI.getPetCategory(param);
        pet(response.data.data);
        // console.log(response.data.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    const getCategoryPet = async () => {
      try {
        const response = await petPalsAPI.getPetCategory("");
        setCategoryPetList(response.data.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryPet();
    getPet(ID_Cat, setItemCat);
    getPet(ID_Dog, setItemDog);
  }, []);

  // Filter items response
  useEffect(() => {
    const getFilterPet = async () => {
      try {
        let response;
        subCategory
          ? (response = await petPalsAPI.filterPets(subCategory, 15, 1, sort))
          : (response = await petPalsAPI.filterProducts(subItem, 15, 1, sort));
        setFilterResponse(response.data.data);
        console.log(response.data.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    if (subCategory || subItem) {
      getFilterPet();
    }
  }, [subCategory, subItem, sort]);

  // Header scroll
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
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative my-6 w-[100vw]">
              {/*content*/}
              <div className=" mx-auto border-0 rounded-lg shadow-lg relative flex flex-col gap-3 w-2/3 lg:w-2/3 bg-[#ffefe1] py-12 px-5">
                {/*header*/}
                <div className="border-red-100 border-2 flex flex-col">
                  <div className="flex flex-row items-center rounded-lg w-full px-2">
                    <div className="w-fit mx-auto rounded-lg px-3 py-2 mb-5 wrap-search">
                      <select
                        name="pet"
                        id="pet"
                        onChange={(event) => {
                          // Target value
                          const selectedOption = event.target.value;
                          // Find element base on name
                          const selectedItem = categoryPetList.find(
                            (item) => item.name === selectedOption
                          );
                          if (selectedItem) {
                            console.log("click");
                            setAnimal(selectedItem.name);
                          }
                        }}
                        className={`active px-3 py-2 rounded-xl bg-[#f4e49ac2]`}
                      >
                        {categoryPetList?.map((item) => (
                          <option key={item._id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <span className="px-4">|</span>
                      <select
                        name="category"
                        id="category"
                        className={`${
                          title === "Pet" ? "active" : ""
                        } hover:border-b-[#ffa704] px-3 py-2 rounded-xl hover:shadow-none bg-[#f4e49ac2]`}
                        onClick={() => {
                          setTitle("Pet");
                        }}
                        onChange={(event) => {
                          // Target value
                          const selectedOption = event.target.value;
                          // Find element base on name
                          let selectedItem;
                          animal === "Chó"
                            ? (selectedItem = itemDog.subcategory.find(
                                (item) => item.name === selectedOption
                              ))
                            : (selectedItem = itemCat.subcategory.find(
                                (item) => item.name === selectedOption
                              ));
                          if (selectedItem) {
                            setSubCategory(selectedItem._id);
                            setSubItem();
                          }
                        }}
                      >
                        {animal === "Chó"
                          ? itemDog?.subcategory?.map((item) => (
                              <option key={item._id} value={item.name}>
                                {item.name}
                              </option>
                            ))
                          : itemCat?.subcategory?.map((item) => (
                              <option key={item._id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                      </select>
                      <span className="px-4">|</span>
                      <select
                        name="item"
                        id="item"
                        className={`${
                          title === "Product" ? "active" : ""
                        } hover:border-b-[#ffa704] px-3 py-2 rounded-xl hover:shadow-none bg-[#f4e49ac2]`}
                        onClick={() => {
                          setTitle("Product");
                        }}
                        onChange={(event) => {
                          // Target value
                          const selectedOption = event.target.value;
                          // Find element base on name
                          let selectedItem;
                          animal === "Chó"
                            ? (selectedItem = itemDogProduct?.find(
                                (item) => item.name === selectedOption
                              ))
                            : (selectedItem = itemCatProduct?.find(
                                (item) => item.name === selectedOption
                              ));
                          if (selectedItem) {
                            setSubItem(selectedItem._id);
                            setSubCategory();
                          }
                        }}
                      >
                        {animal === "Chó"
                          ? itemDogProduct?.map((item) => (
                              <option
                                key={item._id}
                                onClick={() => setSubItem(item._id)}
                                value={item.name}
                              >
                                {item.name}
                              </option>
                            ))
                          : itemCatProduct?.map((item) => (
                              <option
                                key={item._id}
                                onClick={() => setSubItem(item._id)}
                                value={item.name}
                              >
                                {item.name}
                              </option>
                            ))}
                      </select>
                    </div>
                    <button
                      className="text-xl absolute right-0 top-0 text-red-500 font-bold uppercase px-2 lg:px-6 py-2"
                      type="button"
                      onClick={() => handleShowSearch(false)}
                    >
                      X
                    </button>
                  </div>
                  <div className="flex flex-row items-center rounded-lg w-full px-2">
                    <div className="w-fit mx-auto rounded-lg px-3 py-2 mb-5 wrap-search">
                      <Button
                        type="button"
                        className={` font-normal! ${
                          sort === "0" ? "active" : ""
                        } hover:border-b-[#ffa704] hover:shadow-none border border-transparent bg-[#f4e49ac2]`}
                        onClick={() => {
                          setSort("0");
                        }}
                      >
                        Mới nhất
                      </Button>
                      <span className="px-4">|</span>
                      <Button
                        type="button"
                        className={` font-normal! ${
                          sort === "1" ? "active" : ""
                        } hover:border-b-[#ffa704] hover:shadow-none border border-transparent bg-[#f4e49ac2]`}
                        onClick={() => {
                          setSort("1");
                        }}
                      >
                        Cũ nhất
                      </Button>
                      <span className="px-4">|</span>
                      <Button
                        type="button"
                        className={` font-normal! ${
                          sort === "3" ? "active" : ""
                        } hover:border-b-[#ffa704] hover:shadow-none border border-transparent bg-[#f4e49ac2]`}
                        onClick={() => {
                          setSort("3");
                        }}
                      >
                        Giá cao nhất
                      </Button>
                      <span className="px-4">|</span>
                      <Button
                        type="button"
                        onClick={() => {
                          setSort("2");
                        }}
                        className={`bg-[#f4e49ac2] ${
                          sort === "2" ? "active" : ""
                        } hover:border-b-[#ffa704] hover:shadow-none border border-transparent`}
                      >
                        Giá thấp nhất
                      </Button>
                    </div>
                  </div>
                </div>
                {/*body*/}
                <div className="relative md:p-6 flex-auto overflow-auto max-h-80">
                  <p>Kết quả</p>
                  <ul className="flex flex-col gap-3">
                    {filterResponse && filterResponse.length > 0 ? (
                      filterResponse.map((item) => (
                        <li
                          key={item._id}
                          className="py-3 px-2 rounded-md bg-[#fcd3ada1] hover:bg-orange-200"
                        >
                          <Link
                            to={`/detail/${
                              subCategory
                                ? "pet/" + item._id
                                : "product/" + item._id
                            }`}
                            onClick={() => setShowSearch(false)}
                          >
                            <div className="flex flex-row items-center gap-3 max-h-50">
                              <img
                                className="rounded"
                                width={"10%"}
                                src={item.thumb}
                                alt="Dog"
                              />
                              <did className="flex flex-col">
                                <p className="font-semibold"> {item.name}</p>
                                <p className="text-[#22478b]">
                                  Giá: {item.price.toLocaleString()}
                                </p>
                              </did>
                            </div>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>
                        <div className="w-full flex flex-col justify-center items-center h-40 p-5">
                          <img
                            width={150}
                            src={require("~/assets/empty-product.jpg")}
                            alt=""
                          />
                          <p className="text-[#dd612f] font-bold text-base lg:text-xl">
                            Oop..... Xin lỗi! Hiện tại chưa tìm thấy bất kỳ sản
                            phẩm nào!
                          </p>
                        </div>
                      </li>
                    )}
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
        } z-10 flex px-5 py-4 border-t-8 border-nav-top relative`}
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
                      {itemDogProduct &&
                        itemDogProduct.slice(0, 10).map((item) => (
                          <Link to={`/products/${item._id}`} key={item._id}>
                            <li className="block whitespace-no-wrap border-b border-[#f0bb7e]">
                              <p className="p-2">{item.name}</p>
                            </li>
                          </Link>
                        ))}
                    </ul>
                  </li>
                  <li className="dropdown-new py-2 px-4 block whitespace-no-wrap border-b border-[#f0bb7e]">
                    <p className="px-2 text-center"> Mèo</p>
                    <ul className="rounded w-52 hidden absolute bg-[#f7ece0] shadow-lg shadow-indigo-500/40 left-full top-0">
                      {itemCatProduct &&
                        itemCatProduct.slice(0, 10).map((item) => (
                          <Link to={`/products/${item._id}`} key={item._id}>
                            <li className="block whitespace-no-wrap border-b border-[#f0bb7e]">
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
