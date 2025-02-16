import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  productImage: string;
  description: string;
  category: string;
  seller_id: string;
  companyName: string;
}

interface CartState {
  items: CartItem[];
  cartsLength: Number;
}

const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  }
  return [];
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
  cartsLength: 0,
};

const saveCartToLocalStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const {
        id,
        name,
        price,
        productImage,
        description,
        category,
        seller_id,
        companyName,
      } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id,
          name,
          price,
          quantity: 1,
          productImage,
          description,
          category,
          seller_id,
          companyName,
        });
      }

      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else {
        state.items = state.items.filter((item) => item.id !== id); // Remove item if quantity is 0
      }
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
