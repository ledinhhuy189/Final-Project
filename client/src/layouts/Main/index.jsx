import { Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../global/components/Header';
import ContentContainer from '../ContentContainer';

const Main = () => {
   return (
      <Box background='#FAFAFA'>
         <Header />
         <ContentContainer>
            <Outlet />
         </ContentContainer>
      </Box>
   );
};

export default Main;
