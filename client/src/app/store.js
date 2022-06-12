import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import cartReducer from '../features/Cart/cartSlice';
import messageReducer from '../features/Message/messageSlice';

const rootReducer = combineReducers({
   auth: authReducer,
   message: messageReducer,
   cart: cartReducer,
});

const store = configureStore({
   reducer: rootReducer,
});

export default store;
