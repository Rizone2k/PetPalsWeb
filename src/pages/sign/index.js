import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInfo, FaRegStar } from "react-icons/fa";
import Button from "~/components/button";
import SignIn from "./signInComponent";
import SignUp from "./signUpComponent";
import "./sign.scss";

export default function Sign() {
  const [itemsGenre, setItemsGenre] = useState([]);
  const [title, setTitle] = useState("Sign In");
  const isLogin = false;
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(true);
  window.scrollTo(0, 0);

  return (
    <>
      {isLogin ? (
        <>
          <section className="gradient-custom-2 bg-profile">
            <div className="container py-5">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col col-lg-10 col-xl-8">
                  <div className="bg-light rounded">
                    <div
                      className="rounded text-white d-flex flex-row"
                      style={{ backgroundColor: "#000", height: "200px" }}
                    >
                      <div
                        className="ms-4 mt-5 d-flex flex-column"
                        style={{ width: "150px" }}
                      >
                        <Button
                          type="button"
                          className="btn btn-outline-dark bg-dark cursor-none"
                          data-mdb-ripple-color="dark"
                          onClick={() => setShowEdit(true)}
                        >
                          Chỉnh sửa
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 text-black">
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <p className="mb-1 h5">23</p>
                          <p className="small text-muted mb-0">Đã xem</p>
                        </div>
                        <div className="px-3">
                          <p className="mb-1 h5">16</p>
                          <p className="small text-muted mb-0">Yêu thích</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-4 text-black">
                      <div className="mb-5">
                        <h4>
                          <b className="mb-1 d-flex align-content-center">
                            <FaInfo className="text-info"></FaInfo>Thông tin
                          </b>
                        </h4>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <p className="font-italic mb-1">
                            {/* <b>User:</b> {currentUser.username} */}
                            <b>User:</b>
                          </p>
                          <p className="font-italic mb-1">
                            <b>Email:</b>
                            {/* <b>Email:</b> {currentUser.email} */}
                          </p>
                          <p className="font-italic mb-0">
                            <b>Phone:</b>
                            {/* <b>Phone:</b> {currentUser.phone || "None"} */}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>
                          <b className="mb-0 d-flex align-content-center">
                            <FaRegStar className="text-danger"></FaRegStar>
                            &nbsp;Gợi ý phim yêu thích
                          </b>
                        </h4>
                        <div className="mb-0 pe-4">
                          <Link to={"/movies"}>
                            <Button className="out-line bg-warning">
                              Xem Thêm
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col mb-2 d-flex flex-wrap justify-content-center">
                          {itemsGenre.slice(0, 12).map((item, index) => (
                            <Link to={"/movies"} key={index} className="py-1">
                              <span className="out-line genres-item text-light fs-5 py-2 text">
                                #{item.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Edit profile */}
              <div>
                <form
                  className={`${showEdit ? "d-block zIndex-9" : "d-none"}`}
                  onSubmit={null}
                >
                  {/* <Modal
                    dialogClassName="modal-add-movie w-100 text-center edit-profile"
                    className="px-0 "
                    show={showEdit}
                    onHide={() => setShowEdit(false)}
                  >
                    <Modal.Header className="text-center" closeButton>
                      <Modal.Title>
                        <b>Chỉnh sửa thông tin</b>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                      className="text-center tab-content w-50 align-self-center"
                      style={{ height: "50rem" }}
                    >
                      <div className="">
                        <img
                          src={currentUser.avatar}
                          alt="Ảnh đại diện"
                          className="mt-4 mb-2 rounded-circle"
                          style={{ width: "150px", zIndex: "1" }}
                        />
                      </div>
                      <div className="text-start">
                        <label>
                          <small>User name</small>
                        </label>
                        <input
                          onChange={(e) => setUserName(e.target.value)}
                          type="text"
                          // autoComplete="off"
                          className="border border-dark rounded w-100"
                          placeholder="Enter user name"
                          defaultValue={currentUser.username}
                        />
                      </div>
                      <div className="text-start">
                        <label>
                          <small>Avatar</small>
                          <input
                            type="file"
                            name="myImage"
                            accept="image/png, image/gif, image/jpeg"
                          />
                        </label>
                      </div> 
                      <div className="text-start">
                        <label>
                          <small>Email</small>
                        </label>
                        <input
                          // onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          // autoComplete="off"
                          className="border border-dark rounded w-100"
                          placeholder="Enter email"
                          defaultValue={currentUser.email}
                        />
                      </div>
                      <div className="text-center pt-5">
                        <Button
                          title="Thay đổi"
                          type="submit"
                          className="bg-danger w-50 text-light"
                          onClick={null}
                        >
                          Change
                        </Button>
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center"></Modal.Footer>
                  </Modal> */}
                </form>
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
