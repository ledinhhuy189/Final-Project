import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import messageReducer from '../features/Message/messageSlice';

const rootReducer = combineReducers({
   auth: authReducer,
   message: messageReducer,
});

const store = configureStore({
   reducer: rootReducer,
});

export default store;
