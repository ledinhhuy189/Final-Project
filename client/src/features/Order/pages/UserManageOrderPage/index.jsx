import { Spinner, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useReducer } from 'react';
import { useEffect } from 'react';
import orderApi from '../../../../api/orderApi';
import ManageUserOrderTable from '../../components/ManageUserOrderTable';
import ManageUserOrderToolbar from '../../components/ManageUserOrderToolbar';
import tableReducer, { initialsTableValue } from './reducer';

const UserManageOrderPage = () => {
   const [orderState, dispatch] = useReducer(tableReducer, initialsTableValue);

   const {
      data: orderData,
      isLoading,
      refetch,
   } = useQuery(
      ['userManageOrder'],
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

   useEffect(() => {
      refetch();
   }, [orderState, refetch]);

   return (
      <VStack gap={4} w='full'>
         <ManageUserOrderToolbar
            orderState={orderState}
            onChangeOrderStatus={handleChangeOrderStatus}
            onChangeCreatedDirection={handleChangeCreatedDirection}
         />
         {!isLoading ? (
            <ManageUserOrderTable orderData={orderData} />
         ) : (
            <Spinner size='xl' />
         )}
      </VStack>
   );
};

export default UserManageOrderPage;
