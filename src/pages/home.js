import React, { useEffect, useState } from "react";
import "./home.scss";
import Banner from "~/components/banner";
import Title from "./components/titles";
import AdsCard from "./components/adsCard";
import Card from "./components/card";
import petpalsAPI from "../api/petpalsAPI";

// push to redeploy

export default function Home(props) {
  const [itemDog, setItemDog] = useState([]);
  const [itemCat, setItemCat] = useState([]);
  console.log(itemDog);
  useEffect(() => {
    const getDog = async (category, pet) => {
      try {
        const param = category;
        const response = await petpalsAPI.getPetList(param);
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
      <div className="flex flex-row justify-around items-center gap-5 py-5 px-2 lg:px-12">
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
      <div className="max-w-screen-xl my-0 mx-auto">
        <div className="flex flex-wrap -mx-1 lg:-mx-1">
          {itemDog &&
            itemDog.map((item) => {
              console.log(item);
              return (
                <Card
                  src={item.thumb}
                  name={item.name}
                  price={item.price}
                  from={item.subcategory.name}
                  age={item.subcategory.createdAt}
                ></Card>
              );
            })}
        </div>
      </div>
      <Title title={"Mèo"}></Title>
      <div className="max-w-screen-xl my-0 mx-auto">
        <div className="flex flex-wrap -mx-1 lg:-mx-1">
          {itemCat &&
            itemCat.map((item) => {
              return (
                <Card
                  src={item.thumb}
                  name={item.name}
                  price={item.price}
                  from={item.subcategory.name}
                  age={item.subcategory.createdAt}
                ></Card>
              );
            })}
        </div>
      </div>
    </div>
  );
}
