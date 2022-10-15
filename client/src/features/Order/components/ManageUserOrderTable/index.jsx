import {
   Avatar,
   Badge,
   Box,
   Flex,
   Spacer,
   Text,
   VStack,
   Image,
   Heading,
   Icon,
   Divider,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { BsXCircleFill } from 'react-icons/bs';
import { ORDER_STATUS } from '../../../../constants/orderStatus';
import CustomTable from '../../../../global/components/CustomTable';
import priceFormat from '../../../../utils/priceFormat';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const ManageUserOrderTable = ({ orderData }) => {
   const navigate = useNavigate();

   const columns = useMemo(
      () => [
         {
            title: 'Image',
            width: '20%',
            dataIndex: ['food', 'photoURL'],
            render: (value) => (
               <Image
                  w='120px'
                  h='120px'
                  rounded='xl'
                  src={value[0]}
                  objectFit='cover'
               />
            ),
         },
         {
            title: 'Name',
            dataIndex: ['food', 'name'],
         },
         {
            title: 'Quantity',
            dataIndex: ['quantity'],
            render: (value) => <Text fontWeight='bold'>{value}</Text>,
         },
         {
            title: 'Price',
            dataIndex: ['food', 'price'],
            render: (value) => (
               <Text fontWeight='bold'>{priceFormat(value)}</Text>
            ),
         },
         {
            title: 'Sub total',
            render: (value) => (
               <Text fontWeight='bold'>
                  {priceFormat(value.quantity * value.food.price)}
               </Text>
            ),
         },
      ],
      []
   );

   const onClickUserPrice = (email) => {
      navigate(`/profile/${email}`);
   };

   return (
      <VStack gap='6' w='full'>
         {orderData?.map((o) => (
            <Box key={o.id} w='full' borderWidth='2px' rounded='xl'>
               <Flex
                  px='20px'
                  py='20px'
                  borderBottomWidth='1px'
                  alignItems='center'
               >
                  <Flex
                     gap={4}
                     alignItems='center'
                     cursor='pointer'
                     onClick={() =>
                        onClickUserPrice(o.orderItems[0].food.user.email)
                     }
                  >
                     <Avatar src={o.orderItems[0].food.user.photoURL} />
                     <Text fontWeight='bold' fontSize='18px'>
                        {o.orderItems[0].food.user.name}
                     </Text>
                  </Flex>
                  <Divider
                     orientation='vertical'
                     h='5'
                     borderColor='gray.500'
                     mx='4'
                  />
                  <Text>
                     {format(new Date(o.createdAt), 'dd/MM/yyyy HH:mm')}
                  </Text>
                  <Spacer />
                  <Box>
                     <Badge
                        colorScheme={
                           ORDER_STATUS[o.orderStatus.name].colorScheme
                        }
                        fontSize='16px'
                     >
                        {o.orderStatus.name} order
                     </Badge>
                  </Box>
               </Flex>
               <CustomTable
                  columns={columns}
                  data={o.orderItems}
                  disableThead={false}
               />

               <Flex
                  px='20px'
                  py='20px'
                  borderTopWidth='1px'
                  alignItems='center'
               >
                  <Spacer />
                  <Text pr='2' fontSize='18px'>
                     Total price:
                  </Text>
                  <Heading as='h4' size='lg' color='red.400'>
                     {priceFormat(o.totalPrice)}
                  </Heading>
               </Flex>
            </Box>
         ))}

         {orderData.length === 0 && (
            <Box textAlign='center' py='5'>
               <Icon
                  as={BsXCircleFill}
                  color='gray.400'
                  fontSize='40px'
                  pb='2'
               />
               <Text fontSize='20px'>No Data</Text>
            </Box>
         )}
      </VStack>
   );
};

export default ManageUserOrderTable;
