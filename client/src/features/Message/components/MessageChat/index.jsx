import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import scrollbar from '../../../../global/styles/scrollbar';
import MessageChatBubble from '../MessageChatBubble';
import MessageChatSidebar from '../MessageChatSidebar';
import MessageHeader from '../MessageHeader';
import MessageInput from '../MessageInput';

function MessageChat(props) {
   const divRef = useRef(null);
   const { isOpen: isChatSidebarOpen, onToggle: onChatSidebarToggle } =
      useDisclosure();

   useEffect(() => {
      divRef.current.scrollIntoView({ behavior: 'auto' });
   }, []);

   return (
      <Flex h='full' w='full' gap='6' transition='all 0.5s ease-out'>
         <Flex
            h='full'
            w='full'
            direction='column'
            position='relative'
            flex='2.8'
         >
            <MessageHeader
               onChatSidebarToggle={onChatSidebarToggle}
               isChatSidebarOpen={isChatSidebarOpen}
            />
            <Flex
               direction='column'
               maxH='calc(68vh - 1vh)'
               overflow='auto'
               gap='2'
               css={scrollbar}
            >
               <MessageChatBubble sentBy='sender' />
               <MessageChatBubble sentBy='receiver' />
               <MessageChatBubble sentBy='sender' />
               <MessageChatBubble sentBy='receiver' />
               <MessageChatBubble sentBy='receiver' />
               <Box ref={divRef} />
            </Flex>
            <Box
               position='absolute'
               bottom='0'
               w='full'
               transform='auto'
               translateY='-40%'
            >
               <MessageInput />
            </Box>
         </Flex>

         <Flex
            h='full'
            w='full'
            flex='1'
            display={isChatSidebarOpen ? 'flex' : 'none'}
         >
            <MessageChatSidebar />
         </Flex>
      </Flex>
   );
}

export default MessageChat;
