import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   authActions,
   authData,
   userProfileLocal,
} from './features/Auth/authSlice';
import { messageActions } from './features/Message/messageSlice';
import { auth } from './firebase/initialize';
import Routers from './routers';
import socketUserApi from './socket/userSocketApi';
import theme from './theme';

function App() {
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
         const action = messageActions.receiveIncomingMessage(receiveResponse);
         dispatch(action);
      });
   }, [dispatch]);

   useEffect(() => {
      if (!userData.email || !userData.displayName) return;
      const getUserData = async () => {
         try {
            const action = userProfileLocal();
            dispatch(action);
         } catch (error) {
            console.log(error);
         }
      };
      getUserData();
   }, [dispatch, userData.email, userData.displayName]);

   useEffect(() => {
      const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
         if (!user) {
            const action = authActions.userProfileFirebaseFail();
            return dispatch(action);
         }
         const action = authActions.userProfileFirebaseSuccess({
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
         });

         dispatch(action);
         localStorage.setItem('providerData', true);
      });

      return () => unregisterAuthObserver();
   }, [dispatch]);

   return (
      <ChakraProvider theme={theme}>
         <Routers />
      </ChakraProvider>
   );
}

export default App;
