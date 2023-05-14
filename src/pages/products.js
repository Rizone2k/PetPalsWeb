import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import petPalsAPI from "~/api/petPalsAPI";
import Card from "./components/card";
import capitalizeAllWords from "./components/handleString";
import Button from "~/components/button";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  var param = useParams();
  const loadMore = async () => {
    try {
      setPage(page + 1);
      const limit = 10;
      let response = null;
      param && Object.keys(param).length !== 0
        ? (response = await petPalsAPI.getProduct(param.idProduct, limit, page))
        : (response = await petPalsAPI.getProduct("", limit, page));
      response && setProducts([...products, ...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPage(1);
    const getProductList = async (param) => {
      const limit = 10;
      setProducts([]);
      if (param && Object.keys(param).length !== 0) {
        const response = await petPalsAPI.getProduct(param, limit, page);
        setProducts(response.data.data);
      } else {
        const response = await petPalsAPI.getProduct("", limit, page);
        setProducts(response.data.data);
      }
    };
    getProductList(param.idProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.idProduct]);

  return (
    <div>
      <div className=" bg-[#f3f1cc]">
        <div className="w-full flex flex-row justify-around">
          <div className="w-5/6 sm:w-1/2 md:w-3/5 bg-[#fdc243fd] rounded-r-2xl p-2 mb-5 ">
            <b className="text-sm lg:text-lg text-white flex flex-row items-center">
              <Link to={"/pet"}> Phụ kiện</Link> {<FaAngleRight></FaAngleRight>}{" "}
              {/* {param && param.id === "6416ee5c33df1b92e7fb8351" ? "Chó" : "Mèo"} */}
            </b>
          </div>
          <p>
            <b className="bg-[#fdc243fd] text-xs lg:text-lg text-white flex flex-row items-center rounded-xl px-5 py-2">
              <a href="/products" target="_black" title="See all">
                {" "}
                All{" >"}
              </a>
            </b>
          </p>
        </div>
        <div className="max-w-screen-xl mb-5 mx-auto">
          <div className="flex flex-wrap -mx-1 lg:-mx-1">
            {products && products.length !== 0 ? (
              products.map((item) => {
                return (
                  <Card
                    key={item._id}
                    id={item._id}
                    src={item.thumb}
                    name={capitalizeAllWords(item.name)}
                    price={item.price}
                  ></Card>
                );
              })
            ) : (
              <div className="w-full flex flex-col justify-center items-center h-40">
                <p className="text-[#dd612f] font-extrabold text-2xl">
                  Hiện tại chưa tìm thấy bất kỳ sản phẩm nào!
                </p>
              </div>
            )}
          </div>
          <div className="flex w-full justify-center items-end p-8">
            <Button
              className="see-more bg-[#ffb94481]"
              title="See more"
              type={"button"}
              onClick={loadMore}
            >
              {"<<"} Load more {">>"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
