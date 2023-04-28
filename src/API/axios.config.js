import axios from "axios";
import Cookies from "js-cookie";

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

export default instance;
