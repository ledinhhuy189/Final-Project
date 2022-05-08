import { Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
   return (
      <Box>
         <h1>Header</h1>
         <Outlet />
         <h1>Footer</h1>
      </Box>
   );
};

export default Main;
