import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SellerSlice {
  user: any;
  isLogged: Boolean;
  profilePicture: null;
  refresh: Boolean;
}

const initialState: SellerSlice = {
  user: null,
  isLogged: false,
  profilePicture: null,
  refresh: false,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setIsLogged: (state, action: PayloadAction<any>) => {
      state.isLogged = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    triggerRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { login, logout, setIsLogged } = sellerSlice.actions;
export default sellerSlice.reducer;
