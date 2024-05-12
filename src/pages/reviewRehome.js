import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import petPalsAPI from "~/api/petPalsAPI";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { FaEdit } from "react-icons/fa";
import Button from "~/components/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { currentUserSelector, isLoggedInSelector } from "~/redux/selectors";

export default function ReviewRehome() {
  const currentUser = useSelector(currentUserSelector);
  const [addPetName, setAddPetName] = useState("");
  const [addPetPrice, setAddPetPrice] = useState(0);
  const [addPetCategory, setPetCategory] = useState("6416ee6433df1b92e7fb8354");
  const isLogin = useSelector(isLoggedInSelector);
  const [addPetSubcategory, setAddPetSubcategory] = useState("");
  const [addPetSubcategoryName, setAddPetSubcategoryName] = useState("");
  const [addPetDescription, setAddPetDescription] = useState("");
  const [addPetImagesFromUser, setAddPetImagesFromUser] = useState([]);
  const [addPetImages, setAddPetImages] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [itemDog, setItemDog] = useState([]);
  const [itemCat, setItemCat] = useState([]);
  const [petPosted, setPetPosted] = useState([]);
  const [openCollapse, setOpenCollapse] = useState(true);
  const [update, setUpdate] = useState(true);
  const [petPostedSelectedId, setPetPostedSelectedId] = useState("");
  const [petPostedSelected, setPetPostedSelected] = useState("");
  const ID_Cat = "6416ee6433df1b92e7fb8354";
  const ID_Dog = "6416ee5c33df1b92e7fb8351";
  const navigate = useNavigate();

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

  const handleEditRehome = async () => {
    try {
      if (
        addPetName.length >= 3 &&
        addPetPrice >= 1 &&
        addPetCategory.length >= 3 &&
        addPetSubcategory.length >= 3 &&
        addPetDescription.length >= 3 &&
        addPetImagesFromUser.length >= 1
      ) {
        const rs = await petPalsAPI.updatePetPosted(
          {
            idUser: currentUser.id,
            name: addPetName,
            price: addPetPrice,
            description: addPetDescription,
            category: addPetCategory,
            subcategory: addPetSubcategory,
            images: addPetImagesFromUser,
          },
          petPostedSelectedId
        );
        if (rs.data.status === "success") {
          setUpdate(!update);
          alert("Oke đã update!");
        } else {
          console.log("Error!");
        }
      } else {
        alert("Vui lòng nhập đủ thông tin!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePetImagesPosted = async (e) => {
    try {
      if (e.length >= 1) {
        const rs = await petPalsAPI.deletePetImagesPosted(
          {
            idUser: currentUser.id,
            image: e,
          },
          petPostedSelectedId
        );
        if (rs.data.status === "success") {
          setUpdate(!update);
          alert("Oke đã update!");
        } else {
        }
      } else {
        alert("Vui lòng nhập đủ thông tin!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let result = petPosted.filter((item) => item._id == petPostedSelectedId);
    setPetPostedSelected(result[0]);
  }, [petPosted, petPostedSelectedId, update]);

  useEffect(() => {
    if (petPostedSelected) {
      setAddPetName(petPostedSelected?.name ?? "");
      setAddPetPrice(petPostedSelected?.price ?? "");
      setPetCategory(petPostedSelected?.category?._id ?? "");
      setAddPetSubcategory(petPostedSelected?.subcategory?._id ?? "");
      setAddPetSubcategoryName(petPostedSelected?.subcategory?.name ?? "");
      setAddPetDescription(petPostedSelected?.description ?? "");
      setAddPetImages(petPostedSelected?.images ?? "");
    }
  }, [petPostedSelected, update]);

  useEffect(() => {
    const getPetPosted = async () => {
      const res = await petPalsAPI.getPetPosted(currentUser.id);
      setPetPosted(res.data.data);
    };
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
    getPet(ID_Cat, setItemCat);
    getPet(ID_Dog, setItemDog);
    currentUser?.id && getPetPosted();
  }, [currentUser.id, update]);

  const HandleTime = (dateTimeString) => {
    const duration = moment.duration(
      moment().diff(moment(dateTimeString.dateTimeString))
    );
    if (duration.asHours() > 24) {
      return <p>{`${parseInt(duration.asDays())} ngày trước`}</p>;
    } else {
      return <p>{`${parseInt(duration.asHours())} giờ trước`}</p>;
    }
  };

  // isLogin
  return isLogin
    ? itemCat && itemDog && (
        <div className=" bg-[#f8f7ddbf] min-h-[70vh]">
          <div className="w-full sm:w-1/2 md:w-3/5 bg-[#fdc243fd] rounded-r-2xl p-2 mb-5">
            <b className="text-sm lg:text-lg text-white flex flex-row items-center">
              Review rehome my pet
            </b>
          </div>

          <div className="md:w-3/4 w-full mx-auto shadow-[#9a6f55a4] relative md:p-6 p-1 shadow-lg rounded-xl">
            <p className="flex justify-between items-center px-5">
              <b>Đã đăng</b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  openCollapse === true ? "rotate-180" : ""
                } h-5 w-5 transition-transform`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => setOpenCollapse(!openCollapse)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </p>
            <div
              className={`flex-auto overflow-auto max-h-80 ${
                openCollapse === false ? "h-20" : ""
              }`}
            >
              <table className="w-full">
                <thead>
                  <tr className="rounded-t-sm">
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {petPosted &&
                    petPosted.map((item) => (
                      <tr key={item._id}>
                        <td className="py-2 w-1/12">
                          <img
                            className="rounded"
                            width={"50"}
                            src={item.thumb}
                            alt="pet"
                          />
                        </td>
                        <td className="w-4/12">
                          <p className="text-xs md:text-base overview-one">
                            {item.name}
                          </p>
                        </td>
                        <td className="w-2/12">
                          <p className="text-[#1f396a] overview-one text-xs md:text-base">
                            {item.price.toLocaleString()}
                          </p>
                        </td>
                        <td className="w-3/12 text-xs md:text-base">
                          <HandleTime
                            dateTimeString={item.updatedAt}
                          ></HandleTime>
                        </td>
                        <td className="w-1/12">
                          <Tippy
                            placement="bottom"
                            content="Đang chờ nhận nuôi"
                          >
                            <span>
                              <Button className="bg-[#c64923] text-xs md:text-base font-bold text-white">
                                Sale
                              </Button>
                            </span>
                          </Tippy>
                        </td>
                        <td className="w-1/12">
                          <Tippy placement="bottom" content="Chỉnh sửa">
                            <span>
                              <Button
                                onClick={() => setPetPostedSelectedId(item._id)}
                                className="text-center text-xs md:text-base border-2 border-[#12c492]"
                              >
                                <FaEdit className="text-[#12c492]"></FaEdit>
                              </Button>
                            </span>
                          </Tippy>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {petPostedSelectedId !== "" ? (
            <div>
              <div className="flex flex-col gap-5 w-11/12 mx-auto bg-[#f9f8e0c8] rounded-lg shadow-md p-5 mb-3">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <div className="flex items-center p-2">
                    <label
                      htmlFor="discount"
                      className="w-10/12 text-base text-[black]"
                    >
                      <span className="pr-3"> 1. Tên thú cưng</span>
                      <input
                        type="text"
                        id="discount"
                        name="paymentMethod"
                        placeholder="Tên thú cưng"
                        onChange={(e) => setAddPetName(e.target.value)}
                        value={addPetName}
                        className="w-full px-3 py-2 rounded-lg border-2 border-orange-200"
                      />
                    </label>
                  </div>
                  <div className="flex items-center p-2">
                    <label
                      htmlFor="discount"
                      className="w-10/12 pr-3 text-base text-[black]"
                    >
                      <span className="pr-3"> 2. Chi phí (giá)</span>
                      <input
                        type="text"
                        id="discount"
                        name="paymentMethod"
                        placeholder="Phí"
                        onChange={(e) => setAddPetPrice(e.target.value)}
                        value={addPetPrice}
                        className="w-full px-3 py-2 rounded-lg border-2 border-orange-200"
                      />
                    </label>
                  </div>
                  <div className="flex items-center p-2">
                    <p className="pr-3 text-base text-[black]">3. Thú cưng</p>
                    <div className="relative inline-block text-left">
                      <div className="px-3 py-2 rounded-lg border-2 border-orange-200">
                        <button
                          type="button"
                          onClick={() => setShowCategory(!showCategory)}
                          className="cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          {addPetCategory === "6416ee5c33df1b92e7fb8351"
                            ? "Chó"
                            : "Mèo"}
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
                              className="px-3 py-1 border border-b-[#383737a4] cursor-pointer"
                              onClick={(e) => {
                                setPetCategory("6416ee5c33df1b92e7fb8351");
                                setAddPetSubcategoryName("");
                                setShowCategory(false);
                              }}
                            >
                              Chó
                            </li>
                            <li
                              className="px-3 py-1 border border-b-[#383737a4] cursor-pointer"
                              onClick={(e) => {
                                setPetCategory("6416ee6433df1b92e7fb8354");
                                setAddPetSubcategoryName("");
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
                  <div className="flex items-center p-2">
                    <p className="pr-3 text-base text-[black]">
                      4. Giống thú cưng
                    </p>
                    <div className="relative inline-block text-left">
                      <div className="px-3 py-2 rounded-lg border-2 border-orange-200">
                        <button
                          type="button"
                          onClick={() => setShowSubCategory(!showSubCategory)}
                          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          {addPetSubcategoryName && addPetSubcategory !== ""
                            ? addPetSubcategoryName
                            : "Giống thú cưng"}

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
                                    key={e._id}
                                    className="px-3 py-1 border border-b-[#383737a4] cursor-pointer"
                                    onClick={() => {
                                      setAddPetSubcategory(e._id);
                                      setAddPetSubcategoryName(e.name);
                                      setShowSubCategory(false);
                                    }}
                                  >
                                    {e.name}
                                  </li>
                                ))
                              : itemDog?.subcategory?.map((e) => (
                                  <li
                                    key={e._id}
                                    className="px-3 py-1 border border-b-[#383737a4] cursor-pointer"
                                    onClick={() => {
                                      setAddPetSubcategory(e._id);
                                      setAddPetSubcategoryName(e.name);
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
                </div>
                <div className="flex items-center p-2">
                  <div className="w-1/3">
                    <label
                      htmlFor="img"
                      className="flex flex-col max-w-[95%] text-base text-[black]"
                    >
                      5. Ảnh minh hoạ (bạn đã chọn {addPetImages.length} ảnh)
                      <input
                        type="file"
                        id="img"
                        name="img"
                        multiple
                        placeholder="Chọn ảnh thú cưng"
                        accept="image/*"
                        onChange={(e) => {
                          setAddPetImagesFromUser([
                            ...addPetImagesFromUser,
                            ...Array.from(e.target.files),
                          ]);
                        }}
                        className="px-3 py-2 max-w-full rounded-lg border-2 border-orange-200"
                      />
                    </label>
                    <small>
                      *<u>Lưu ý</u>: Ảnh sẽ được tự động cập nhật khi có thay
                      đổi
                    </small>
                  </div>

                  <div className="flex flex-row w-2/3 items-center gap-5 overflow-x-auto">
                    {addPetImages.map((e) => (
                      <span
                        className="relative bg-[#fbc76ec2] p-1 shadow-slate-700 shadow-md"
                        key={e}
                      >
                        <img
                          width={100}
                          src={`http://petpals.supervps.ga/media/image/${e}`}
                          alt="a"
                        />
                        <Tippy content="Loại bỏ">
                          <b
                            className="cursor-pointer absolute top-0 right-1 text-[#620707d7]"
                            onClick={() => handleDeletePetImagesPosted(e)}
                          >
                            X
                          </b>
                        </Tippy>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="w-11/12 mx-auto pl-5 text-base text-[#4f2110]">
                6. Mô tả
              </p>
              <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-3 rounded-lg bg-[#f9f8e0c8] p-3 lg:p-5 shadow-md min-h-[50vh]">
                <div className=" w-full md:w-1/2 p-1 lg:p-5  bg-[#fdfddcc8] shadow-md shadow-[#c5c3a3] rounded-2xl">
                  <div className="h-full ">
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
                  <div className=" flex flex-col p-2 gap-5 break-all max-h-[100vh] overflow-y-auto overflow-x-hidden">
                    {addPetDescription}
                  </div>

                  <div className=" flex flex-col p-2 gap-5">
                    <div className="flex flex-row justify-end items-center p-2 gap-5">
                      <Tippy content="Hoàn tất!" placement="bottom-start">
                        <div>
                          <Button
                            type={"button"}
                            onClick={handleEditRehome}
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
          ) : null}
        </div>
      )
    : navigate("/profile");
}
