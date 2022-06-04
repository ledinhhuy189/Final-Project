import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MessageSidebar from '../../components/MessageSidebar';

function MessagePage(props) {
   return (
      <Grid templateColumns='repeat(24, 1fr)' gap='6' w='full' h='89vh'>
         <GridItem colSpan={6}>
            <MessageSidebar />
         </GridItem>

         <GridItem colSpan={18}>
            <Outlet />
         </GridItem>
      </Grid>
   );
}

export default MessagePage;
