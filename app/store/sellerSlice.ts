import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SellerSlice {
  user: any;
  isLogged: Boolean;
  profilePicture: {};
}

const initialState: SellerSlice = {
  user: null,
  isLogged: false,
  profilePicture: {},
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
    setProfilePicture: (state, action: PayloadAction<any>) => {
      state.profilePicture = action.payload;
    },
  },
});

export const { login, logout, setIsLogged, setProfilePicture } =
  sellerSlice.actions;
export default sellerSlice.reducer;
