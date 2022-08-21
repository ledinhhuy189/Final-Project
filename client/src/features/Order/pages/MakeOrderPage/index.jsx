import { Box, Flex, useToast } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import orderApi from '../../../../api/orderApi';
import CustomBreadcrumb from '../../../../global/components/CustomBreadcrumb';
import InformationForm from '../../components/InfomationForm';
import YourOrder from '../../components/YourOrder';

function OrderPage(props) {
   const toast = useToast();
   const { state: orderItemsData } = useLocation();

   const handleMakeOrder = async () => {
      try {
         const makeOrderResponse = await orderApi.makeOrder({ orderItemsData });
         if (makeOrderResponse) {
            toast({
               title: 'Make order success. Thank you!',
               status: 'success',
               position: 'top-right',
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <Box mb='4'>
            <CustomBreadcrumb />
         </Box>
         <Box py='6' px='8' bg='white' shadow='md' rounded='2xl'>
            <Flex w='full' gap='14'>
               <Box flex='3'>
                  <InformationForm handleMakeOrder={handleMakeOrder} />
               </Box>
               <Box flex='2'>
                  <YourOrder orderItemsData={orderItemsData} />
               </Box>
            </Flex>
         </Box>
      </>
   );
}

export default OrderPage;
