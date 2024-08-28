import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  products: CartProduct[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartProduct>) => {
      const existingProduct = state.products.find(
        (p) => p.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
