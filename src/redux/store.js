import { configureStore } from "@reduxjs/toolkit";
// import categoriesSlice from './reducers/category';
// import itemsSlice from './reducers/item';
import authSlice from "./reducers/auth";
const store = configureStore({
  reducer: {
    // categories: categoriesSlice.reducer,
    // items: itemsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
