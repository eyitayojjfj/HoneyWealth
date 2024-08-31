import { createSlice } from '@reduxjs/toolkit';
import { loadCartFromLocalStorage, saveCartToLocalStorage } from './localStorageHelper';

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
      saveCartToLocalStorage(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((cartItem) => cartItem.id === id);
      if (item) {
        item.quantity = quantity;
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const newState = state.filter((item) => item.id !== id);
      saveCartToLocalStorage(newState);
      return newState;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
