import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

const HomeSpinner = () => {
   return (
      <Center h='100vh'>
         <Spinner size='xl' emptyColor='gray.200' color='blue.500' />
      </Center>
   );
};

export default HomeSpinner;
