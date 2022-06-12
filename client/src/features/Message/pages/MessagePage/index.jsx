import { Box, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import conversationApi from '../../../../api/conversationApi';
import useDebounce from '../../../../hooks/useDebounce';
import MessageSidebar from '../../components/MessageSidebar';
import { incomingMessage } from '../../messageSlice';

function MessagePage(props) {
   let location = useLocation();
   const dispatch = useDispatch();

   const [conversationList, setConversationList] = useState([]);
   const [loading, setLoading] = useState(true);
   const [searchInput, setSearchInput] = useState('');
   const debounce = useDebounce(searchInput, 500);

   const incomingMessageRedux = useSelector(incomingMessage);

   useEffect(() => {
      if (debounce !== '') return;
      const getConversationInDb = async () => {
         try {
            const conversationResponse =
               await conversationApi.getConversations();
            setConversationList(conversationResponse);
            setLoading(false);
         } catch (error) {
            console.log(error);
            setLoading(false);
         }
      };
      getConversationInDb();
   }, [dispatch, debounce]);

   useEffect(() => {
      if (debounce === '') return;
      const searchConversationInDb = async () => {
         try {
            const searchResponse =
               await conversationApi.searchConversationByName({
                  memberName: debounce,
               });
            setLoading(false);
            setConversationList(searchResponse);
         } catch (error) {
            console.log(error);
         }
      };
      searchConversationInDb();
   }, [debounce]);

   useEffect(() => {
      setLoading(true);
   }, [searchInput]);

   useEffect(() => {
      if (Object.keys(incomingMessageRedux).length <= 0 || loading) return;
      updateLatestMessageToConversations(incomingMessageRedux);
   }, [incomingMessageRedux, loading]);

   const handleChangeSearch = (e) => {
      setSearchInput(e.target.value);
   };

   const updateLatestMessageToConversations = (message) => {
      setConversationList((prev) => {
         const conversationIndex = prev?.findIndex(
            (conversation) => conversation.id === message.conversationId
         );

         if (conversationIndex === -1 || conversationIndex === undefined)
            return;

         prev[conversationIndex].messages.length = 0;
         prev[conversationIndex].messages.push(message);

         prev.sort((a, b) => {
            const dateA =
               a.messages.length > 0 ? a.messages[0].createdAt : a.createdAt;
            const dateB =
               b.messages.length > 0 ? b.messages[0].createdAt : b.createdAt;

            return new Date(dateB) - new Date(dateA);
         });

         return [...prev];
      });
   };

   return (
      <Box bg='white' px='30px' pt='20px' rounded='2xl' shadow='xl'>
         <Grid
            templateColumns='repeat(24, 1fr)'
            gap='6'
            w='full'
            h='calc(89vh - 30px)'
         >
            <GridItem colSpan={6}>
               <MessageSidebar
                  handleChangeSearch={handleChangeSearch}
                  conversationList={conversationList}
                  loading={loading}
               />
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
