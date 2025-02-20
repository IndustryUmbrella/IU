import { configureStore } from "@reduxjs/toolkit";
import sellerSlice from "./sellerSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import buyerSlice from "./buyerSlice";
import checkoutSlice from "./checkoutSlice";
import OrderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    seller: sellerSlice,
    product: productSlice,
    cart: cartSlice,
    buyer: buyerSlice,
    checkout: checkoutSlice,
    orders: OrderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
