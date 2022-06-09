import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   incomingMessage: {},
   isSeen: false,
};

const messageSlice = createSlice({
   name: 'message',
   initialState,
   reducers: {
      receiveIncomingMessage: (state, action) => {
         Object.assign(state.incomingMessage, {
            ...action.payload,
         });

         state.isSeen = false;
      },
      seenMessage: (state) => {
         state.isSeen = true;
      },
   },
});

// Actions
export const messageActions = messageSlice.actions;

// Selectors
export const incomingMessage = (state) => state.message.incomingMessage;
export const isSeenMessage = (state) => state.message.isSeen;

// Reducers
const messageReducer = messageSlice.reducer;
export default messageReducer;
