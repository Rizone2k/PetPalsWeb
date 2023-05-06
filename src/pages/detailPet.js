import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import petPalsAPI from "~/api/petPalsAPI";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import {
  FaAngleRight,
  FaHeart,
  FaMapMarkerAlt,
  FaMercury,
} from "react-icons/fa";
import Button from "~/components/button";
import Title from "./components/titles";
import Card from "./components/card";
import capitalizeAllWords from "./components/handleString";

function DetailPet(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [detailPet, setDetailPet] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [petId, setPetId] = useState(null);
  const param = useParams();

  //  random male or female
  function getRandomValue() {
    const randomNumber = Math.random();
    return randomNumber < 0.5 ? "Đực" : "Cái";
  }
  const randomValue = getRandomValue();

  useEffect(() => {
    const getDetailPet = async (param) => {
      try {
        const response = await petPalsAPI.getDetailPet(param);
        setDetailPet(response.data.data);
        setPetId(response.data.data.subcategory.category);
      } catch (error) {
        console.log(error);
      }
    };
    getDetailPet(param.id);
  }, [param]);

  useEffect(() => {
    const getRecommendPet = async () => {
      if (detailPet != null) {
        try {
          const responseRecommend = await petPalsAPI.getPetList(petId);
          setRecommend(responseRecommend.data.data);
          // console.log("recommend", recommend);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getRecommendPet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petId]);

  let img = [];
  detailPet ? (img = detailPet.images) : console.log("del có!");
  return (
    detailPet &&
    img && (
      <div className=" bg-[#f3f1cc]">
        <div className="w-full sm:w-1/2 md:w-3/5 bg-[#fdc243fd] rounded-r-2xl p-2 mb-5">
          <b className="text-sm lg:text-lg text-white flex flex-row items-center">
            <Link to={"/pet"}> Thú cưng</Link> {<FaAngleRight></FaAngleRight>}{" "}
            {detailPet.name}
          </b>
        </div>
        <div className="max-w-7xl mx-auto flex flex-row p-1 md:p-5 rounded-lg">
          <div className="img w-1/2 p-1 lg:p-5 max-w-lg">
            <>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fdc243e7",
                  "--swiper-pagination-color": "#fdc243e7",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {img.map((img, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        className="mx-auto"
                        src={img}
                        alt={detailPet.name}
                      ></img>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {img.map((img, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        className="mx-auto"
                        src={img}
                        alt={detailPet.name}
                      ></img>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </>
          </div>
          <div className="content w-1/2 bg-[#f9f7c3] rounded-2xl p-1 lg:p-5 shadow-md shadow-[#c5c3a3] ">
            <div className="name flex flex-col p-2 gap-5">
              <h1 className="text-md sm:text-xl lg:text-3xl font-extrabold">
                {detailPet.name}
              </h1>
              <div className="flex flex-row justify-between">
                <p className="text-md font-base">
                  {detailPet.subcategory.name}
                </p>
                <div className="flex flex-row justify-between items-center">
                  <FaMapMarkerAlt className="text-[#40d0fc] text-2xl"></FaMapMarkerAlt>
                  <p className="text-sm pl-2">Đà Nẵng</p>
                </div>
              </div>
            </div>
            <div className="price flex flex-row justify-between p-2 gap-5">
              <p className="text-md lg:text-xl flex flex-row items-center font-extrabold">
                <FaMercury className="text-[#40fc69] text-xl lg:text-2xl"></FaMercury>
                {"\u00A0"}
                {randomValue}
              </p>
              <p className="text-md lg:text-xl font-extrabold flex flex-row items-center">
                <span className="text-[#fab92d] text-xl lg:text-2xl">
                  ${"\u00A0"}
                </span>
                {detailPet.price}
              </p>
            </div>
            <div className="owner flex flex-row justify-between items-center p-2 gap-5 border border-t-[#dfc543cb]">
              <p className="text-md font-extrabold">Owner</p>
              <div className="owner flex flex-row items-center">
                <img
                  className="rounded-full"
                  width={"30px"}
                  src={detailPet.owner.avatar}
                  alt={detailPet.owner.username}
                />
                {"\u00A0"}
                <p>{detailPet.owner.username}</p>
              </div>
            </div>
            <div className="name flex flex-col p-2 gap-5">
              <div className="flex flex-row justify-end items-center p-2 gap-5">
                <Tippy content="Favorite" placement="bottom-start">
                  <p>
                    <FaHeart className="text-[#e47f98] hover:text-[#fd3668] text-2xl lg:text-4xl"></FaHeart>
                  </p>
                </Tippy>
                <Tippy content="Adopt it!" placement="bottom-start">
                  <div>
                    <Button
                      type={"button"}
                      onClick={null}
                      className="bg-[#f11141] text-white text-md md:text-lg font-extrabold p-2"
                    >
                      Adopt
                    </Button>
                  </div>
                </Tippy>
              </div>
              <div className="relative p-1 md:p-3 flex-auto overflow-auto max-h-80">
                <p className="text-md font-extrabold">Mô tả</p>

                <p
                  dangerouslySetInnerHTML={{ __html: detailPet.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
        <Title title={"Recommend"}></Title>
        <div className="max-w-screen-xl mb-5 mx-auto">
          <div className="flex flex-wrap -mx-1 lg:-mx-1">
            {recommend &&
              recommend.slice(3, 8).map((item) => {
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
              className="see-more bg-orange-200"
              title="See more"
              type={"button"}
            >
              <Link to={"/pet"}>Xem thêm {">>"}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

export default DetailPet;
