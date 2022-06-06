import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MessageConversation from '../MessageConversation';
import MessageSearch from '../MessageSearch';

function MessageSidebar(props) {
   const navigate = useNavigate();

   return (
      <VStack gap='4' alignItems='flex-start'>
         <Text
            as='h2'
            fontWeight='bold'
            fontSize='2xl'
            onClick={() => navigate('/message')}
            cursor='pointer'
         >
            Messages
         </Text>
         <MessageSearch />
         <VStack w='full' gap='1' alignItems='flex-start'>
            <MessageConversation />
            <MessageConversation />
            <MessageConversation />
            <MessageConversation />
         </VStack>
      </VStack>
   );
}

export default MessageSidebar;
