import React, { useCallback, useEffect, useState } from "react";
import {
  currentCartSelector,
  totalSelector,
  currentUserSelector,
} from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux/reducers/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import petPalsAPI from "~/api/petPalsAPI";

const UseProductItem = (props) => {
  const handleRemoveClick = (productId) => {
    // Gọi hàm xử lý sự kiện từ component cha
    props.onRemoveProduct(productId);
  };
  // console.log(props);
  const [quantity, setQuantity] = useState(props.quantity);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>
        <span className="w-5/6 overview-one">{props.name}</span>
      </td>
      <td className="flex justify-around">
        <button onClick={decreaseQuantity}>-</button>
        {quantity}
        <button onClick={increaseQuantity}>+</button>
      </td>
      <td>
        <button onClick={() => handleRemoveClick(props.id)}>Xoá</button>
      </td>
    </tr>
  );
};
export default function Cart(props) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(useSelector(totalSelector));
  const [cart, setCart] = useState(useSelector(currentCartSelector));
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const currentUser = useSelector(currentUserSelector);
  const handleRemoveProduct = (id) => {
    // console.log(cart.idProductCart);
    console.log(id);
    if (total === 0) {
      console.log(items);
      console.log(cart.idProductCart.length);
      setItems(items.filter((item) => item.id !== id));
    } else if (total > 0) {
      // console.log(cart.product);
      console.log(id);
      setCart(cart.filter((item) => item.product._id !== id));
    }
  };

  const handleUpdateCart = (idProduct, quantity) => {
    dispatch(updateCart({ idUser: currentUser.id, idProduct, quantity }))
      .then(unwrapResult)
      .then((result) => {
        alert("Cập nhật thành công");
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    let getProduct = [];
    if (total === 0) {
      cart.idProductCart.map((id) => {
        return (getProduct = [...getProduct, id.idProduct]);
      });
    }
    const requests = getProduct.map((productId) =>
      petPalsAPI.getDetailProduct(productId)
    );
    // send all request
    Promise.all(requests)
      .then((responses) => {
        let getProductRes = [];
        // For each response
        responses.forEach((response) => {
          if (response.status === 200) {
            getProductRes = [...getProductRes, response.data.data];
            const products = getProductRes.map((item, index) => {
              return {
                id: item._id,
                name: item.name,
                quantity: cart.idProductCart[index].quantity,
              };
            });
            // console.log("products", products);
            setItems(products);
            // console.log(getProductRes);
          } else {
            console.log("Lỗi khi lấy thông tin sản phẩm");
          }
        });
      })
      .catch((error) => {
        console.log("Lỗi khi gửi yêu cầu");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <div>
      <div className=" bg-[#f3f1cc]">
        <div className="w-full sm:w-1/2 md:w-3/5 bg-[#fdc243fd] rounded-r-2xl p-2 mb-5">
          <b className="text-sm lg:text-lg text-white flex flex-row items-center">
            Giỏ hàng
          </b>
        </div>
        <div className="max-w-8xl mx-auto flex flex-row p-1 md:p-5 rounded-lg">
          <div className="w-3/5 p-1 lg:p-5">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f5e14d7c] rounded-t-sm">
                  <th className="px-3 py-2">Số thứ tự</th>
                  <th className="px-3 py-2">Tên</th>
                  <th className="px-3 py-2">Số lượng</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {total === 0
                  ? items.map((item, index) => (
                      <UseProductItem
                        quantity={item.quantity}
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        index={index}
                        onRemoveProduct={handleRemoveProduct}
                      ></UseProductItem>
                    ))
                  : cart.map((item, index) => (
                      <UseProductItem
                        quantity={item.quantity}
                        key={item.product._id}
                        id={item.product._id}
                        name={item.product.name}
                        index={index}
                        onRemoveProduct={handleRemoveProduct}
                      ></UseProductItem>
                    ))}
              </tbody>
            </table>
          </div>
          <div className="w-2/5 bg-[#f9f7c3] rounded-2xl p-1 lg:p-5 shadow-md shadow-[#c5c3a3] ">
            <p>
              Tổng đơn hàng:{" "}
              {total !== 0
                ? total
                : cart.idProductCart[0].total.toLocaleString()}{" "}
              VND
            </p>
            <p>
              Địa chỉ Email:{" "}
              {currentUser ? (
                currentUser.email
              ) : (
                <b className="text-red-600">
                  Bạn chưa có email, vui lòng cập nhật!
                </b>
              )}
            </p>
            <p>Tên: {currentUser ? currentUser.name : "Không"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
