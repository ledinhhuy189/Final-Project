import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authData } from '../../../features/Auth/authSlice';
import { messageActions } from '../../../features/Message/messageSlice';
import socketUserApi from '../../../socket/userSocketApi';

function WebSocketSideEffect(props) {
   const dispatch = useDispatch();
   const { userData } = useSelector(authData);

   useEffect(() => {
      if (!userData.uid) return;
      socketUserApi.emitMyInfo({
         userId: userData.uid,
      });
   }, [userData.uid]);

   useEffect(() => {
      socketUserApi.onReceive((receiveResponse) => {
         const receiveAction =
            messageActions.receiveIncomingMessage(receiveResponse);

         dispatch(receiveAction);
      });
   }, [dispatch]);

   return <></>;
}

export default WebSocketSideEffect;
