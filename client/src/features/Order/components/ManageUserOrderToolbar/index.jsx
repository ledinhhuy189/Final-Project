import { chakra, Flex, Select, Text } from '@chakra-ui/react';
import React from 'react';
import { ORDER_STATUS } from '../../../../constants/orderStatus';

const ManageUserOrderToolbar = ({
   onChangeOrderStatus,
   onChangeCreatedDirection,
}) => {
   return (
      <Flex w='full' gap='10'>
         <Flex alignItems='center' gap={3}>
            <Text fontSize='lg'>Status:</Text>
            <Select
               size='lg'
               placeholder='All'
               onChange={(e) => onChangeOrderStatus(e.target.value)}
            >
               {Object.keys(ORDER_STATUS).map((o) => (
                  <chakra.option key={o} value={Number(ORDER_STATUS[o].id)}>
                     {ORDER_STATUS[o].name}
                  </chakra.option>
               ))}
            </Select>
         </Flex>
         <Flex alignItems='center' gap={3}>
            <Text fontSize='lg'>Create:</Text>
            <Select
               size='lg'
               onChange={(e) => onChangeCreatedDirection(e.target.value)}
               defaultValue='desc'
            >
               <chakra.option value='desc'>Descending</chakra.option>
               <chakra.option value='asc'>Ascending</chakra.option>
            </Select>
         </Flex>
      </Flex>
   );
};

export default ManageUserOrderToolbar;
