import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

MessageChatBubble.propTypes = {
   sentBy: PropTypes.string.isRequired,
};

function MessageChatBubble({ sentBy }) {
   if (sentBy === 'receiver') {
      return <ReceiverBubble />;
   }

   return <SenderBubble />;
}

function ReceiverBubble() {
   return (
      <Flex justifyContent='start' gap='3'>
         <Avatar w='42px' h='42px' />

         <Text as='p' py='3' px='4' bg='gray.200' rounded='xl' maxW='40%'>
            Aliqua sunt nulla enim do consectetur. Aliquip excepteur ullamco
            adipisicing consequat dolore culpa mollit nostrud labore minim.
            Deserunt ex cupidatat fugiat excepteur laboris mollit adipisicing
            elit ea cupidatat.
         </Text>
      </Flex>
   );
}

function SenderBubble() {
   return (
      <Flex justifyContent='end' pr='1'>
         <Box py='3' px='4' bg='blue.400' color='white' rounded='xl' maxW='48%'>
            <Text as='p'>
               Aute ad aliquip cupidatat quis velit laboris laboris laborum
               voluptate nisi excepteur. Cupidatat non mollit commodo ex dolor.
            </Text>
         </Box>
      </Flex>
   );
}

export default MessageChatBubble;
