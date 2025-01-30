import { configureStore } from "@reduxjs/toolkit";
import sellerSlice from "./sellerSlice";
import productSlice from "./productSlice";

const store = configureStore({
  reducer: {
    seller: sellerSlice,
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
