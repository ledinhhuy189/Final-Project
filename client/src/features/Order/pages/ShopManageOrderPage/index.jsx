import {
   Box,
   Flex,
   Heading,
   Image,
   Spinner,
   Text,
   useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import foodApi from '../../../../api/foodApi';
import orderApi from '../../../../api/orderApi';
import priceFormat from '../../../../utils/priceFormat';
import ManageOrderTable from '../../components/ManageOrderTable';
import ManageShopFood from '../../components/ManageShopFood';
import ShopManageSidebar from '../../components/ShopManageSidebar';

const ShopManageOrderPage = () => {
   const navigate = useNavigate();
   const toast = useToast();

   const [selectedSidebarItem, setSelectedSidebarItem] = useState('food');

   const handleClickSidebarManageItem = (item) => setSelectedSidebarItem(item);

   const {
      data: foodData,
      isLoading: isFoodDataLoading,
      refetch: refetchFoodData,
   } = useQuery(['shopManageFood'], async () => await foodApi.getFoodOfUser());

   const {
      data: shopOrderData,
      isLoading: isShopOrderDataLoading,
      refetch: refetchShopOrder,
   } = useQuery(
      ['shopManageOrder'],
      async () =>
         await orderApi.getShopOrder({
            createdAtDirection: 'desc',
         })
   );

   const { mutate: changeOrderStatusMutate } = useMutation(
      async (formData) => await orderApi.changeOrderStatus(formData),
      {
         onSuccess: () => {
            refetchShopOrder();

            toast({
               status: 'success',
               title: 'Success',
               description: 'Change order status success',
               duration: 5000,
               position: 'top',
            });
         },
      }
   );

   const { mutate: disableFoodMutate } = useMutation(
      async (formData) =>
         await foodApi.disableFood(formData.foodId, formData.isDeleted),
      {
         onSuccess: (response) => {
            refetchFoodData();

            toast({
               status: 'success',
               title: 'Success',
               description: `${
                  response.isDeleted ? 'Disable' : 'Enable'
               } success`,
               duration: 1000,
               position: 'top',
            });
         },
      }
   );

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

   const getCardHeader = (order) => {
      return {
         avatar: order.user.photoURL,
         email: order.user.email,
         name: order.user.name,
      };
   };

   const onChangeOrderStatus = (formData) => changeOrderStatusMutate(formData);

   const onDisableFood = (foodId, isDeleted) =>
      disableFoodMutate({ foodId, isDeleted });

   return (
      <Flex bg='white' minH='88vh' shadow='xl' rounded='xl'>
         <Box borderRightWidth='2px' minW='250px'>
            <Box pb='30px' px='25px' py='30px'>
               <Heading as='h2' fontSize='28px' pb='8px'>
                  Manage
               </Heading>
               <Text>Lorem magna do nulla.</Text>
            </Box>
            <ShopManageSidebar
               onClickSidebarManageItem={handleClickSidebarManageItem}
               selectedSidebarItem={selectedSidebarItem}
            />
         </Box>
         <Box w='full' px='25px' py='30px'>
            {selectedSidebarItem === 'food' ? (
               <>
                  {!isFoodDataLoading && (
                     <ManageShopFood
                        data={foodData}
                        onDisableFood={onDisableFood}
                     />
                  )}
               </>
            ) : (
               <>
                  {!isShopOrderDataLoading ? (
                     <ManageOrderTable
                        columns={columns}
                        orderData={shopOrderData}
                        userInfoHeader={getCardHeader}
                        isDisplaySelectStatus={true}
                        onChangeOrderStatus={onChangeOrderStatus}
                     />
                  ) : (
                     <Spinner size='xl' />
                  )}
               </>
            )}
         </Box>
      </Flex>
   );
};

export default ShopManageOrderPage;
