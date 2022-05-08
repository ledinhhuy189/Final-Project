import { ChakraProvider, theme } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userProfileLocal } from './features/Auth/authSlice';
import Routers from './routers';

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      const getUserData = async () => {
         try {
            const action = userProfileLocal();
            dispatch(action);
         } catch (error) {
            console.log(error);
         }
      };
      getUserData();
   }, []);

   return (
      <ChakraProvider theme={theme}>
         <Routers />
      </ChakraProvider>
   );
}

export default App;
