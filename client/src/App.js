import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import AuthUserSideEffect from './global/sideEffectComponent/AuthUserSideEffect';
import MessageToastReceiveSideEffect from './global/sideEffectComponent/MessageToastReceiveSideEffect';
import WebSocketSideEffect from './global/sideEffectComponent/WebSocketSideEffect';
import Routers from './routers';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <ChakraProvider theme={theme}>
            <AuthUserSideEffect />
            <WebSocketSideEffect />
            <MessageToastReceiveSideEffect />
            <Routers />
         </ChakraProvider>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}

export default App;
