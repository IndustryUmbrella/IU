import { createSlice } from "@reduxjs/toolkit";

interface Orders {
  orders: any;
}
const OrderSlice = createSlice({
  name: "order",
  initialState: <Orders>{
    orders: [],
  },
  reducers: {
    createOrder: (state, action) => {
      state.orders = action.payload;
    },
  },
});
export const { createOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
