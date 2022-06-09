import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   incomingMessage: {},
};

const messageSlice = createSlice({
   name: 'message',
   initialState,
   reducers: {
      receiveIncomingMessage: (state, action) => {
         Object.assign(state.incomingMessage, {
            ...action.payload,
         });
      },
   },
});

// Actions
export const messageActions = messageSlice.actions;

// Selectors
export const incomingMessage = (state) => state.message.incomingMessage;

// Reducers
const messageReducer = messageSlice.reducer;
export default messageReducer;
