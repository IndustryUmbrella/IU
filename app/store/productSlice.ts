import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    refresh: false,
    productsForBuyers: [],
    productLimit: 5,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductsForBuyers: (state, action) => {
      state.productsForBuyers = action.payload;
    },
    triggerRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setProductLimit: (state, action) => {
      state.productLimit = action.payload;
    },
  },
});

export const {
  setProducts,
  triggerRefresh,
  setProductsForBuyers,
  setProductLimit,
} = productSlice.actions;
export default productSlice.reducer;
