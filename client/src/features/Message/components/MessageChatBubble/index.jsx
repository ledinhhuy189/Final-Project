import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

MessageChatBubble.propTypes = {
   sentBy: PropTypes.string.isRequired,
   message: PropTypes.object,
};

function MessageChatBubble({ sentBy, message }) {
   if (sentBy === 'left') {
      return <LeftBubble message={message} />;
   }

   return <RightBubble message={message} />;
}

function LeftBubble({ message }) {
   return (
      <Flex gap='3'>
         <Avatar w='42px' h='42px' src={message.user.photoURL} />
         {message.type === 'text' ? (
            <Text as='p' py='3' px='4' bg='gray.200' rounded='xl' maxW='40%'>
               {message.content}
            </Text>
         ) : (
            <Image src={message.content} maxW='40%' py='3' px='4' />
         )}
      </Flex>
   );
}

function RightBubble({ message }) {
   return (
      <Flex justifyContent='end' pr='1'>
         {message.type === 'text' ? (
            <Box
               py='3'
               px='4'
               bg='blue.400'
               color='white'
               rounded='xl'
               maxW='48%'
            >
               <Text as='p'>{message.content}</Text>
            </Box>
         ) : (
            <Image src={message.content} maxW='48%' py='3' px='4' />
         )}
      </Flex>
   );
}

export default memo(MessageChatBubble);
