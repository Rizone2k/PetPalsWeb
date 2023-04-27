import React from "react";
import "./banner.scss";
import Button from "../button";
import { Link } from "react-router-dom";

function Banner(props) {
  return (
    <div className="parabolic-shape pb-5">
      <div className="flex flex-row items-center h-full">
        <div className="w-1/6"></div>
        <div className="w-2/6 flex flex-col justify-center items-end text-banner">
          <h4 className="xl:text-4xl lg:text-2lx py-2">
            Adopt cậu vàng, mồn lèo
          </h4>
          <h2 className="xl:text-5xl lg:text-3lx font-extrabold py-2">
            Số lượng có hạn
          </h2>
          <h5 className="xl:text-3xl lg:text-2lx py-2">mại dô mại dô...</h5>
          <div className="place-self-center py-5">
            <Link to={"/cat"}>
              <Button
                type={"button"}
                className={`btn-outline btn text-xs sm:text-sm md:text-lg `}
                onClick={null}
              >
                Xem Ngay
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-2/6 flex flex-row items-center justify-center py-5 img-banner">
          <img
            className="h-auto"
            width={"63%"}
            src={require("~/assets/cat.png")}
            alt="PetPals"
          />
          <img
            className="h-auto"
            width={"55%"}
            src={require("~/assets/dog.png")}
            alt="PetPals"
          />
        </div>
        <div className="w-1/6"></div>
      </div>
    </div>
  );
}

export default Banner;
