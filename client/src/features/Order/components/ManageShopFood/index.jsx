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
import { BsCheck, BsPencil, BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../../../global/components/CustomTable';
import priceFormat from '../../../../utils/priceFormat';

const ManageShopFood = ({ data, onDisableFood }) => {
   const navigate = useNavigate();

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
                  {value.isDeleted ? (
                     <IconButton
                        colorScheme='green'
                        icon={<Icon as={BsCheck} />}
                        rounded='full'
                        onClick={() => onDisableFood(value.id, false)}
                     />
                  ) : (
                     <IconButton
                        colorScheme='red'
                        icon={<Icon as={BsX} />}
                        rounded='full'
                        onClick={() => onDisableFood(value.id, true)}
                     />
                  )}

                  <IconButton
                     icon={<Icon as={BsPencil} />}
                     rounded='full'
                     onClick={() =>
                        navigate(
                           {
                              pathname: `/food/${value.id}/edit`,
                           },
                           { state: value }
                        )
                     }
                  />
               </Flex>
            ),
         },
      ],
      [onDisableFood, navigate]
   );

   return (
      <Box>
         <CustomTable columns={columns} data={data} />
      </Box>
   );
};

export default ManageShopFood;
