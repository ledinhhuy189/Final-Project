import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ManageShopFood from '../../components/ManageShopFood';
import ManageShopOrder from '../../components/ManageShopOrder';
import ShopManageSidebar from '../../components/ShopManageSidebar';
import foodApi from '../../../../api/foodApi';

const ShopManageOrderPage = () => {
   const [selectedSidebarItem, setSelectedSidebarItem] = useState('food');

   const { data: foodData, isLoading: isFoodDataLoading } = useQuery(
      ['shopManageOrder'],
      async () => await foodApi.getFoodOfUser()
   );

   const handleClickSidebarManageItem = (item) => setSelectedSidebarItem(item);

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
         <Box w='full'>
            {selectedSidebarItem === 'food' ? (
               <>{!isFoodDataLoading && <ManageShopFood data={foodData} />}</>
            ) : (
               <ManageShopOrder />
            )}
         </Box>
      </Flex>
   );
};

export default ShopManageOrderPage;
