import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    refresh: false,
    productsForBuyers: [],
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
  },
});

export const { setProducts, triggerRefresh, setProductsForBuyers } =
  productSlice.actions;
export default productSlice.reducer;
