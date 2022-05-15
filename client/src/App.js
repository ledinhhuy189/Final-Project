import { ChakraProvider, theme } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   authActions,
   authData,
   userProfileLocal,
} from './features/Auth/authSlice';
import { auth } from './firebase/initialize';
import Routers from './routers';

function App() {
   const dispatch = useDispatch();
   const { userData } = useSelector(authData);

   useEffect(() => {
      if (!userData.email) return;
      const getUserData = async () => {
         try {
            const action = userProfileLocal(userData.email);
            dispatch(action);
         } catch (error) {
            console.log(error);
         }
      };
      getUserData();
   }, [dispatch, userData.email]);

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
