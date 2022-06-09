import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import AuthUserSideEffect from './global/sideEffectComponent/AuthUserSideEffect';
import MessageToastReceiveSideEffect from './global/sideEffectComponent/MessageToastReceiveSideEffect';
import WebSocketSideEffect from './global/sideEffectComponent/WebSocketSideEffect';
import Routers from './routers';
import theme from './theme';

function App() {
   return (
      <ChakraProvider theme={theme}>
         <AuthUserSideEffect />
         <WebSocketSideEffect />
         <MessageToastReceiveSideEffect />
         <Routers />
      </ChakraProvider>
   );
}

export default App;
