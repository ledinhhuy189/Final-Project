import {
   Badge,
   Box,
   Flex,
   Icon,
   IconButton,
   Image,
   Text,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { BsPencil, BsTrash2 } from 'react-icons/bs';
import CustomTable from '../../../../global/components/CustomTable';
import priceFormat from '../../../../utils/priceFormat';

const ManageShopFood = ({ data }) => {
   const columns = useMemo(
      () => [
         {
            title: 'Image',
            dataIndex: ['photoURL'],
            render: (value) => (
               <Image
                  src={value[0]}
                  w='100px'
                  h='100px'
                  objectFit='cover'
                  rounded='md'
               />
            ),
         },
         {
            title: 'Detail',
            render: (value) => (
               <Box>
                  <Badge mb='2'>{value.category.name}</Badge>
                  <Text>{value.name}</Text>
               </Box>
            ),
         },
         {
            title: 'Price',
            dataIndex: ['price'],
            render: (value) => (
               <Text fontWeight='bold'>{priceFormat(value)}</Text>
            ),
         },
         {
            title: 'Stock',
            dataIndex: ['stock'],
            render: (value) => <Text>{value}</Text>,
         },
         {
            title: 'Disabled',
            dataIndex: ['isDeleted'],
            render: (value) =>
               value ? (
                  <Badge colorScheme='red' fontSize='16px'>
                     YES
                  </Badge>
               ) : (
                  <Badge colorScheme='green' fontSize='16px'>
                     NO
                  </Badge>
               ),
         },
         {
            title: 'Action',
            render: (value) => (
               <Flex gap='4'>
                  <IconButton icon={<Icon as={BsTrash2} />} rounded='full' />
                  <IconButton icon={<Icon as={BsPencil} />} rounded='full' />
               </Flex>
            ),
         },
      ],
      []
   );

   return (
      <Box>
         <CustomTable columns={columns} data={data} />
      </Box>
   );
};

export default ManageShopFood;
