import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import PropTypes from 'prop-types';

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
