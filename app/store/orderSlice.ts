import { createSlice } from "@reduxjs/toolkit";

interface Orders {
  orders: any;
  orderPlaced: boolean;
  refreshOrder: any;
}
const OrderSlice = createSlice({
  name: "order",
  initialState: <Orders>{
    orders: [],
    orderPlaced: false,
    refreshOrder: true,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrderPlaced: (state, action) => {
      state.orderPlaced = action.payload;
    },
    triggerRefreshOrder: (state) => {
      state.refreshOrder = !state.refreshOrder;
    },
  },
});
export const { setOrderPlaced, triggerRefreshOrder, setOrders } =
  OrderSlice.actions;
export default OrderSlice.reducer;
