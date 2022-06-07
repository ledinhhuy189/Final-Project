import { Avatar, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

MessageConversation.propTypes = {
   isSelected: PropTypes.bool,
   latestMessage: PropTypes.object,
   sender: PropTypes.object,
   id: PropTypes.number.isRequired,
};

MessageConversation.defaultProps = {
   isSelected: false,
   isMessageSidebarActive: false,
};

function MessageConversation({ isSelected, latestMessage, sender, id }) {
   const navigate = useNavigate();

   const isSelectedStyle = isSelected && {
      bg: 'gray.100',
   };

   const onClickConversation = () => {
      navigate(`/message/${id}`);
   };

   return (
      <Flex
         {...isSelectedStyle}
         gap='5'
         w='full'
         h='full'
         cursor='pointer'
         py='3'
         px='3'
         rounded='lg'
         onClick={onClickConversation}
      >
         <Avatar w='50px' h='50px' src={sender.photoURL} />

         <Flex flex='1' gap='0.5' direction='column' justifyContent='center'>
            <Text color='mainFont' as='h3' fontWeight='700' fontSize='md'>
               {sender.name}
            </Text>
            <Text
               as='p'
               fontSize='sm'
               color='gray.600'
               wordBreak='break-all'
               noOfLines={2}
            >
               {latestMessage?.content
                  ? latestMessage.content
                  : 'No message available'}
            </Text>
         </Flex>

         <Flex alignItems='start' justifyContent='start'>
            <Text as='h4' fontSize='smaller' h='full' lineHeight='2'>
               {latestMessage?.createdAt &&
                  format(parseISO(latestMessage.createdAt), 'HH:mm')}
            </Text>
         </Flex>
      </Flex>
   );
}

export default MessageConversation;
