import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce';

function MessageSearch(props) {
   const [searchInput, setSearchInput] = useState('');
   const debounce = useDebounce(searchInput, 500);

   const onInputChange = (e) => {
      setSearchInput(e.target.value);
   };

   useEffect(() => {
      console.log(debounce);
   }, [debounce]);

   return (
      <InputGroup>
         <InputLeftElement children={<Search2Icon color='gray.300' />} />
         <Input
            variant='filled'
            placeholder='Search in messages'
            onChange={onInputChange}
         />
      </InputGroup>
   );
}

export default MessageSearch;
