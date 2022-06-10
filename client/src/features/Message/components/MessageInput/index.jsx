import {
   HStack,
   Icon,
   Input,
   InputGroup,
   InputRightElement,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri';
import MessageUpload from '../MessageUpload';

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

function MessageInput({
   handleChangeTextInput,
   textInput,
   handleSendMessage,
   onDrop,
}) {
   return (
      <HStack gap='2' mb='6'>
         <InputGroup>
            <Input
               value={textInput}
               onChange={(e) => handleChangeTextInput(e.target.value)}
               type='text'
               placeholder='Type the message...'
               py='7'
               pl='6'
               pr='16'
               rounded='full'
               onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                     handleSendMessage();
                  }
               }}
            />
            <InputRightElement
               children={<MessageUpload color='green.500' onDrop={onDrop} />}
               py='7'
               pr='8'
            />
         </InputGroup>

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
