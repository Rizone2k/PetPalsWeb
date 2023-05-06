import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// import * as SecureStore from "expo-secure-store";
import instance from "~/api/axios.config";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: Cookies.get("LOGGED") === "true",
    currentUser: Cookies.get("INFO") ? JSON.parse(Cookies.get("INFO")) : [],
    cart: Cookies.get("SHOP") ? JSON.parse(Cookies.get("SHOP")) : [],
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload.user;
        state.cart = action.payload.cart;
        Cookies.set("LOGGED", JSON.stringify(state.isLoggedIn), { expires: 1 });
        Cookies.set("SHOP", JSON.stringify(state.cart), { expires: 1 });
        Cookies.set("INFO", JSON.stringify(state.currentUser), { expires: 1 });
        const total = action.payload.cart.reduce(
          (sum, { quantity, product }) =>
            sum + parseInt(quantity * product.price),
          0
        );
        state.total = total;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.currentUser = {};
        state.cart = [];
        Cookies.set("LOGGED", JSON.stringify(state.isLoggedIn), { expires: 1 });
        Cookies.set("SHOP", JSON.stringify(state.cart), { expires: 1 });
        Cookies.set("INFO", JSON.stringify(state.currentUser), { expires: 1 });
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload;
        Cookies.set("INFO", JSON.stringify(state.currentUser), { expires: 1 });
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        Cookies.set("INFO", JSON.stringify(state.currentUser), { expires: 1 });
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        Cookies.set("SHOP", JSON.stringify(state.cart), { expires: 1 });
        const total = action.payload.cart.reduce(
          (sum, { quantity, product }) =>
            sum + parseInt(quantity * product.price),
          0
        );
        state.total = total;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        Cookies.set("SHOP", JSON.stringify(state.cart), { expires: 1 });
        const total = action.payload.cart.reduce(
          (sum, { quantity, product }) =>
            sum + parseInt(quantity * product.price),
          0
        );
        state.total = total;
      })
      .addCase(clear.fulfilled, (state, action) => {
        state.cart = [];
        Cookies.remove("SHOP");
        state.total = 0;
      });
  },
});

export let info = {};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/auth/login`, { email, password });
      if (res.status === 200) {
        console.log("auth", res);
        info = res.data;
        if (res.data.status === "success") {
          Cookies.set("access_token", res.data.data.accessToken);
          return {
            user: {
              id: res.data.data.id,
              role: res.data.data.role,
              fullName: res.data.data.fullName,
              avatar: res.data.data.avatar,
              phone: res.data.data.phone,
              address: res.data.data.address,
              email: res.data.data.email,
            },
            cart: res.data.data.cart,
          };
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.get(`/auth/logout`);
      if (res.status === 200) {
        if (res.data.status === "success") {
          Cookies.remove("access_token");
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const id = Cookies.get("uid");
      const res = await instance.post(`/auth/refresh-token`, { id });
      if (res.status === 200) {
        if (res.data.status === "success") {
          Cookies.set("access_token", res.data.data.access_token);
          return res.data.data.user;
        } else {
          Cookies.remove("access_token");
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const updateInfo = createAsyncThunk(
  "auth/updateInfo",
  async (
    { id, username, email, avatar, address, phone },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      if (avatar) {
        formData.append("avatar", avatar.base64);
      }
      formData.append("idUser", id);
      formData.append("username", username);
      formData.append("email", email);
      const res = await instance.post(`/user/update`, formData);
      if (res.status === 200) {
        if (res.data.status === "success") {
          return res.data.data;
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/auth/register`, { email, password });
      if (res.status === 200) {
        // console.log(res);
        if (res.data.status === "success") {
          // if (res.data.data.access_token) {
          //   Cookies.set("access_token", res.data.data.access_token);
          // }
          return res.data;
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const addCart = createAsyncThunk(
  "auth/addCart",
  async ({ idUser, idProduct, quantity }, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/cart/add`, {
        idUser,
        idProduct,
        quantity,
      });
      if (res.status === 200) {
        if (res.data.status === "success") {
          return res.data.data;
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const updateCart = createAsyncThunk(
  "auth/updateCart",
  async ({ idUser, idProduct, quantity }, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/cart/update`, {
        idUser,
        idProduct,
        quantity,
      });
      if (res.status === 200) {
        if (res.data.status === "success") {
          return res.data.data;
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const clear = createAsyncThunk(
  "auth/clear",
  async (_, { rejectWithValue }) => {
    return null;
  }
);

export default authSlice;
