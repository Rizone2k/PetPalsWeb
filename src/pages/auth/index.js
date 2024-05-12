import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaAt,
  FaInfo,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegEdit,
  FaRegStar,
  FaUserAlt,
} from "react-icons/fa";

import { isLoggedInSelector, currentUserSelector } from "~/redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import Button from "~/components/button";
import SignIn from "./signInComponent";
import SignUp from "./signUpComponent";
import "./auth.scss";
import { updateInfo, info } from "~/redux/reducers/auth";

export default function Sign() {
  const [title, setTitle] = useState("Sign In");
  const isLogin = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);
  const [disable, setDisable] = useState(true);
  const [userName, setUserName] = useState(currentUser.username || "No Name");
  const [avatar, setAvatar] = useState(
    currentUser.avatar ||
      "https://static.vecteezy.com/system/resources/previews/011/321/161/non_2x/cute-shiba-inu-puppy-with-a-grin-playful-purebred-head-and-chest-pet-cute-hand-drawn-style-perfect-for-advertising-a-kennel-pet-store-or-blog-avatar-vector.jpg"
  );
  const [email, setEmail] = useState(currentUser.email || "noname@gmail.com");
  const [phone, setPhone] = useState(currentUser.phone || "None");
  const [address, setAddress] = useState(currentUser.address || "None");
  window.scrollTo(0, 0);

  const handleCancel = () => {
    setDisable(true);
    setUserName(currentUser.username || "No Name");
    setEmail(currentUser.email || "noname@gmail.com");
    setPhone(currentUser.phone || "None");
    setAddress(currentUser.address || "None");
  };
  // Handle edit profile
  const handleEditProfile = () => {
    // e.preventDefault();
    setDisable(true);
    alert("Coming soon!");
    // if (userName.length > 2 && email.length > 2) {
    //   const user = {
    //     id: currentUser.id,
    //     userName,
    //     email,
    //     phone,
    //     address,
    //     avatar,
    //   };
    //   dispatch(updateInfo(user))
    //     .then({ unwrapResult })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   alert("Unsuccess!");
    // }
  };

  return (
    <>
      {isLogin ? (
        <>
          <section className="bg-gradient-to-r from-[orange] to-[#ff3c00]">
            <div className="row d-flex justify-content-center align-items-center p-3 lg:p-10">
              <div className="bg-[#fcecc1c4] relative w-full md:w-2/3 mx-auto px-6 py-12 lg:p-10 rounded-xl flex flex-col sm:flex-row sm:items-start items-center  flex-wrap gap-1 sm:gap-0">
                <div className="text-white flex flex-col w-1/4 sm:pr-2">
                  <div className="mx-auto text-center">
                    <img
                      width={"150px"}
                      src={avatar}
                      alt="Generic placeholder"
                      className="img-fluid img-thumbnail mt-4 mb-2 rounded-xl"
                    />
                    <Button
                      type="button"
                      className="bg-[#4b4b4c] rounded-xl"
                      data-mdb-ripple-color="dark"
                      onClick={null}
                    >
                      <FaRegEdit></FaRegEdit>
                    </Button>
                  </div>
                </div>

                <div className="w-3/4">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center lg:w-3/4 w-full py-2">
                      <FaInfo className="text-2xl text-blue-500"></FaInfo>
                      <b className="text-xl">Thông tin</b>
                    </div>
                    <div className="py-2">
                      <b>Tên người dùng</b>
                      <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md border-[#695308] bg-[#e1f7fd33] flex flex-row items-center lg:w-2/3 w-full">
                        <FaUserAlt></FaUserAlt>
                        <input
                          className={" bg-transparent ml-5 "}
                          type={"text"}
                          name={"username"}
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                          value={userName}
                          disabled={disable}
                        ></input>
                      </div>
                    </div>
                    <div className="py-2">
                      <b>Email</b>
                      <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md border-[#695308] bg-[#e1f7fd33] flex flex-row items-center lg:w-2/3 w-full">
                        <FaAt></FaAt>
                        <input
                          className={" bg-transparent ml-5 "}
                          type={"email"}
                          name={"email"}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          value={email}
                          disabled={disable}
                        ></input>
                      </div>
                    </div>
                    <div className="py-2">
                      <b>Address</b>
                      <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md border-[#695308] bg-[#e1f7fd33] flex flex-row items-center lg:w-2/3 w-full">
                        <FaMapMarkerAlt></FaMapMarkerAlt>
                        <input
                          className={" bg-transparent ml-5 "}
                          type={"text"}
                          name={"address"}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          value={address}
                          disabled={disable}
                        ></input>
                      </div>
                    </div>
                    <div className="py-2">
                      <b>Phone</b>
                      <div className="sm:text-base text-sm px-3 py-2 border-b-2 rounded-t-md border-[#695308] bg-[#e1f7fd33] flex flex-row items-center lg:w-2/3 w-full">
                        <FaPhoneAlt></FaPhoneAlt>
                        <input
                          className={" bg-transparent ml-5 "}
                          type={"number"}
                          name={"phone"}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          value={phone}
                          disabled={disable}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-around items-center">
                    <div className="flex flex-row items-center lg:w-1/2 w-full">
                      <p className="">23 </p>
                      <p className="">Đã xem</p>
                    </div>
                    <div className="flex flex-row items-center lg:w-1/2 w-full">
                      <p className="">16 </p>
                      <p className="">Yêu thích</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-10 justify-end absolute bottom-2 right-5">
                  {disable ? (
                    <Button
                      type="button"
                      className={`bg-black rounded-xl text-white`}
                      data-mdb-ripple-color="dark"
                      onClick={() => setDisable(false)}
                    >
                      Chỉnh sửa
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="button"
                        className={`bg-[#e42121] rounded-xl text-white`}
                        data-mdb-ripple-color="dark"
                        onClick={handleCancel}
                      >
                        Huỷ
                      </Button>
                      <Button
                        type="button"
                        className="bg-[#00aeff] rounded-xl text-white"
                        data-mdb-ripple-color="dark"
                        onClick={handleEditProfile}
                      >
                        Save
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="d-flex justify-content-center flex-column align-items-center bg-sign p-10 lg:p-20">
          <div className="w-fit bg-white mx-auto rounded-lg px-3 py-2 mb-5">
            <Button
              type="button"
              className={`tabSign ${
                title === "Sign In" ? "active" : ""
              } hover:border-b-[#ffa704] hover:shadow-none border border-transparent`}
              onClick={() => {
                setTitle("Sign In");
              }}
            >
              Đăng nhập
            </Button>
            <span className="px-4">|</span>
            <Button
              type="button"
              onClick={() => {
                setTitle("Sign Up");
              }}
              className={`tabSign ${
                title === "Sign Up" ? "active" : ""
              } hover:border-b-[#ffa704] hover:shadow-none border border-transparent`}
            >
              Đăng ký
            </Button>
          </div>
          <div className="px-5">
            {title === "Sign In" ? (
              <SignIn title={title}></SignIn>
            ) : (
              <SignUp title={title}></SignUp>
            )}
          </div>
        </div>
      )}
    </>
  );
}
