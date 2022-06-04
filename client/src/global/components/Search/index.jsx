import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

Search.propTypes = {};

function Search(props) {
   const navigate = useNavigate();
   const [searchInput, setSearchInput] = useState('');

   const onClickSearch = (e) => {
      if (e.keyCode !== 13) return;

      return navigate('/search', {
         state: {
            keyword: searchInput,
         },
      });
   };

   const onSearchChange = (e) => {
      setSearchInput(e.target.value);
   };

   return (
      <>
         <InputGroup w='300px'>
            <InputLeftElement
               pointerEvents='none'
               children={<Search2Icon color='gray.300' />}
            />
            <Input
               type='text'
               placeholder='Search here...'
               onKeyDown={onClickSearch}
               onChange={onSearchChange}
            />
         </InputGroup>
      </>
   );
}

export default Search;
