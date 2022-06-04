import { Flex, Spacer } from '@chakra-ui/react';
import React from 'react';
import MessageHeader from '../MessageHeader';
import MessageInput from '../MessageInput';

function MessageChat(props) {
   // const { conversationId } = useParams();

   return (
      <Flex h='full' direction='column'>
         <MessageHeader />
         {/* <h1>This is message Chat {conversationId}</h1> */}
         <Spacer />
         <MessageInput />
      </Flex>
   );
}

export default MessageChat;
