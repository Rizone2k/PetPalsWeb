import React, { useCallback, useEffect, useState } from "react";
import {
  currentCartSelector,
  totalSelector,
  currentUserSelector,
} from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { clear, updateCart } from "../redux/reducers/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router-dom";
import petPalsAPI from "~/api/petPalsAPI";
import Tippy from "@tippyjs/react";
import Button from "~/components/button";
import {
  FaAt,
  FaClipboardCheck,
  FaClipboardList,
  FaMapMarkerAlt,
  FaPhone,
  FaUserCircle,
} from "react-icons/fa";

const UseProductItem = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const handleRemoveClick = (productId, quantity) => {
    // Gọi hàm xử lý sự kiện từ component cha
    props.onRemoveProduct(productId, quantity);
  };
  const increaseQuantity = (productId) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      props.onRemoveProduct(productId, newQuantity);
      return newQuantity;
    });
  };

  const decreaseQuantity = (productId) => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        props.onRemoveProduct(productId, newQuantity);
        return newQuantity;
      });
    }
  };
  return (
    <tr className={`${props.index % 2 ? "bg-[#f7e5ab43]" : ""}`}>
      <td className="text-center p-2">{props.index + 1}</td>
      {props.images && (
        <td className="text-center p-2 flex justify-center items-center">
          <img width={50} src={props.images} alt={props.name} />
        </td>
      )}
      <td className="text-left p-2">
        <Link to={`/detail/product/${props.id}`}>
          <span className="text-xs lg:text-base overview-one">
            {props.name}
          </span>
        </Link>
      </td>
      <td className="text-center p-2">
        <p className="flex flex-row justify-between items-center">
          <button onClick={() => decreaseQuantity(props.id)}>-</button>|{" "}
          {quantity} |
          <button onClick={() => increaseQuantity(props.id)}>+</button>
        </p>
      </td>

      {props.images && (
        <td className="text-center p-2">
          <button onClick={() => handleRemoveClick(props.id, quantity)}>
            <Tippy content="Xoá" placement="right">
              <b className="text-red-400"> X</b>
            </Tippy>
          </button>
        </td>
      )}
    </tr>
  );
};
export default function Cart(props) {
  const cart = useSelector(currentCartSelector);
  var total = useSelector(totalSelector);
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const [idOrder, setIdOrder] = useState(null);
  const [email, setEmail] = useState(currentUser.email);
  const [fullName, setFullName] = useState(currentUser.fullName || "");
  const [address, setAddress] = useState(currentUser.address || "");
  const [phone, setPhone] = useState(currentUser.phone || "");
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [statusOrder, setStatusOrder] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShowPayment = () => {
    setShowSearch(!showSearch);
  };
  // copy text to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(idOrder);
    setCopied(true);
  };

  const handleCheckout = async () => {
    // console.log(fullName);
    // console.log(address);
    // console.log(phone);
    // console.log(email);
    // console.log(paymentMethod);
    // console.log(" currentUser.id", currentUser.id);
    if (
      email.length !== 3 &&
      fullName.length !== 3 &&
      address.length !== 3 &&
      phone.length !== 3
    ) {
      const rs = await petPalsAPI.checkout({
        idUser: currentUser.id,
        paymentMethod,
        fullName,
        email,
        address,
        phone,
      });
      if (rs.data.status === "success") {
        if (rs.data.data) {
          setIdOrder(rs.data.data);
          setShowSearch(false);
        } else {
          dispatch(clear())
            .then(unwrapResult)
            .then(() => {
              setShowSearch(false);
              alert("Thành công");
              setStatusOrder(true);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        console.log(rs);
      }
    } else {
      alert("Something's wrong!");
    }
  };

  const handleUpdateCart = (idProduct, quantity) => {
    dispatch(updateCart({ idUser: currentUser.id, idProduct, quantity }))
      .then(unwrapResult)
      .then((result) => {
        alert("Cập nhật thành công");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      {cart && (
        <div>
          <div className=" bg-[#f3f1cc]">
            <div className="w-full sm:w-1/2 md:w-3/5 bg-[#fdc243fd] rounded-r-2xl p-2 mb-5">
              <b className="text-sm lg:text-lg text-white flex flex-row items-center">
                Giỏ hàng
              </b>
            </div>
            <div className="max-w-8xl mx-auto flex lg:flex-row flex-col p-1 md:p-5 rounded-lg">
              <div className="lg:w-4/6 w-full p-1 lg:p-5 max-h-96 overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f5e14d7c] rounded-t-sm">
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">Hình ảnh</th>
                      <th className="px-3 py-2">Tên</th>
                      <th className="px-3 py-2">Số lượng</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length !== 0 ? (
                      cart && cart.length > 0 ? (
                        cart.map((item, index) => (
                          <UseProductItem
                            quantity={item.quantity}
                            key={item.product._id}
                            id={item.product._id}
                            name={item.product.name}
                            images={item.product.thumb}
                            index={index}
                            onRemoveProduct={handleUpdateCart}
                          ></UseProductItem>
                        ))
                      ) : (
                        cart.product.map((item, index) => (
                          <UseProductItem
                            quantity={item.quantity}
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            images={item.images}
                            index={index}
                            onRemoveProduct={handleUpdateCart}
                          ></UseProductItem>
                        ))
                      )
                    ) : (
                      <div className="w-full flex flex-col justify-center items-center h-40">
                        <p className="text-[#dd612f] font-extrabold text-xl py-2">
                          Bạn chưa có sản phẩm nào trong giỏ hàng!
                        </p>
                        <span>
                          <Link to={"/"}>
                            <u>Mua sắm</u>
                          </Link>
                        </span>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="lg:w-2/6 w-full bg-[#f9f7c3] rounded-2xl p-1 lg:p-5 shadow-md shadow-[#c5c3a3] ">
                <p className="font-bold text-xl pb-5">Tổng đơn hàng</p>
                <p className="py-2 font-semibold text-md flex flex-row justify-between items-center">
                  <span>Giá:</span>
                  <span>
                    {cart?.product?.[0]?.total.toLocaleString() ??
                      total.toLocaleString()}
                    VND
                  </span>
                </p>
                <p className="py-2 font-semibold text-md flex flex-row justify-between items-center">
                  <span>Giá đã bao gồm VAT:</span>
                  <span>
                    {cart?.product?.[0]?.total.toLocaleString() ??
                      total.toLocaleString()}
                    VND
                  </span>
                </p>
                <div className="py-2 font-semibold text-md flex flex-row justify-between items-center">
                  <div>
                    <input
                      type="text"
                      id="discount"
                      name="paymentMethod"
                      placeholder="Mã giảm giá"
                      // value=""
                      className="px-3 py-2 rounded-lg border-2 border-orange-200"
                    />
                    <label
                      htmlFor="discount"
                      className="pl-3 text-base text-blue-400"
                    >
                      Áp dụng
                    </label>
                  </div>
                </div>
                {cart.length !== 0 && (
                  <div className="text-center pt-9">
                    <Button
                      name={"pay"}
                      id={"pay"}
                      type={"button"}
                      onClick={handleShowPayment}
                      className="bg-[#d7ab0c] text-white text-md md:text-lg font-extrabold p-2"
                    >
                      <Tippy content="Thanh toán" placement="bottom">
                        <p>Thanh toán</p>
                      </Tippy>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {cart && showSearch && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className=" w-[100vw] relative my-6">
              {/*content*/}
              <div className="mx-auto border-0 rounded-lg shadow-lg relative flex flex-col w-2/3 lg:w-1/2 bg-[#ffefe1] py-12 px-5">
                {/*header*/}
                <div className="flex flex-row items-center w-full lg:w-4/5">
                  <p className="font-bold text-lg">Hoá đơn thanh toán</p>
                  <button
                    className="text-xl absolute right-0 top-0 text-red-500 font-bold uppercase px-2 lg:px-6 py-2"
                    type="button"
                    onClick={handleShowPayment}
                  >
                    X
                  </button>
                </div>
                {/*body*/}
                <div className="relative md:p-6 flex-auto overflow-auto max-h-[70vh]">
                  <p className="font-semibold text-base"> Sản phẩm</p>
                  <div className="p-1 lg:p-5 max-h-96 overflow-auto">
                    <ol>
                      {cart && cart.length > 0
                        ? cart.map((item, index) => (
                            <li key={index} className="py-1">
                              <div className="flex flex-row gap-2">
                                <img
                                  width={50}
                                  src={item.product.thumb}
                                  alt={item.product.name}
                                />
                                <div className="flex flex-col w-full">
                                  <p>{item.product.name}</p>
                                  <p className="flex flex-row justify-between items-center">
                                    {item.product.quantity && (
                                      <span className="text-blue-500">
                                        Số lượng: {item.product.quantity}
                                      </span>
                                    )}
                                    <span className="text-orange-400">
                                      Giá: {item.product.price.toLocaleString()}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))
                        : cart.product &&
                          cart.product.map((item, index) => (
                            <li key={index} className="py-1">
                              <div className="flex flex-row gap-2">
                                <img
                                  width={50}
                                  src={item.images}
                                  alt={item.name}
                                />
                                <div className="flex flex-col w-full">
                                  <p>{item.name}</p>
                                  <p className="flex flex-row justify-between items-center">
                                    <span className="text-blue-500">
                                      Số lượng: {item.quantity}
                                    </span>
                                    <span className="text-orange-400">
                                      Giá: {item.price.toLocaleString()}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                    </ol>
                  </div>
                  <div>
                    <div className="flex flex-col">
                      <ul>
                        <li className="py-2 flex ">
                          <p className="font-semibold text-base">
                            Tổng: {"  "}
                            <b>
                              {cart?.product?.[0]?.total.toLocaleString() ??
                                total.toLocaleString()}{" "}
                              VND
                            </b>
                          </p>
                        </li>
                        <li className="py-2 flex flex-col justify-between">
                          <label
                            htmlFor="discount"
                            className="pr-3 text-base text-gray-900"
                          >
                            <FaUserCircle></FaUserCircle>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Họ tên"
                            onChange={(e) => setFullName(e.target.value)}
                            defaultValue={fullName}
                            required
                            className="px-3 py-2 rounded-lg border-2 border-orange-200"
                          />
                        </li>
                        <li className="py-2 flex flex-col justify-between">
                          <label
                            htmlFor="discount"
                            className="pr-3 text-base text-gray-900"
                          >
                            <FaAt></FaAt>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={email}
                            className="px-3 py-2 rounded-lg border-2 border-orange-200"
                          />
                        </li>
                        <li className="py-2 flex flex-col justify-between">
                          <label
                            htmlFor="discount"
                            className="pr-3 text-base text-gray-900"
                          >
                            <FaMapMarkerAlt></FaMapMarkerAlt>
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Địa chỉ"
                            required
                            onChange={(e) => setAddress(e.target.value)}
                            defaultValue={address}
                            className="px-3 py-2 rounded-lg border-2 border-orange-200"
                          />
                        </li>
                        <li className="py-2 flex flex-col justify-between">
                          <label
                            htmlFor="discount"
                            className="pr-3 text-base text-gray-900"
                          >
                            <FaPhone></FaPhone>
                          </label>
                          <input
                            type="number"
                            name="phone"
                            id="phone"
                            required
                            placeholder="Số điện thoại"
                            onChange={(e) => setPhone(e.target.value)}
                            defaultValue={phone}
                            className="px-3 py-2 rounded-lg border-2 border-orange-200"
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="py-2 font-semibold text-md flex flex-col gap-3 justify-start">
                      <p>Chọn phương thức thanh toán:</p>
                      <div className="pl-10">
                        <input
                          type="radio"
                          id="momo"
                          name="paymentMethod"
                          value="momo"
                          onChange={() => setPaymentMethod(0)}
                          checked={paymentMethod === 0 ? true : false}
                          className="mr-2"
                        />
                        <label htmlFor="momo">Thanh toán khi nhận hàng</label>
                      </div>
                      <div className="pl-10">
                        <input
                          type="radio"
                          id="momo"
                          name="paymentMethod"
                          value="momo"
                          onChange={() => setPaymentMethod(1)}
                          checked={paymentMethod === 1 ? true : false}
                          className="mr-2"
                        />
                        <label htmlFor="momo">Momo</label>
                      </div>
                    </div>
                    <div className="text-center pt-9">
                      <Button
                        type={"submit"}
                        onClick={handleCheckout}
                        className="bg-[#0cd772] shadow-md hover:shadow-none shadow-[#5f5e5eb5] text-white text-md md:text-lg font-extrabold p-2"
                      >
                        <p>Xác nhận</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      {cart && statusOrder && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className=" w-[100vw] relative my-6">
              {/*content*/}
              <div className="mx-auto border-0 rounded-lg shadow-lg relative flex flex-col w-2/3 lg:w-1/2 bg-[#ffefe1] py-12 px-5">
                {/*header*/}
                <div className="flex flex-row items-center w-full lg:w-4/5">
                  <p className="font-bold text-lg">
                    Hoàn thành thanh toán trực tuyến
                  </p>
                </div>
                {/*body*/}
                {statusOrder && idOrder ? (
                  <div className="relative md:p-6 flex-auto overflow-auto max-h-[70vh]">
                    <div className="flex flex-col gap-5">
                      <p className="font-semibold text-base">
                        {" "}
                        1. Vui lòng sử dụng momo và quét mã QR sau để thanh toán
                      </p>
                      <div className="flex justify-center">
                        <img
                          width={300}
                          src={require("../assets/accessoryAdsCard.jpg")}
                          alt="QR Momo"
                        />
                      </div>
                      <p className="font-semibold text-base">
                        2.Vui lòng thanh toán{" "}
                        <b>
                          <u>chính xác</u>
                        </b>{" "}
                        với lời nhắn sau:
                      </p>
                      <p className="text-center">
                        {idOrder}
                        <button onClick={handleCopy} className="px-2 text-xl">
                          {copied ? (
                            <Tippy content="Copied!">
                              <span>
                                <FaClipboardCheck className="text-[#15d88d]"></FaClipboardCheck>
                              </span>
                            </Tippy>
                          ) : (
                            <Tippy content="Copy!">
                              <span>
                                <FaClipboardList className="text-[#28684f]"></FaClipboardList>
                              </span>
                            </Tippy>
                          )}
                        </button>
                      </p>
                    </div>

                    <div>
                      <div className="text-center pt-9">
                        <Button
                          type={"submit"}
                          onClick={() => setStatusOrder(false)}
                          className="bg-[#0cd7bc] shadow-md hover:shadow-none shadow-[#5f5e5eb5] text-white text-md md:text-lg font-extrabold p-2"
                        >
                          <p>Tôi đã thanh toán!</p>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative md:p-6 flex-auto overflow-auto max-h-[70vh]">
                    <div className="flex flex-col gap-5">
                      <p className="font-semibold text-base">
                        1.Đơn hàng của bạn đã đặt thành công, chúng tôi sẽ liên
                        hệ với bạn về bất kỳ thông tin nào về đơn hàng của bạn.
                      </p>
                      <p className="font-semibold text-base">
                        2.Vui lòng kiểm tra email bạn vừa nhập để xem cụ thể đơn
                        hàng! Xin cảm ơn.
                      </p>
                    </div>

                    <div>
                      <div className="text-center pt-9">
                        <Button
                          type={"submit"}
                          onClick={() => setStatusOrder(false)}
                          className="bg-[#0cd7bc] shadow-md hover:shadow-none shadow-[#5f5e5eb5] text-white text-md md:text-lg font-extrabold p-2"
                        >
                          <p>Tôi hiểu rồi</p>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
