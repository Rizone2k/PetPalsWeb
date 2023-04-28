import React from "react";
import "./home.scss";
import Banner from "~/components/banner";
import Title from "./components/titles";
import AdsCard from "./components/adsCard";
import Card from "./components/card";

export default function Home(props) {
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
          <Card
            src={
              "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            name={"Cẩu lương"}
            form={"Bình Dương"}
            age={"102"}
            male={"Đực"}
          ></Card>
          <Card
            src={
              "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            name={"Cẩu lương"}
            form={"Bình Dương"}
            age={"102"}
            male={"Đực"}
          ></Card>
          <Card
            src={
              "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            }
            name={"Cẩu lương"}
            form={"Bình Dương"}
            age={"102"}
            male={"Đực"}
          ></Card>
          <Card
            src={
              "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            }
            name={"Cẩu lương"}
            form={"Bình Dương"}
            age={"102"}
            male={"Đực"}
          ></Card>
          <Card
            src={
              "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            name={"Cẩu lương"}
            form={"Bình Dương"}
            age={"102"}
            male={"Đực"}
          ></Card>
        </div>
      </div>
      <Title title={"Mèo"}></Title>
      <div className="max-w-screen-xl my-0 mx-auto">
        <div className="flex flex-wrap -mx-1 lg:-mx-1">
          <Card
            src={
              "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            name={"Cẩu lương"}
            form={"Bình Dương"}
            age={"102"}
            male={"Đực"}
          ></Card>
          <Card
            src={
              "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            name={"Cẩu lương"}
            form={"Bình Dương"}
            age={"102"}
            male={"Đực"}
          ></Card>
          <Card
            src={
              "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            }
            name={"Cẩu lương"}
            form={"Bình Dương"}
            age={"102"}
            male={"Đực"}
          ></Card>
          <Card
            src={
              "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            }
            name={"Cẩu lương"}
            form={"Bình Dương"}
            age={"102"}
            male={"Đực"}
          ></Card>
          <Card
            src={
              "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            name={"Cẩu lương"}
            form={"Bình Dương"}
            age={"102"}
            male={"Đực"}
          ></Card>
        </div>
      </div>
    </div>
  );
}
