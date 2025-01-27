import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SellerSlice {
  user: any;
}

const initialState: SellerSlice = {
  user: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = sellerSlice.actions;
export default sellerSlice.reducer;
