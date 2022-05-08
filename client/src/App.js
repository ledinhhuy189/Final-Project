import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import Routers from './routers';

function App() {
   return (
      <ChakraProvider theme={theme}>
         <Routers />
      </ChakraProvider>
   );
}

export default App;
