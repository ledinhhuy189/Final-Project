import { Image, Spinner, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useMemo, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import orderApi from '../../../../api/orderApi';
import priceFormat from '../../../../utils/priceFormat';
import ManageOrderTable from '../../components/ManageOrderTable';
import ManageUserOrderToolbar from '../../components/ManageUserOrderToolbar';
import tableReducer, { initialsTableValue } from './reducer';

const UserManageOrderPage = () => {
   const [orderState, dispatch] = useReducer(tableReducer, initialsTableValue);
   const navigate = useNavigate();

   const { data: orderData, isLoading } = useQuery(
      [
         'userManageOrder',
         {
            status: orderState.status,
            createdAtDirection: orderState.createdAtDirection,
         },
      ],
      async () =>
         await orderApi.getUserOrder({
            orderStatusId: orderState.status,
            createdAtDirection: orderState.createdAtDirection,
         })
   );

   const handleChangeOrderStatus = (status) => {
      dispatch({
         type: 'CHANGE_STATUS',
         payload: status,
      });
   };

   const handleChangeCreatedDirection = (createdDirection) => {
      dispatch({
         type: 'CHANGE_CREATED_AT_DIRECTION',
         payload: createdDirection,
      });
   };

   const onClickFood = useCallback(
      (foodSlug) => navigate(`/food/${foodSlug}/detail`),
      [navigate]
   );

   const columns = useMemo(
      () => [
         {
            title: 'Image',
            width: '20%',
            dataIndex: ['food'],
            render: (value) => (
               <Image
                  w='80px'
                  h='80px'
                  rounded='xl'
                  src={value.photoURL[0]}
                  objectFit='cover'
                  cursor='pointer'
                  onClick={() => onClickFood(value.slug)}
               />
            ),
         },
         {
            title: 'Name',
            dataIndex: ['food'],
            render: (value) => (
               <Text cursor='pointer' onClick={() => onClickFood(value.slug)}>
                  {value.name}
               </Text>
            ),
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
      [onClickFood]
   );

   const getCardHeader = (order) => ({
      avatar: order.orderItems[0].food.user.photoURL,
      email: order.orderItems[0].food.user.email,
      name: order.orderItems[0].food.user.name,
   });

   return (
      <VStack gap={4} w='full'>
         <ManageUserOrderToolbar
            orderState={orderState}
            onChangeOrderStatus={handleChangeOrderStatus}
            onChangeCreatedDirection={handleChangeCreatedDirection}
         />
         {!isLoading ? (
            <ManageOrderTable
               orderData={orderData}
               columns={columns}
               userInfoHeader={getCardHeader}
            />
         ) : (
            <Spinner size='xl' />
         )}
      </VStack>
   );
};

export default UserManageOrderPage;
