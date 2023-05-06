import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import petPalsAPI from "~/api/petPalsAPI";
import Card from "./components/card";
import capitalizeAllWords from "./components/handleString";
import Button from "~/components/button";

export default function Cart(props) {
  const [product, setProduct] = useState([]);
  console.log(product);
  const [page, setPage] = useState(1);
  var param = useParams();
  console.log(param);

  const loadMore = async () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const getPetList = async (param) => {
      const limit = 10;
      if (param && Object.keys(param).length !== 0) {
        const response = await petPalsAPI.getProduct(param, limit, page);
        setProduct([...product, ...response.data.data]);
      } else {
        const response = await petPalsAPI.getProduct("", limit, page);
        setProduct([...product, ...response.data.data]);
      }
    };
    getPetList(param.idProduct);
  }, [page]);

  useEffect(() => {
    setPage(1);
    const getPetList = async (param) => {
      const limit = 10;
      if (param && Object.keys(param).length !== 0) {
        try {
          const response = await petPalsAPI.getProduct(param, limit, page);
          setProduct(response.data.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await petPalsAPI.getProduct("", limit);
          setProduct(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getPetList(param.idProduct);
  }, [param]);

  return (
    <div>
      <div className=" bg-[#f3f1cc]">Cart</div>
    </div>
  );
}
