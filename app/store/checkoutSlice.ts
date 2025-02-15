import { createSlice } from "@reduxjs/toolkit";

interface PaymentMethods {
  method: String;
}
const CheckoutSlice = createSlice({
  name: "checkout",
  initialState: {
    method: "",
  },
  reducers: {
    setMethod: (state, action) => {
      state.method = action.payload;
    },
  },
});
export const { setMethod } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;
