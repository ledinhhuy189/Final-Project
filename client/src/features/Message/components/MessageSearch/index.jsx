import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

function MessageSearch(props) {
   return (
      <InputGroup>
         <InputLeftElement children={<Search2Icon color='gray.300' />} />
         <Input variant='filled' placeholder='Search in messages' />
      </InputGroup>
   );
}

export default MessageSearch;
