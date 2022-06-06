import { Box } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

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
   return <Box bg='red.200'>ReceiverBubble</Box>;
}

function SenderBubble() {
   return <Box bg='blue.200'>SenderBubble</Box>;
}

export default MessageChatBubble;
