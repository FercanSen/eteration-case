import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct } from "../types/CartProduct";

interface CartState {
  products: CartProduct[];
}

const loadCartFromLocalStorage = (): CartState => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart) {
      return JSON.parse(serializedCart);
    }
    return { products: [] };
  } catch (err) {
    console.error("Could not load cart from localStorage", err);
    return { products: [] };
  }
};

const initialState: CartState = loadCartFromLocalStorage();

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
      saveCartToLocalStorage(state);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
      saveCartToLocalStorage(state);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          // Remove the product if its quantity is 1 and decrease is called
          state.products = state.products.filter(
            (p) => p.id !== action.payload
          );
        }
      }
      saveCartToLocalStorage(state);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.products = [];
      saveCartToLocalStorage(state);
    },
  },
});

const saveCartToLocalStorage = (state: CartState) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem("cart", serializedCart);
  } catch (err) {
    console.error("Could not save cart to localStorage", err);
  }
};

export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
