import { HStack, Icon, Input } from '@chakra-ui/react';
import React from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri';

function MessageInput(props) {
   return (
      <HStack gap='2'>
         <Input
            type='text'
            placeholder='Type the message...'
            py='7'
            px='6'
            rounded='full'
         />
         <Icon as={RiSendPlane2Fill} fontSize='3xl' color='gray.500' />
      </HStack>
   );
}

export default MessageInput;
