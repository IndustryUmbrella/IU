import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SellerSlice {
  user: any;
  isLogged: Boolean;
  profilePicture: null;
}

const initialState: SellerSlice = {
  user: null,
  isLogged: false,
  profilePicture: null,
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
  },
});

export const { login, logout, setIsLogged } = sellerSlice.actions;
export default sellerSlice.reducer;
