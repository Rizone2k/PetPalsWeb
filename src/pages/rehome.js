import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import petPalsAPI from "~/api/petPalsAPI";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import {
  FaAngleRight,
  FaHeart,
  FaMapMarkerAlt,
  FaMercury,
  FaShoppingBasket,
} from "react-icons/fa";
import Button from "~/components/button";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { currentUserSelector } from "~/redux/selectors";

export default function Rehome() {
  const currentUser = useSelector(currentUserSelector);
  const [addPetName, setAddPetName] = useState("");
  const [addPetPrice, setAddPetPrice] = useState(0);
  const [addPetCategory, setPetCategory] = useState("6416ee6433df1b92e7fb8354");
  const [addPetSubcategory, setAddPetSubcategory] = useState("");
  const [addPetDescription, setAddPetDescription] = useState("");
  const [addPetImages, setAddPetImages] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [itemDog, setItemDog] = useState([]);
  const [itemCat, setItemCat] = useState([]);
  console.log(itemDog, itemCat);
  console.log(addPetImages);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const handleRehome = async () => {
    console.log(
      "idUser:",
      currentUser.id,
      addPetName,
      addPetPrice,
      addPetCategory,
      addPetSubcategory,
      addPetDescription,
      addPetImages
    );
    try {
      if (
        addPetName.length >= 3 &&
        addPetPrice >= 1 &&
        addPetCategory.length >= 3 &&
        addPetSubcategory.length >= 3 &&
        addPetDescription.length >= 3 &&
        addPetImages.length >= 1
      ) {
        const rs = await petPalsAPI.addPet({
          idUser: currentUser.id,
          name: addPetName,
          price: addPetPrice,
          category: addPetCategory,
          subcategory: addPetSubcategory,
          description: addPetDescription,
          images: addPetImages,
        });
        console.log(rs);
        if (rs.data.status === "success") {
          if (rs.data.data.status === "success") {
            alert("Done!");
            console.log("oke");
            setAddPetDescription("");
            setAddPetImages([]);
            setAddPetName("");
            setAddPetPrice(0);
          } else {
            alert("Đéo ổn");
          }
        } else {
          console.log(rs.data);
        }
      } else {
        alert("Vui lòng nhập đủ thông tin!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPet = async (category, pet) => {
      try {
        const param = category;
        const response = await petPalsAPI.getPetCategory(param);
        pet(response.data.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    getPet("6416ee6433df1b92e7fb8354", setItemCat);
    getPet("6416ee5c33df1b92e7fb8351", setItemDog);
  }, []);

  return (
    itemCat &&
    itemDog && (
      <div className=" bg-[#f3f1cc]">
        <div className="w-full sm:w-1/2 md:w-3/5 bg-[#fdc243fd] rounded-r-2xl p-2 mb-5">
          <b className="text-sm lg:text-lg text-white flex flex-row items-center">
            Rehome
          </b>
        </div>
        <h1 className="text-md sm:text-md lg:text-lg font-semibold px-3">
          *Bạn vui lòng cung cấp các thông tin để tìm chủ nhân mới cho thú cưng
          qua các bước đơn gian sau:
        </h1>
        <div className="flex flex-col justify-center items-center w-full  bg-[#fafae5c8] rounded-2xl my-5 lg:p-5 shadow-md shadow-[#c5c3a3] ">
          <div className="flex flex-row gap-5 justify-center items-center w-11/12">
            <div className="name w-1/3 p-2">
              <label
                htmlFor="discount"
                className="pr-3 text-base text-blue-600"
              >
                1. Tên thú cưng
              </label>
              <input
                type="text"
                id="discount"
                name="paymentMethod"
                placeholder="Tên thú cưng"
                onChange={(e) => setAddPetName(e.target.value)}
                value={addPetName}
                className="px-3 py-2 rounded-lg border-2 border-orange-200"
              />
            </div>
            <div className="name w-1/3 p-2">
              <label
                htmlFor="discount"
                className="pr-3 text-base text-blue-600"
              >
                2. Chi phí (giá)
              </label>
              <input
                type="text"
                id="discount"
                name="paymentMethod"
                placeholder="Phí"
                onChange={(e) => setAddPetPrice(e.target.value)}
                value={addPetPrice}
                className="px-3 py-2 rounded-lg border-2 border-orange-200"
              />
            </div>
            <div className="name w-1/3 p-2"></div>
          </div>
          <div className="flex flex-row gap-5 justify-center items-center w-11/12">
            <div className="name w-1/3 p-2">
              <label
                htmlFor="discount"
                className="pr-3 text-base text-blue-600"
              >
                3. Thú cưng
              </label>
              <div className="relative inline-block text-left">
                <div className="px-3 py-2 rounded-lg border-2 border-orange-200">
                  <button
                    type="button"
                    onClick={() => setShowCategory(!showCategory)}
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Loại thú cưng
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ${
                    showCategory ? "" : "hidden"
                  }`}
                >
                  <div className="py-1" role="none">
                    <ul>
                      <li
                        className="px-3 py-1 border border-b-[#383737a4]"
                        onClick={(e) => {
                          setPetCategory("6416ee5c33df1b92e7fb8351");
                          console.log(e.target.innerText);
                          setShowCategory(false);
                        }}
                      >
                        Chó
                      </li>
                      <li
                        className="px-3 py-1 border border-b-[#383737a4]"
                        onClick={(e) => {
                          setPetCategory("6416ee6433df1b92e7fb8354");
                          console.log(e.target.innerText);
                          setShowCategory(false);
                        }}
                      >
                        Mèo
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="name w-1/3 p-2">
              <label
                htmlFor="discount"
                className="pr-3 text-base text-blue-600"
              >
                4. Giống thú cưng
              </label>
              <div className="relative inline-block text-left">
                <div className="px-3 py-2 rounded-lg border-2 border-orange-200">
                  <button
                    type="button"
                    onClick={() => setShowSubCategory(!showSubCategory)}
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Giống thú cưng
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ${
                    showSubCategory ? "" : "hidden"
                  }`}
                >
                  <div className="py-1" role="none">
                    <ul className="h-[50vh] overflow-auto">
                      {addPetCategory === "6416ee6433df1b92e7fb8354"
                        ? itemCat?.subcategory?.map((e) => (
                            <li
                              className="px-3 py-1 border border-b-[#383737a4]"
                              onClick={(e) => {
                                setAddPetSubcategory(e._id);
                                console.log(e.name);
                                setShowSubCategory(false);
                              }}
                            >
                              {e.name}
                            </li>
                          ))
                        : itemDog?.subcategory?.map((e) => (
                            <li
                              className="px-3 py-1 border border-b-[#383737a4]"
                              onClick={() => {
                                setAddPetSubcategory(e._id);
                                console.log(e.name);
                                setShowSubCategory(false);
                              }}
                            >
                              {e.name}
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="name w-1/3 p-2"></div>
          </div>
          <div className="flex flex-row gap-5 justify-center items-center w-11/12">
            <div className="w-full p-2">
              <label htmlFor="img" className="pr-3 text-base text-blue-600">
                5. Ảnh minh hoạ (bạn đã chọn {addPetImages.length} ảnh)
                <input
                  type="file"
                  id="img"
                  name="img"
                  multiple
                  placeholder="Chọn ảnh thú cưng"
                  accept="image/*"
                  onChange={(e) => {
                    setAddPetImages([
                      ...addPetImages,
                      ...Array.from(e.target.files),
                    ]);
                    console.log(e.target.files);
                  }}
                  className="px-3 py-2 max-w-full rounded-lg border-2 border-orange-200"
                />
              </label>
            </div>
            <div className="name w-1/3 p-2"></div>
          </div>
        </div>
        <label htmlFor="discount" className="pl-10 text-base text-blue-600">
          6. Mô tả
        </label>
        <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-3 py-1 rounded-lg bg-[#f9f8e0c8] p-1 lg:p-5 shadow-md min-h-[50vh]">
          <div className=" w-full md:w-1/2 p-1 lg:p-5  bg-[#fdfddcc8] shadow-md shadow-[#c5c3a3] rounded-2xl">
            <div className="h-full">
              <h3 className="text-md sm:text-md lg:text-lg font-medium">
                Editor
              </h3>
              <ReactQuill
                theme="snow"
                value={addPetDescription}
                modules={modules}
                onChange={setAddPetDescription}
                placeholder="Bạn có thể viết mô tả cho thú cưng ở đây..."
              />
            </div>
          </div>
          <div className="content w-full md:w-1/2 bg-[#faf9cdc8] rounded-2xl p-1 lg:p-5 shadow-md shadow-[#c5c3a3]">
            <h3 className="text-md sm:text-md lg:text-lg font-medium">
              Preview
            </h3>
            <div className="name flex flex-col p-2 gap-5 break-all">
              {addPetDescription}
            </div>

            <div className="name flex flex-col p-2 gap-5">
              <div className="flex flex-row justify-end items-center p-2 gap-5">
                <Tippy content="Hoàn tất!" placement="bottom-start">
                  <div>
                    <Button
                      type={"button"}
                      onClick={handleRehome}
                      className="bg-[#0ce495] text-white text-md md:text-lg font-extrabold p-2"
                    >
                      Xong
                    </Button>
                  </div>
                </Tippy>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
