import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    refresh: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    triggerRefresh: (state) => {
      state.refresh = !state.refresh; // Toggle refresh state to trigger useEffect
    },
  },
});

export const { setProducts, triggerRefresh } = productSlice.actions;
export default productSlice.reducer;
