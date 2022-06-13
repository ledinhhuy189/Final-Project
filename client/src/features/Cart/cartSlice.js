import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartApi from '../../api/cartApi';

const initialState = {
   data: [],
   loading: false,
   error: false,
};

export const getUserCart = createAsyncThunk('cart/userCart', async () => {
   const cartResponse = await cartApi.getCart();
   return cartResponse;
});

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const findItem = state.data.findIndex(
            (food) => food.id === action.payload.id
         );

         if (findItem === -1) {
            state.data.push({
               ...action.payload,
               quantity: 1,
            });
            return;
         }

         state.data[findItem].quantity += 1;
      },
   },
   extraReducers: {
      [getUserCart.pending]: (state) => {
         Object.assign(state, {
            loading: true,
            error: false,
         });
      },
      [getUserCart.fulfilled]: (state, action) => {
         Object.assign(state, {
            loading: false,
            error: false,
            data: action.payload.cartItems,
         });
      },
      [getUserCart.rejected]: (state) => {
         Object.assign(state, {
            loading: false,
            error: true,
         });
      },
   },
});

// Actions
export const cartActions = cartSlice.actions;

// Selectors
export const cartData = (state) => state.cart.data;
export const cartCount = (state) => {
   const count = state.cart.data?.reduce((acc, item) => {
      return (acc += Number(item.quantity));
   }, 0);
   return count;
};

// Reducers
const cartReducer = cartSlice.reducer;
export default cartReducer;
