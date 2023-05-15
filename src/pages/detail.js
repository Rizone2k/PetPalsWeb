import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  FaShoppingBasket,
} from "react-icons/fa";
import Button from "~/components/button";
import Title from "./components/titles";
import Card from "./components/card";
import capitalizeAllWords from "./components/handleString";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSelector, isLoggedInSelector } from "~/redux/selectors";
import { addCart } from "~/redux/reducers/auth";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Detail() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [detail, setDetail] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const navigate = useNavigate();
  const [petId, setPetId] = useState(null);
  const param = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);

  //  random male or female
  const randomValue = () => {
    const randomNumber = Math.random();
    return randomNumber < 0.5 ? "Đực" : "Cái";
  };
  randomValue();
  // console.log("currentUser", param.id);

  const handleAddCart = () => {
    if (isLoggedIn) {
      dispatch(
        addCart({
          idUser: currentUser.id,
          idProduct: param.id,
          quantity: 1,
        })
      )
        .then(unwrapResult)
        .then(() => {
          alert("Thêm thành công");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Đăng nhập đi bé ơi!");
      navigate("/profile");
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      try {
        let response;
        if (param && param.id) {
          if (param.param === "pet") {
            response = await petPalsAPI.getDetailPet(param.id);
            setDetail(response.data.data);
            setPetId(response.data.data.subcategory.category);
          } else if (param.param === "product") {
            response = await petPalsAPI.getDetailProduct(param.id);
            setDetail(response.data.data);
            setPetId(response.data.data.subitem._id);
          } else {
            navigate("/");
          }

          // console.log(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  // Get List pet recommend
  useEffect(() => {
    const getRecommendPet = async () => {
      if (detail != null) {
        try {
          let responseRecommend;
          param.param === "pet"
            ? (responseRecommend = await petPalsAPI.getPetList(petId))
            : (responseRecommend = await petPalsAPI.getProductList(petId));
          setRecommend(responseRecommend.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getRecommendPet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petId]);

  let img = [];
  detail ? (img = detail.images) : console.log("del có!");
  return (
    detail &&
    img && (
      <div className=" bg-[#f3f1cc]">
        <div className="w-full sm:w-1/2 md:w-3/5 bg-[#fdc243fd] rounded-r-2xl p-2 mb-5">
          <b className="text-sm lg:text-lg text-white flex flex-row items-center">
            {param.param === "pet" ? (
              <Link to={"/pet"}> Thú cưng</Link>
            ) : (
              <Link to={"/product"}> Sản phẩm</Link>
            )}
            {<FaAngleRight></FaAngleRight>} {detail.name}
          </b>
        </div>
        <div className="max-w-7xl mx-auto flex flex-row p-1 md:p-5 rounded-lg">
          <div className="img w-1/2 p-1 lg:p-5 max-w-lg">
            {param.param === "pet" ? (
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
                          alt={detail.name}
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
                          alt={detail.name}
                        ></img>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </>
            ) : (
              <img src={img[0]} alt="" />
            )}
          </div>
          <div className="content w-1/2 bg-[#f9f7c3] rounded-2xl p-1 lg:p-5 shadow-md shadow-[#c5c3a3] ">
            <div className="name flex flex-col p-2 gap-5">
              <h1 className="text-md sm:text-xl lg:text-3xl font-extrabold">
                {detail.name}
              </h1>
              <div className="flex flex-row justify-between">
                <p className="text-md font-base">
                  {param.param === "pet"
                    ? detail.subcategory.name
                    : detail.name}
                </p>
                <div className="flex flex-row justify-between items-center">
                  <FaMapMarkerAlt className="text-[#40d0fc] text-2xl"></FaMapMarkerAlt>
                  <p className="text-sm pl-2">Đà Nẵng</p>
                </div>
              </div>
            </div>
            <div className="price flex flex-row justify-between p-2 gap-5">
              {param.param === "pet" && (
                <p className="text-md lg:text-xl flex flex-row items-center font-extrabold">
                  <FaMercury className="text-[#40fc69] text-xl lg:text-2xl"></FaMercury>
                  {"\u00A0"}
                  {randomValue}
                </p>
              )}
              <p className="text-md lg:text-xl font-extrabold flex flex-row items-center">
                <span className="text-[#fab92d] text-xl lg:text-2xl">
                  ${"\u00A0"}
                </span>
                {detail.price.toLocaleString()}
              </p>
            </div>
            {param.param === "pet" && (
              <div className="owner flex flex-row justify-between items-center p-2 gap-5 border border-t-[#dfc543cb]">
                <p className="text-md font-extrabold">Owner</p>
                <div className="owner flex flex-row items-center">
                  <img
                    className="rounded-full"
                    width={"30px"}
                    src={detail.owner.avatar}
                    alt={detail.owner.username}
                  />
                  {"\u00A0"}
                  <p>{detail.owner.username}</p>
                </div>
              </div>
            )}
            <div className="name flex flex-col p-2 gap-5">
              <div className="flex flex-row justify-end items-center p-2 gap-5">
                <Tippy content="Yêu thích" placement="bottom-start">
                  <p>
                    <FaHeart className="text-[#e47f98] hover:text-[#fd3668] text-2xl lg:text-4xl"></FaHeart>
                  </p>
                </Tippy>
                {param.param === "pet" ? (
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
                ) : (
                  <Tippy content="Thêm vào giỏ" placement="bottom-start">
                    <div>
                      <Button
                        type={"button"}
                        onClick={handleAddCart}
                        className="bg-[#0ce495] text-white text-md md:text-lg font-extrabold p-2"
                      >
                        <FaShoppingBasket className="m-1.5" />
                      </Button>
                    </div>
                  </Tippy>
                )}
              </div>
              <div className="relative p-1 md:p-3 flex-auto overflow-auto max-h-80">
                <p className="text-md font-extrabold">Mô tả</p>

                <p dangerouslySetInnerHTML={{ __html: detail.description }}></p>
              </div>
            </div>
          </div>
        </div>
        <Title title={"Recommend"}></Title>
        <div className="max-w-screen-xl mb-5 mx-auto">
          <div className="flex flex-wrap -mx-1 lg:-mx-1">
            {recommend &&
              recommend.slice(-6, -1).map((item) => {
                function getRandomValue() {
                  const randomNumber = Math.random();
                  return randomNumber < 0.5 ? "Đực" : "Cái";
                }
                const randomValue = getRandomValue();
                return (
                  <Card
                    key={item._id}
                    id={item._id}
                    sex={param.param === "pet" && randomValue}
                    src={item.thumb}
                    name={capitalizeAllWords(item.name)}
                    price={item.price}
                    from={param.param === "pet" && item.subcategory.name}
                    age={param.param === "pet" && item.subcategory.createdAt}
                  ></Card>
                );
              })}
          </div>
        </div>
      </div>
    )
  );
}
