import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import petPalsAPI from "~/api/petPalsAPI";
import Card from "./components/card";
import capitalizeAllWords from "./components/handleString";
import Button from "~/components/button";

export default function Pet(props) {
  const [petList, setPetList] = useState([]);
  const [page, setPage] = useState(1);
  var param = useParams();

  const loadMore = async () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const getPetList = async (param) => {
      const limit = 10;
      if (param && Object.keys(param).length !== 0) {
        const response = await petPalsAPI.getPetList(param, limit, page);
        setPetList([...petList, ...response.data.data]);
      } else {
        const response = await petPalsAPI.getPetList("", limit, page);
        setPetList([...petList, ...response.data.data]);
      }
    };
    getPetList(param.id);
  }, [page]);

  useEffect(() => {
    setPage(1);
    const getPetList = async (param) => {
      const limit = 10;
      if (param && Object.keys(param).length !== 0) {
        try {
          const response = await petPalsAPI.getPetList(param, limit, page);
          setPetList(response.data.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await petPalsAPI.getPetList("", limit);
          setPetList(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getPetList(param.id);
  }, [param]);

  return (
    <div>
      <div className=" bg-[#f3f1cc]">
        <div className="w-full flex flex-row justify-around">
          <div className="w-5/6 sm:w-1/2 md:w-3/5 bg-[#fdc243fd] rounded-r-2xl p-2 mb-5 ">
            <b className="text-sm lg:text-lg text-white flex flex-row items-center">
              <Link to={"/pet"}> Thú cưng</Link> {<FaAngleRight></FaAngleRight>}{" "}
              {param && param.id === "6416ee5c33df1b92e7fb8351" ? "Chó" : "Mèo"}
            </b>
          </div>
          <p>
            <b className="bg-[#b8821e] text-xs lg:text-lg text-white flex flex-row items-center rounded-xl px-3 py-2">
              <a href="/pet" target="_black" title="See all">
                {" "}
                All{" >"}
              </a>
            </b>
          </p>
        </div>

        <div className="max-w-screen-xl mb-5 mx-auto">
          <div className="flex flex-wrap -mx-1 lg:-mx-1">
            {petList &&
              petList.map((item) => {
                function getRandomValue() {
                  const randomNumber = Math.random();
                  return randomNumber < 0.5 ? "Đực" : "Cái";
                }
                const randomValue = getRandomValue();
                return (
                  <Card
                    key={item._id}
                    id={item._id}
                    sex={randomValue}
                    src={item.thumb}
                    name={capitalizeAllWords(item.name)}
                    price={item.price}
                    from={item.subcategory.name}
                    age={item.subcategory.createdAt}
                  ></Card>
                );
              })}
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
