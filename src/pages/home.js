import React, { useEffect, useState } from "react";
import Banner from "~/components/banner";
import Title from "./components/titles";
import AdsCard from "./components/adsCard";
import Card from "./components/card";
import petPalsAPI from "../api/petPalsAPI";
import Button from "~/components/button";
import { Link } from "react-router-dom";
import capitalizeAllWords from "./components/handleString";

// push to redeploy

export default function Home(props) {
  const [itemDog, setItemDog] = useState([]);
  const [itemCat, setItemCat] = useState([]);
  useEffect(() => {
    const getDog = async (category, pet) => {
      try {
        const param = category;
        const response = await petPalsAPI.getPetList(param);
        pet(response.data.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    getDog("6416ee5c33df1b92e7fb8351", setItemDog);
    getDog("6416ee6433df1b92e7fb8354", setItemCat);
  }, []);
  return (
    <div className="">
      <Banner></Banner>
      <Title title={"Thú cưng và các phụ kiện"}></Title>
      <div className="flex flex-row justify-around items-center gap-5 py-5 px-2 lg:px-12 mx-auto max-w-[90%]">
        <AdsCard
          title={"Chó"}
          content={
            "Bạn muốn có một thú cưng hay một người bạn. Nhanh tay nhận nuôi một chú chó dễ thương thay cho một người khác."
          }
        >
          <img src={require("../assets/dogAdsCard.jpg")} alt="Dog" />
        </AdsCard>
        <AdsCard
          title={"Mèo"}
          content={
            "Bạn muốn có một thú cưng hay một người bạn. Nhanh tay nhận nuôi một chú mèo dễ thương thay cho một người khác."
          }
        >
          <img src={require("../assets/catAdsCard.jpg")} alt="Cat" />
        </AdsCard>
        <AdsCard
          title={"Phụ kiện"}
          content={
            "Bạn muốn tìm cho thú cưng những thứ hữu ích như một món quà. Nhanh tay tìm kiếm sản phẩm phụ kiện dành cho thú cưng."
          }
        >
          <img
            src={require("../assets/accessoryAdsCard.jpg")}
            alt="Accessory"
          />
        </AdsCard>
      </div>
      <Title title={"Chó"}></Title>
      <div className="max-w-screen-xl mb-5 mx-auto">
        <div className="flex flex-wrap -mx-1 lg:-mx-1">
          {itemDog &&
            itemDog.map((item) => {
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
        <div className="flex w-full justify-end items-end">
          <Button
            className="see-more bg-orange-200 text-black"
            title="See more"
            type={"button"}
          >
            <Link to={"/pet/6416ee5c33df1b92e7fb8351"}>
              <p className="font-semibold text-sm">Xem thêm</p>
            </Link>
          </Button>
        </div>
      </div>
      <Title title={"Mèo"}></Title>
      <div className="max-w-screen-xl mb-5 mx-auto">
        <div className="flex flex-wrap -mx-1 lg:-mx-1">
          {itemCat &&
            itemCat.map((item) => {
              function getRandomValue() {
                const randomNumber = Math.random();
                return randomNumber < 0.5 ? "Đực" : "Cái";
              }
              const randomValue = getRandomValue();
              return (
                <Card
                  key={item._id}
                  id={item._id}
                  src={item.thumb}
                  name={capitalizeAllWords(item.name)}
                  price={item.price}
                  from={item.subcategory.name}
                  sex={randomValue}
                  age={item.subcategory.createdAt}
                ></Card>
              );
            })}
        </div>
        <div className="flex w-full justify-end items-end">
          <Button
            className="see-more bg-orange-200 text-black"
            title="See more"
            type={"button"}
          >
            <Link to={"/pet/6416ee6433df1b92e7fb8354"}>
              <p className="font-semibold text-sm">Xem thêm</p>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
