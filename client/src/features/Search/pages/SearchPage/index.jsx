import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
   const { state } = useLocation();

   const [search, setSearch] = useState({
      keyword: state?.keyword || '',
   });

   useEffect(() => {
      setSearch({
         ...search,
         keyword: state?.keyword,
      });
   }, [state]);

   return (
      <Box>
         <h1>This is Search Page</h1>
         <p>Keyword: {search.keyword}</p>
      </Box>
   );
};

export default SearchPage;
