import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../useSlice/productSlice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    products: productSlice,
  },
  middleware: [thunk],
});

export default store;
