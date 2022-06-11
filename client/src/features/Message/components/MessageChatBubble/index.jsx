import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

MessageChatBubble.propTypes = {
   sentBy: PropTypes.string.isRequired,
   message: PropTypes.object,
   handleOpenImageModal: PropTypes.func.isRequired,
};

function MessageChatBubble({ sentBy, message, handleOpenImageModal }) {
   if (sentBy === 'left') {
      return (
         <LeftBubble
            message={message}
            handleOpenImageModal={handleOpenImageModal}
         />
      );
   }

   return (
      <RightBubble
         message={message}
         handleOpenImageModal={handleOpenImageModal}
      />
   );
}

function LeftBubble({ message, handleOpenImageModal }) {
   return (
      <Flex gap='3'>
         <Avatar w='42px' h='42px' src={message.user.photoURL} />
         {message.type === 'text' ? (
            <Text as='p' py='3' px='4' bg='gray.200' rounded='xl' maxW='40%'>
               {message.content}
            </Text>
         ) : (
            <Image
               cursor='pointer'
               src={message.content}
               maxW='40%'
               py='3'
               px='4'
               onClick={() => handleOpenImageModal(message.content)}
            />
         )}
      </Flex>
   );
}

function RightBubble({ message, handleOpenImageModal }) {
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
            <Image
               cursor='pointer'
               src={message.content}
               maxW='48%'
               py='3'
               px='4'
               onClick={() => handleOpenImageModal(message.content)}
            />
         )}
      </Flex>
   );
}

export default memo(MessageChatBubble);
