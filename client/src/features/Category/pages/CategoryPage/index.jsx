import {
   Box,
   Flex,
   Heading,
   Icon,
   Input,
   InputGroup,
   InputLeftElement,
   Spacer,
   Text,
} from '@chakra-ui/react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomBreadcrumb from '../../../../global/components/CustomBreadcrumb';
import { useQuery } from '@tanstack/react-query';
import categoryApi from '../../../../api/categoryApi';
import ProfileFoodList from '../../../Profile/components/ProfileFoodList';
import { BsSearch } from 'react-icons/bs';
import useDebounce from '../../../../hooks/useDebounce';
import { useState } from 'react';

const CategoryPage = () => {
   const [categoryName] = useSearchParams();
   const [searchInput, setSearchInput] = useState('');

   const debounce = useDebounce(searchInput, 500);

   const { data: categoryData, isLoading } = useQuery(
      [
         'category',
         {
            categoryId: categoryName.get('id'),
            name: debounce || '',
         },
      ],
      async () =>
         await categoryApi.getFoodInCategory({
            categoryId: categoryName.get('id'),
            name: debounce || '',
         })
   );

   return (
      <Box pt='4' pb='8'>
         <Box pb='8'>
            <CustomBreadcrumb />
         </Box>
         <Box>
            <Flex pb={8} alignItems='center'>
               <Box flex='1'>
                  <Heading fontSize='26px' color='green.600'>
                     Category: {categoryName.get('name')}
                  </Heading>
               </Box>
               <Spacer />
               <InputGroup
                  w='400px'
                  variant='filled'
                  size='lg'
                  onChange={(e) => setSearchInput(e.target.value)}
               >
                  <InputLeftElement
                     pointerEvents='none'
                     children={<Icon as={BsSearch} color='gray.300' />}
                  />
                  <Input placeholder='Search food' />
               </InputGroup>
            </Flex>
            {!isLoading && <ProfileFoodList data={categoryData} columns={4} />}

            {!categoryData && <Text>No Data</Text>}
         </Box>
      </Box>
   );
};

export default CategoryPage;
