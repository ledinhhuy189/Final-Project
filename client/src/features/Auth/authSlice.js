import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';

export const userProfileLocal = createAsyncThunk(
   'auth/userProfileLocal',
   async () => {
      const response = await authApi.isLogin();
      return response;
   }
);

const initialState = {
   loading: true,
   error: false,
   userData: {},
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: {
      [userProfileLocal.pending]: (state) => {
         Object.assign(state, {
            loading: true,
            error: false,
         });
      },
      [userProfileLocal.fulfilled]: (state, action) => {
         Object.assign(state, {
            loading: false,
            error: false,
            userData: action.payload,
         });
      },
      [userProfileLocal.rejected]: (state) => {
         Object.assign(state, {
            loading: false,
            error: true,
         });
      },
   },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const authData = (state) => state.auth;

// Reducers
const authReducer = authSlice.reducer;
export default authReducer;
