import { Box } from '@chakra-ui/react';
import React from 'react';
import ManageUserOrderToolbar from '../ManageUserOrderToolbar';

const ManageShopOrder = () => {
   return (
      <>
         <Box px='25px' py='20px' borderBottomWidth='2px'>
            <ManageUserOrderToolbar />
         </Box>
         <Box>Order</Box>
      </>
   );
};

export default ManageShopOrder;
