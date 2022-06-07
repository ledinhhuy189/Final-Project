import { HStack, Icon, Input } from '@chakra-ui/react';
import React from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri';
import PropTypes from 'prop-types';

MessageInput.propTypes = {
   handleChangeTextInput: PropTypes.func,
   handleSendMessage: PropTypes.func,
   textInput: PropTypes.string,
};

MessageInput.defaultProps = {
   handleChangeTextInput: null,
   handleSendMessage: null,
   textInput: '',
};

function MessageInput({ handleChangeTextInput, textInput, handleSendMessage }) {
   return (
      <HStack gap='2' mb='6'>
         <Input
            value={textInput}
            onChange={handleChangeTextInput}
            type='text'
            placeholder='Type the message...'
            py='7'
            px='6'
            rounded='full'
            onKeyDown={(e) => {
               if (e.key === 'Enter') {
                  handleSendMessage();
               }
            }}
         />
         <Icon
            as={RiSendPlane2Fill}
            fontSize='3xl'
            color='gray.500'
            onClick={handleSendMessage}
            cursor='pointer'
         />
      </HStack>
   );
}

export default MessageInput;
