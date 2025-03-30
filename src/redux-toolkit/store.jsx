import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../redux-toolkit/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});
