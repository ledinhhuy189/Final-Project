import { Box, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MessageSidebar from '../../components/MessageSidebar';

function MessagePage(props) {
   let location = useLocation();

   return (
      <Box bg='white' px='30px' pt='20px' rounded='2xl' shadow='sm'>
         <Grid
            templateColumns='repeat(24, 1fr)'
            gap='6'
            w='full'
            h='calc(89vh - 30px)'
         >
            <GridItem colSpan={6}>
               <MessageSidebar />
            </GridItem>

            <GridItem colSpan={18}>
               {location.pathname === '/message' ? (
                  <BlankContent />
               ) : (
                  <Outlet />
               )}
            </GridItem>
         </Grid>
      </Box>
   );
}

function BlankContent() {
   return (
      <Center h='full'>
         <Text as='h2' fontSize='xl'>
            Choose conversation to start chat
         </Text>
      </Center>
   );
}

export default MessagePage;
