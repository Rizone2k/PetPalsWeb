import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response ? error.response.status : null;
    const navigate = useNavigate();
    console.log(statusCode);
    if (statusCode === 401) {
      Cookies.set("LOGGED", false);
      alert("Phiên đã hết hạn, vui lòng đăng nhập lại!") &&
        navigate("/profile");
    } else {
      throw error;
    }
  }
);

export default instance;
