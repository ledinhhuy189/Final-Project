import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
// import PropTypes from 'prop-types';

Search.propTypes = {};

function Search(props) {
   return (
      <>
         <InputGroup w='300px'>
            <InputLeftElement
               pointerEvents='none'
               children={<Search2Icon color='gray.300' />}
            />
            <Input type='text' placeholder='Search here...' />
         </InputGroup>
      </>
   );
}

export default Search;
