import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "~/redux/reducers/auth";

export const Config = (statusCode) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const checkSesstion = () => {
      dispatch(logout())
        .then(unwrapResult)
        .then(alert("Phiên đã hết hạn vui lòng đăng nhập lại!"))
        .then(navigate("/profile"))
        .catch((err) => console.log(err));
    };
    if (statusCode == 401) {
      checkSesstion();
    }
  }, []);
};

const instance = axios.create({
  baseURL: "http://petpals.supervps.ga/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] =
      "GET, PUT, DELETE, PATCH, OPTIONS";
    config.headers["Content-Type"] = "multipart/form-data";
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Truyền hàm navigate vào HandleUnauthorized
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error?.response?.status ?? null;
    if (statusCode === 401) {
      // const dispatch = useDispatch();

      Config(statusCode);
    } else {
      throw error;
    }
  }
);

export default instance;
