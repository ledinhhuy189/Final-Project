import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

MessageSearch.propTypes = {
   onChangeSearch: PropTypes.func,
};

MessageSearch.defaultProps = {
   onChangeSearch: null,
};

function MessageSearch({ onChangeSearch }) {
   return (
      <InputGroup>
         <InputLeftElement children={<Search2Icon color='gray.300' />} />
         <Input
            variant='filled'
            placeholder='Search in messages'
            onChange={onChangeSearch}
         />
      </InputGroup>
   );
}

export default MessageSearch;
