import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import MessageChatBubble from '../MessageChatBubble';
import MessageChatSidebar from '../MessageChatSidebar';
import MessageHeader from '../MessageHeader';
import MessageInput from '../MessageInput';

function MessageChat(props) {
   return (
      <Flex h='full' w='full' gap='6'>
         <Flex
            h='full'
            w='full'
            direction='column'
            position='relative'
            flex='3'
         >
            <MessageHeader />
            <Flex
               direction='column'
               maxH='68vh'
               w='full'
               overflow='auto'
               gap='2'
            >
               <MessageChatBubble sentBy='sender' />
               <MessageChatBubble sentBy='receiver' />
               <MessageChatBubble sentBy='sender' />
               <MessageChatBubble sentBy='receiver' />
               <MessageChatBubble sentBy='receiver' />
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
         <Flex h='full' w='full' flex='1'>
            <MessageChatSidebar />
         </Flex>
      </Flex>
   );
}

export default MessageChat;
