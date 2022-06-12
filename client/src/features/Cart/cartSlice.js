import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   data: [],
   loading: false,
   error: false,
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         if (state.data.some((food) => food.id === action.payload.id)) return;
         state.data.push(action.payload);
      },
   },
});

// Actions
export const cartActions = cartSlice.actions;

// Selectors
export const cartData = (state) => state.cart.data;

// Reducers
const cartReducer = cartSlice.reducer;
export default cartReducer;
