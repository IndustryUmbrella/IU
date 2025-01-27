import { configureStore } from "@reduxjs/toolkit";
import sellerSlice from "./sellerSlice";

const store = configureStore({
  reducer: {
    seller: sellerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
