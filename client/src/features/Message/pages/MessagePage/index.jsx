import { Box, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import conversationApi from '../../../../api/conversationApi';
import MessageSidebar from '../../components/MessageSidebar';

function MessagePage(props) {
   let location = useLocation();

   const [conversationList, setConversationList] = useState([]);

   useEffect(() => {
      const getConversationInDb = async () => {
         try {
            const conversationResponse =
               await conversationApi.getConversations();
            setConversationList(conversationResponse);
         } catch (error) {
            console.log(error);
         }
      };
      getConversationInDb();
   }, []);

   const updateLatestMessageToConversations = (message) => {
      setConversationList((prev) => {
         const conversationIndex = prev.findIndex(
            (conversation) => conversation.id === message.conversationId
         );

         prev[conversationIndex].messages.length = 0;
         prev[conversationIndex].messages.push(message);

         prev.sort((a, b) => {
            const dateA =
               a.messages.length > 0
                  ? new Date(a.messages[0].createdAt)
                  : new Date(a.createdAt);
            const dateB =
               b.messages.length > 0
                  ? new Date(b.messages[0].createdAt)
                  : new Date(b.createdAt);
            return dateB - dateA;
         });

         return [...prev];
      });
   };

   return (
      <Box bg='white' px='30px' pt='20px' rounded='2xl' shadow='sm'>
         <Grid
            templateColumns='repeat(24, 1fr)'
            gap='6'
            w='full'
            h='calc(89vh - 30px)'
         >
            <GridItem colSpan={6}>
               <MessageSidebar conversationList={conversationList} />
            </GridItem>

            <GridItem colSpan={18}>
               {location.pathname === '/message' ? (
                  <BlankContent />
               ) : (
                  <Outlet context={[updateLatestMessageToConversations]} />
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
