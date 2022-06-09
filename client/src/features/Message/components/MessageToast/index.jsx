import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { messageActions } from '../../messageSlice';
import { useDispatch } from 'react-redux';

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
         p={3}
         bg='white'
         rounded='lg'
         shadow='md'
         gap='4'
         alignItems='start'
         onClick={onClickMessageToast}
      >
         <Avatar src={photoURL} />
         <Box>
            <Text as='h2' fontSize='lg' fontWeight='bold' mb='1'>
               {name}
            </Text>
            <Text as='p'>{content}</Text>
         </Box>
      </Flex>
   );
}

export default MessageToast;
