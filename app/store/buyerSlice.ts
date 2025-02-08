import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShippingData {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  region: string;
  city: string;
  states: string;
  address: string;
  zipcode: string;
}

interface BuyerData {
  shippingData: ShippingData;
}

const initialState: BuyerData = {
  shippingData: {
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    region: "",
    city: "",
    states: "",
    address: "",
    zipcode: "",
  },
};

const buyerSlice = createSlice({
  name: "buyer",
  initialState,
  reducers: {
    setBuyerData: (state, action: PayloadAction<ShippingData>) => {
      const {
        email,
        firstname,
        lastname,
        phone,
        region,
        city,
        states,
        zipcode,
      } = action.payload;
      state.shippingData = action.payload;
    },
  },
});

export const { setBuyerData } = buyerSlice.actions;
export default buyerSlice.reducer;
