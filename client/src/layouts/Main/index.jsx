import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../global/components/Header';

const Main = () => {
   return (
      <Box background='#FAFAFA'>
         <Header />
         <Container maxW='1400px' mt='4' minH='90vh'>
            <Outlet />
         </Container>
      </Box>
   );
};

export default Main;
