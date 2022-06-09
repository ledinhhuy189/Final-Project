import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { messageActions } from '../../messageSlice';

MessageToast.propTypes = {
   photoURL: PropTypes.string,
   content: PropTypes.string,
   name: PropTypes.string,
   conversationId: PropTypes.number,
};

function MessageToast({ photoURL, content, name, conversationId }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const onClickMessageToast = () => {
      const isSeenMessageAction = messageActions.seenMessage();
      dispatch(isSeenMessageAction);
      navigate(`/message/${conversationId}`);
   };

   return (
      <Flex
         color='blackAlpha.900'
         px={4}
         py={6}
         bg='white'
         rounded='lg'
         shadow='md'
         gap='4'
         alignItems='start'
         onClick={onClickMessageToast}
      >
         <Avatar src={photoURL} />
         <Box>
            <Text as='h2' fontSize='xl' fontWeight='bold' mb='1'>
               {name}
            </Text>
            <Text as='p' wordBreak='break-all' noOfLines={4}>
               {content}
            </Text>
         </Box>
      </Flex>
   );
}

export default MessageToast;
