import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SellerSlice {
  user: any; // Accepts any object, or replace with the exact structure
}

const initialState: SellerSlice = {
  user: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload; // Store the entire loggedUser object
    },
    logout: (state) => {
      state.user = null; // Clear user state on logout
    },
  },
});

export const { login, logout } = sellerSlice.actions;
export default sellerSlice.reducer;
